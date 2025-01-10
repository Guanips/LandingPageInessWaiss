import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv"
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import {
	ApiError,
	CheckoutPaymentIntent,
	Client,
	Environment,
	LogLevel,
	OrdersController,
	PaymentsController,
} from "@paypal/paypal-server-sdk";


const port = 3001;
const app = express();
const preciosProductos = [
	{
		titulo: "curso flex simple",
		precio_ARS: 17000,
		precio_USD: 20,
	},
	{
		titulo: "curso flex reforzado",
		precio_ARS: 40000,
		precio_USD: 50,
	},
	{
		titulo: "Curso Waiss: Tarot Terapéutico en Vivo",
		precio_ARS: 75000,
		precio_USD: 75,
	},
	{
		titulo: "Curso Presencial en Nunez",
		precio_ARS: 80000,
		precio_USD: 80,
	},
	{
		titulo: "Lectura Personalizada: 3 Preguntas + 1 Lectura General",
		precio_ARS: 25000,
		precio_USD: 25,
	},
	{
		titulo: "Lectura Completa: 6 Preguntas + 1 Lectura General",
		precio_ARS: 25000,
		precio_USD: 25,
	},
	{
		titulo: "Lecturas Transformadoras: 5 Lecturas Especializadas",
		precio_ARS: 35000,
		precio_USD: 35,
	},
	{
		titulo: "Reconstruí tu Camino : Lectura con Informe y Ejercicios",
		precio_ARS: 45000,
		precio_USD: 45,
	},
	{
		titulo: "Lectura Sobre El Mapa de Tus Relaciones",
		precio_ARS: 50000,
		precio_USD: 50,
	},
];

dotenv.config()
app.use(cors());
app.use(express.json());
app.listen(port, () => {
	console.log("Servidor en puerto " + port);
});

const clientMP = new MercadoPagoConfig({
	accessToken:
		process.env.ACCESS_TOKEN_MP,
});
const paymentMP = new Payment(clientMP);

const clientPayPal = new Client({
	clientCredentialsAuthCredentials: {
		oAuthClientId: process.env.CLIENT_ID_PP,
		oAuthClientSecret: process.env.CLIENT_SECRET_PP,
	},
	timeout: 0,
	environment: Environment.Production,
	logging: {
		logLevel: LogLevel.Info,
		logRequest: { logBody: true },
		logResponse: { logHeaders: true },
	},
});

const ordersController = new OrdersController(clientPayPal);
const paymentsController = new PaymentsController(clientPayPal);

const createOrder = async (product, idProducto) => {
	const collect = {
		body: {
			intent: "CAPTURE",
			purchaseUnits: [
				{
					amount: {
						currencyCode: "USD",
						value: preciosProductos[
							idProducto
						].precio_USD.toString(),
					},
				},
			],
		},
		prefer: "return=minimal",
	};

	try {
		const { body, ...httpResponse } = await ordersController.ordersCreate(
			collect
		);
		// Get more response info...
		// const { statusCode, headers } = httpResponse;
		return {
			jsonResponse: JSON.parse(body),
			httpStatusCode: httpResponse.statusCode,
		};
	} catch (error) {
		if (error instanceof ApiError) {
			// const { statusCode, headers } = error;
			throw new Error(error.message);
		}
	}
};

const captureOrder = async (orderID) => {
	const collect = {
		id: orderID,
		prefer: "return=minimal",
	};

	try {
		const { body, ...httpResponse } = await ordersController.ordersCapture(
			collect
		);
		// Get more response info...
		// const { statusCode, headers } = httpResponse;
		return {
			jsonResponse: JSON.parse(body),
			httpStatusCode: httpResponse.statusCode,
		};
	} catch (error) {
		if (error instanceof ApiError) {
			// const { statusCode, headers } = error;
			throw new Error(error.message);
		}
	}
};

app.get("/get_precios", async (req, res) => {
	try {
		res.json({
			preciosProductos: preciosProductos,
		});
	} catch (error) {
		console.log(error);
	}
});

app.post("/verificarCompra", async (req, res) => {
	console.log("ME LLEGO UN GET");
	let id_consulta_MP = req.body.id_compra_MP;
	let id_consulta_PP = req.body.id_compra_PP;
	console.log(id_consulta_PP);

	if (id_consulta_MP != null) {
		try {
			let response = await paymentMP.get({
				id: id_consulta_MP,
			});

			if (response.status == "approved") {
				console.log(
					`El pago de MP transaccion ${id_consulta_MP} está aprovado`
				);

				res.send(
					'<div class="contenedorContenidoServer"><p class="tituloExito">¡Compra Exitosa!</p><p class="cuerpoExito">Muchas gracias por tu compra, contactate conmigo para poder organizar los pasos siguientes: </p><a aria-label="Chat on WhatsApp" href="https://wa.me/+5491140627516"> <img alt="Chat on WhatsApp" src="/assets/img/WhatsAppButtonGreenMedium.svg"/></a><div/>'
				);
			} else if (response.status == "pending") {
				console.log(
					`el pago de MP transaccion ${id_consulta_MP} esta en espera`
				);
				res.send(
					'<div class="contenedorContenidoServer"><p class="tituloExito">Compra En Espera</p><p class="cuerpoExito">La compra esta en espera ya que el pago aun no ha sido procesado</p><p class="aclaracionExito">(Recuerde que solo podrá acceder a esta pagina hasta 24 horas depues de haberse efectuado el pago)</p><div/>'
				);
			} else {
				console.log(
					`el pago de MP transaccion ${id_consulta_MP} fue rechazado`
				);
				res.send(
					'<div class="contenedorContenidoServer"><p class="tituloExito">Compra Fallida</p><p class="cuerpoExito">El pago fue rechazado o la transaccion a vencido</p><p class="aclaracionExito">(Recuerde que solo podrá acceder a esta pagina hasta 24 horas depues de haberse efectuado el pago)</p><div/>'
				);
			}
		} catch (error) {
			console.log(error);
		}
	} else if (id_consulta_PP != null) {
		try {
			let response = await axios.get(
				`https://api-m.paypal.com/v1/payments/sale/${id_consulta_PP}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.API_TOKEN_PP}`,
					},
				}
			);

			console.log(response.data);

			if (response.data.state == "completed") {
				console.log(`pago PP transaccion ${id_consulta_PP} completado`);
				res.send(
					'<div class="contenedorContenidoServer"><p class="tituloExito">¡Compra Exitosa!</p><p class="cuerpoExito">Muchas gracias por tu compra, contactate conmigo para poder organizar los pasos siguientes: </p><a aria-label="Chat on WhatsApp" href="https://wa.me/+5491140627516"> <img alt="Chat on WhatsApp" src="/assets/img/WhatsAppButtonGreenMedium.svg"/></a><div/>'
				);
			} else {
				console.log(`pago PP transaccion ${id_consulta_PP} rechazado`);
				res.send(
					'<div class="contenedorContenidoServer"><p class="tituloExito">Compra Fallida</p><p class="cuerpoExito">El pago fue rechazado o la transaccion a vencido</p><div/>'
				);
			}
		} catch (error) {
			console.log(error);
		}
	} else {
		res.send(
			'<div class="contenedorContenidoServer"><p class="tituloExito">No autorizado</p><p class="cuerpoExito">No se ha detectado ninguna transaccion que valide el acceso a esta pagina</p><div/>'
		);
	}
});

app.post("/create_preference", async (req, res) => {
	console.log("ME LLEGO UN POST");
	console.log(req.body);
	console.log();

	try {
		const body = {
			items: [
				{
					title: preciosProductos[req.body.id_producto].titulo,
					quantity: Number(req.body.quantity),
					unit_price: Number(
						preciosProductos[req.body.id_producto].precio_ARS
					),
					currency_id: "ARS",
				},
			],
			back_urls: {
				success: "192.168.1.12:5173/resultadoCompra",
				failure: "192.168.1.12:5173/resultadoCompra",
				pending: "192.168.1.12:5173/resultadoCompra",
			},
			auto_return: "approved",
		};

		const preference = new Preference(clientMP);
		const result = await preference.create({ body });
		res.json({
			id: result.id,
		});
		console.log("preferencia MP creada exitosamente");
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Error al crear la preferencia",
		});
	}
});

app.post("/notificacionMP", (req, res) => {
	console.log("ME LLEGO UN POST DE MP");
	try {
		const data = req.body;
		console.log(data);
		console.log(data.data.id);
		res.status(200).send({ msg: "notificacion recibida correctamente" });
	} catch (erro) {
		console.log(error);
		return res.status(500);
	}
});

app.post("/api/orders", async (req, res) => {
	try {
		const id_producto = req.body.product_id;
		const { product } = req.body;
		const { jsonResponse, httpStatusCode } = await createOrder(
			product,
			id_producto
		);
		res.status(httpStatusCode).json(jsonResponse);
	} catch (error) {
		console.error("Failed to create order:", error);
		res.status(500).json({ error: "Failed to create order." });
	}
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
	try {
		const { orderID } = req.params;
		const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
		res.status(httpStatusCode).json(jsonResponse);
	} catch (error) {
		console.error("Failed to create order:", error);
		res.status(500).json({ error: "Failed to capture order." });
	}
});
