import { useEffect, useState } from "react";
import "../Home/Home.css";
import BtnGeneral from "../../components/BtnGeneral/BtnGeneral";
import TarjetaProd from "../../components/tarjetaProd/TarjetaProd";
import logoWaiss from "/assets/img/logoWaiss.png";
import TarjetaTestimonio from "../../components/TarjetaTestimonio/TarjetaTestimonio";
import testigoOdontologo from "/assets/img/testimonios/fotoTestigoOdontologo.jpg";
import testigoOdontologa from "/assets/img/testimonios/fotoTestigoOdontologa.png";
import testigoContadora from "/assets/img/testimonios/fotoTestigoContadoraPublica.png";
import testimonioLectura1 from "/assets/img/testimonios/testimonioLectura1.jpg";
import testimonioLectura2 from "/assets/img/testimonios/testimonioLectura2.jpg";
import testimonioLectura3 from "/assets/img/testimonios/testimonioLectura3.jpg";
import logoMercadoPago from "/assets/img/logoMercadoPago.png";
import logoPayPal from "/assets/img/logoPayPal.png";
import "animate.css";
import "boxicons";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PayPalPayment from "../../components/PayPalPayment/PayPalPayment";

function Home() {
	const [preferenciaGenerada, setPreferecia] = useState(null);
	const [estadoPasarela, setPasarela] = useState(false);
	const [IDproductoActual, setProductoActual] = useState(null);

	useEffect(() => {
		console.log(IDproductoActual);
	}, [IDproductoActual]);

	useEffect(() => {
		console.log("Se generó la siguiente preferencia:" + preferenciaGenerada)
	}, preferenciaGenerada)

	const manejoPasarela = () => {
		setPasarela(!estadoPasarela);
	};

	const manejoProdActual = (codigo) => {
		setProductoActual(codigo);
	};

	initMercadoPago("APP_USR-7951d397-3b6c-4892-a29e-4337adf62b22");

	return (
		<>
			<div className="header">
				<div className="contenedorInternoHeader">
					<img src={logoWaiss} alt="Iness Waiss" />
					<div className="contenedorBotonesHeader">
						<BtnGeneral
							className="btnHeader headerWidth"
							tipo="Cursos"
						/>
						<BtnGeneral
							className="btnHeader headerWidth"
							tipo="Lecturas"
						/>
						<BtnGeneral
							className="btnHeader headerWidth"
							tipo="Testimonios"
						/>
					</div>
				</div>
			</div>

			<div className="heroSection" id="heroSection">
				<div className="filtroFondoHero">
					<div className="contenidoHero">
						<div className="innerContenidoHero">
							<div className="textoHero">
								<h2>
									Descubre El Poder <br></br> Transformador
									del <br></br> Tarot Terapeutico
								</h2>
								<p>
									Ya sea para aprender o recibir orientación,
									aquí encontrarás <br /> el camino ideal para
									ti.
								</p>
							</div>

							<div className="botonesHero">
								<BtnGeneral
									className="btnHero especial"
									tipo="Cursos"
								/>
								<BtnGeneral
									className="btnHero especial"
									tipo="Lecturas"
								/>
							</div>
						</div>
						<div className="videoHero">
							<iframe
								className="iframeVideo"
								width="560"
								height="315"
								src="https://www.youtube-nocookie.com/embed/6aCP2j-3pUM?si=tjuereLQBj2tNLJT"
								title="YouTube video player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerpolicy="strict-origin-when-cross-origin"
								allowfullscreen
							></iframe>{" "}
						</div>
					</div>
				</div>
			</div>

			<div className="seccionCursos" id="seccionCursos">
				<div className="textoSeccion">
					<h3 style={{ color: "#E0C976" }}>
						Elige El Curso Ideal Para Ti:
					</h3>
					<p>
						Cursos diseñados para principiantes y avanzados, con
						diferentes modalidades que se adaptan a tu tiempo y
						necesidades.
					</p>
				</div>

				<div className="containerTarjetas">
					<TarjetaProd
						tipo="curso"
						idProd={0}
						precioARS={20000}
						precioUSD={30}
						titulo="Curso Flex Simple"
						texto=" Ideal para todos, desde quienes inician hasta tarotistas que quieren limpiar vicios y trabajar terapéuticamente."
						infoModal={
							<>
								<p>
									<strong>
										&iquest;Qu&eacute; incluye este curso?
									</strong>
								</p>
								<ul>
									<li>
										<strong>
											Acceso completo al curso online:
										</strong>{" "}
										Aprende el M&eacute;todo Waiss
										Terap&eacute;utico y c&oacute;mo aplicar
										las cartas de tarot para el desarrollo
										personal y la sanaci&oacute;n.
									</li>
									<li>
										<strong>
											Ejercicios pr&aacute;cticos:
										</strong>{" "}
										Con el enfoque terap&eacute;utico,
										tendr&aacute;s ejercicios para mejorar
										tu pr&aacute;ctica y conocimiento.
									</li>
									<li>
										<strong>Contenido interactivo:</strong>{" "}
										Accede a material visual y
										te&oacute;rico para reforzar el
										aprendizaje.
									</li>
									<li>
										<strong>Ideal para todos:</strong> Ya
										seas nuevo en el tarot o un tarotista
										que quiere limpiar vicios y enfocarse en
										el uso terap&eacute;utico de las cartas.
									</li>
								</ul>
								<p>
									<strong>
										&iquest;C&oacute;mo vas a aprender?
									</strong>
								</p>
								<ul>
									<li>
										Clases grabadas a tu ritmo y disponibles
										para que las consultes cuando quieras.
									</li>
									<li>
										<strong>Seguimiento opcional:</strong>{" "}
										Si deseas seguimiento para realizar
										ejercicios y mejorar tu pr&aacute;ctica,
										puedes abonar una suscripci&oacute;n
										mensual de ___________ (en
										pesos&nbsp;o&nbsp;d&oacute;lares, se
										abona luego del primer mes).
									</li>
								</ul>
							</>
						}
						passPreferencia={setPreferecia}
						passEstadoPasarela={manejoPasarela}
						passProductoActual={manejoProdActual}
					/>
					<TarjetaProd
						tipo="curso"
						idProd={1}
						precioARS={20000}
						precioUSD={30}
						titulo="Curso Flex Reforzado"
						texto="Curso intensivo con más información y ejercicios completos para profundizar en el Método Waiss Terapéutico."
						infoModal={
							<>
								<p>
									<strong>
										&iquest;Qu&eacute; incluye este curso?
									</strong>
								</p>
								<ul>
									<li>
										<strong>
											Acceso completo al curso online:
										</strong>{" "}
										Aprende el M&eacute;todo Waiss
										Terap&eacute;utico con m&aacute;s
										informaci&oacute;n y una mayor
										profundidad en los contenidos
									</li>
									<li>
										<strong>
											Ejercicios completos y avanzados:
										</strong>{" "}
										Ejercicios pr&aacute;cticos para mejorar
										tu pr&aacute;ctica terap&eacute;utica.
										<br />
										Contenido interactivo: Material visual y
										te&oacute;rico ampliado para facilitar
										el aprendizaje y la integraci&oacute;n
										de conceptos m&aacute;s complejos.
									</li>
									<li>
										<strong>
											Ideal para principiantes y
											tarotistas:
										</strong>{" "}
										Para quienes desean pasar del
										m&eacute;todo predictivo al
										terap&eacute;utico y profundizar en el
										uso de las cartas.
									</li>
									<li>
										<strong>Clases grupales:</strong> Accede
										a clases grupales gratuitas o pagas con
										un 50% de descuento.
										<br />
										Clases particulares: Opci&oacute;n de
										clases particulares por videollamada
										para un aprendizaje m&aacute;s
										personalizado.
									</li>
								</ul>
								<p>
									<strong>
										&iquest;C&oacute;mo vas a aprender?
									</strong>
								</p>
								<ul>
									<li>
										<strong>
											Clases grabadas a tu ritmo, con
											acceso ilimitado a todo el material.
										</strong>
									</li>
									<li>
										<strong>Seguimiento opcional:</strong>{" "}
										Si deseas seguimiento para realizar
										ejercicios y mejorar tu pr&aacute;ctica,
										puedes abonar una suscripci&oacute;n
										mensual de ___________ (en
										pesos&nbsp;o&nbsp;d&oacute;lares).
									</li>
								</ul>
							</>
						}
						passPreferencia={setPreferecia}
						passEstadoPasarela={manejoPasarela}
						passProductoActual={manejoProdActual}
					/>
					<TarjetaProd
						tipo="curso"
						idProd={2}
						precioARS={20000}
						precioUSD={30}
						titulo="Curso Waiss: Tarot Terapéutico en Vivo"
						texto="Clases en vivo para una experiencia interactiva y profunda en el Método Waiss Terapéutico."
						infoModal={
							<>
								<p>
									<strong>
										&iquest;Qu&eacute; incluye este curso?
									</strong>
								</p>
								<ul>
									<li>
										<strong>
											Acceso completo al curso online:
										</strong>{" "}
										Aprende el M&eacute;todo Waiss
										Terap&eacute;utico a trav&eacute;s de
										clases grabadas con un enfoque profundo
										y pr&aacute;ctico.
									</li>
									<li>
										<strong>
											Ejercicios pr&aacute;cticos:
										</strong>{" "}
										Ejercicios tanto del curso grabado como
										de las clases en vivo para fortalecer tu
										pr&aacute;ctica.
									</li>
									<li>
										<strong>Contenido interactivo:</strong>{" "}
										Material visual y te&oacute;rico para
										integrar el conocimiento de forma
										efectiva.
									</li>
									<li>
										<strong>
											Clases particulares y grupales:
										</strong>{" "}
										A medida que vayas avanzando,
										tendr&aacute;s acceso a clases grupales
										y particulares para generar
										pr&aacute;ctica en vivo, ayudando a
										reforzar lo aprendido y generar
										m&aacute;s confianza.
									</li>
									<li>
										<strong>
											Ideal para quienes buscan
											experiencia pr&aacute;ctica:
										</strong>{" "}
										Perfecto para quienes desean obtener
										m&aacute;s pr&aacute;ctica, tanto con el
										contenido grabado como con sesiones en
										vivo.
									</li>
								</ul>
								<p>
									<br />
									<strong>
										&iquest;C&oacute;mo vas a aprender?
									</strong>
								</p>
								<ul>
									<li>
										Clases grabadas disponibles para
										aprender a tu ritmo y consultar siempre
										que lo necesites.
									</li>
									<li>
										<strong>Clases en vivo:</strong>{" "}
										Participa en clases grupales y recibe
										clases particulares a medida que avanzas
										para reforzar y aplicar lo aprendido.
									</li>
									<li>
										<strong>Seguimiento opcional</strong>:
										Si deseas un acompa&ntilde;amiento
										m&aacute;s personalizado mientras
										trabajas en los ejercicios, puedes
										abonar una suscripci&oacute;n mensual de
										___________ (en
										pesos&nbsp;o&nbsp;d&oacute;lares).
									</li>
								</ul>
							</>
						}
						passPreferencia={setPreferecia}
						passEstadoPasarela={manejoPasarela}
						passProductoActual={manejoProdActual}
					/>
					<TarjetaProd
						tipo="curso"
						idProd={3}
						precioARS={20000}
						precioUSD={30}
						titulo="Curso Presencial en Núñez"
						texto="Para quienes prefieren aprender cara a cara con Inés Waiss en un ambiente cercano y personalizado."
						infoModal={
							<>
								<p>
									<strong>
										&iquest;Qu&eacute; incluye este curso?
									</strong>
								</p>
								<ul>
									<li>
										<strong>
											Teor&iacute;a y pr&aacute;ctica:
										</strong>{" "}
										Aprende los conceptos fundamentales del
										M&eacute;todo Waiss Terap&eacute;utico y
										c&oacute;mo aplicarlos.
									</li>
									<li>
										<strong>Formato de lectura:</strong>{" "}
										Desarrolla tu capacidad para leer las
										cartas tanto para ti mismo como para los
										dem&aacute;s.
									</li>
									<li>
										<strong>
											Ejercicios pr&aacute;cticos:
										</strong>{" "}
										Realiza ejercicios para mejorar tu
										pr&aacute;ctica, aprender a leer cartas
										y aplicar lo aprendido en diferentes
										situaciones.
									</li>
									<li>
										<strong>Break con cosas ricas:</strong>{" "}
										Durante la clase, disfrutar&aacute;s de
										un peque&ntilde;o descanso con algo
										delicioso mientras compartimos
										reflexiones.
									</li>
								</ul>
								<p>
									<br />
									<strong>Opciones adicionales:</strong>
								</p>
								<ul>
									<li>
										<strong>Agregar cartas:</strong> Si
										deseas agregar un mazo de cartas, tiene
										un costo adicional de ___________ (pesos
										o d&oacute;lares).
									</li>
									<li>
										<strong>Grabar la clase:</strong> Si
										quieres llevarte grabado todo lo visto
										en clase, hay un costo adicional de
										___________ (pesos o d&oacute;lares).
									</li>
									<li>
										<strong>
											Seguimiento por WhatsApp:
										</strong>{" "}
										Si deseas un seguimiento personalizado a
										trav&eacute;s de WhatsApp, puedes optar
										por una suscripci&oacute;n mensual de
										___________
										(pesos&nbsp;o&nbsp;d&oacute;lares).
									</li>
								</ul>
							</>
						}
						passPreferencia={setPreferecia}
						passEstadoPasarela={manejoPasarela}
						passProductoActual={manejoProdActual}
					/>
				</div>
			</div>

			<div className="seccionLecturas" id="seccionLecturas">
				<div className="textoSeccion">
					<h3 style={{ color: "#E8C5C1" }}>
						Encuentra la Respuesta que Necesitas:
					</h3>
					<p>
						Consulta personalizada para aclarar tus dudas y avanzar
						con confianza.
					</p>
				</div>

				<div className="containerTarjetas">
					<TarjetaProd
						tipo="lectura"
						idProd={4}
						precioARS={20000}
						precioUSD={30}
						titulo="Lectura Personalizada: 3 Preguntas + 1 Lectura General"
						texto="Responde a 3 preguntas clave y recibe una lectura general para profundizar en tu situación."
						infoModal={
							<>
								Responde a 3 preguntas clave y recibe una
								lectura general para profundizar en tu
								situación.
							</>
						}
						passPreferencia={setPreferecia}
						passEstadoPasarela={manejoPasarela}
						passProductoActual={manejoProdActual}
					/>
					<TarjetaProd
						tipo="lectura"
						idProd={5}
						precioARS={20000}
						precioUSD={30}
						titulo="Lectura Completa: 6 Preguntas + 1 Lectura General"
						texto="Responde a 6 preguntas más una lectura general para obtener claridad en varios aspectos de tu vida."
						infoModal={
							<>
								Responde a 6 preguntas más una lectura general
								para obtener claridad en varios aspectos de tu
								vida.
							</>
						}
						passPreferencia={setPreferecia}
						passEstadoPasarela={manejoPasarela}
						passProductoActual={manejoProdActual}
					/>
					<TarjetaProd
						tipo="lectura"
						idProd={6}
						precioARS={20000}
						precioUSD={30}
						titulo="Lecturas Transformadoras: 5 Lecturas Especializadas"
						texto="Elige entre lecturas sobre tu ex, vínculos, autoconocimiento, éxito profesional o personal para un cambio profundo."
						infoModal={
							<>
								<ul>
									<li>
										<strong>Lectura sobre tu Ex:</strong>{" "}
										Entiende qu&eacute; est&aacute; pasando
										en tu relaci&oacute;n pasada, cierra
										ciclos y aprende de esa experiencia para
										avanzar en tu vida emocional.
									</li>
									<li>
										<strong>
											Lectura de V&iacute;nculos:
										</strong>{" "}
										Descubre los patrones en tus relaciones
										actuales, ya sea con pareja, familia o
										amigos, y c&oacute;mo mejorar la
										comunicaci&oacute;n y conexi&oacute;n.
									</li>
									<li>
										<strong>
											Lectura de Autoconocimiento:
										</strong>{" "}
										Profundiza en tu interior para conocer
										tus fortalezas, miedos y &aacute;reas a
										trabajar, gui&aacute;ndote hacia un
										mayor bienestar y crecimiento personal.
									</li>
									<li>
										<strong>
											Lectura de &Eacute;xito Profesional:
										</strong>{" "}
										Obt&eacute;n claridad sobre tu carrera,
										proyectos y metas laborales,
										descubriendo oportunidades y bloqueos
										que podr&iacute;an estar impidiendo tu
										progreso.
									</li>
									<li>
										<strong>
											Lectura de &Eacute;xito Personal:
										</strong>{" "}
										Analiza tu vida personal y emocional,
										entendiendo lo que te impulsa hacia el
										&eacute;xito y c&oacute;mo alcanzar tus
										objetivos
										personales&nbsp;con&nbsp;confianza.
									</li>
								</ul>
							</>
						}
						passPreferencia={setPreferecia}
						passEstadoPasarela={manejoPasarela}
						passProductoActual={manejoProdActual}
					/>

					<TarjetaProd
						tipo="lectura"
						idProd={7}
						titulo="Reconstruí tu Camino : Lectura con Informe y Ejercicios Terapéuticos"
						texto="Explorá tu interior y descubrí lo que realmente te detiene."
						infoModal={
							<>
								<p>
									Con esta lectura de autoconocimiento
									recibir&aacute;s un informe personalizado y
									ejercicios practicos para transformar tus
									desaf&iacute;os en oportunidades.
									&iexcl;San&aacute;, avanz&aacute; y
									conect&aacute; con tu mejor versi&oacute;n!
								</p>
								<p>
									<strong>
										&iquest;Qu&eacute; puntos podemos
										trabajar en esta lectura
										terap&eacute;utica?
									</strong>
								</p>
								<ul>
									<li>
										Tus patrones de comportamiento y
										c&oacute;mo afectan tu vida.
									</li>
									<li>
										Bloqueos emocionales que no te dejan
										avanzar.
									</li>
									<li>
										Relaci&oacute;n con tu pasado y
										c&oacute;mo superarlo.
									</li>
									<li>
										Identificaci&oacute;n de miedos y
										creencias limitantes.
									</li>
									<li>
										Reconexi&oacute;n con tus talentos y
										prop&oacute;sito personal.
									</li>
									<li>
										Estrategias para tomar decisiones
										conscientes y alineadas con tu
										bienestar.
									</li>
								</ul>
								<p>
									Con esta experiencia, obtendr&aacute;s una
									gu&iacute;a completa para trabajar en vos
									mismo/a desde un enfoque terap&eacute;utico,
									logrando claridad y herramientas
									pr&aacute;cticas para avanzar.
								</p>
							</>
						}
						passPreferencia={setPreferecia}
						passEstadoPasarela={manejoPasarela}
						passProductoActual={manejoProdActual}
					/>
					<TarjetaProd
						tipo="lectura"
						idProd={8}
						titulo="Lectura Sobre El Mapa de Tus Relaciones"
						texto="Descubre por qué siempre eliges lo mismo."
						infoModal={
							<>
								<p>
									&iquest;Alguna vez te has preguntado por
									qu&eacute; siempre terminas con el mismo
									tipo de persona?
								</p>
								<p>
									<br />
									&iquest;Sientes que repites patrones en tus
									relaciones y no sabes c&oacute;mo
									cambiarlos?
								</p>
								<p>
									<br />
									Con esta lectura terap&eacute;utica
									personalizada, analizaremos juntos tu
									historia amorosa para entender los patrones
									que moldean tus elecciones y c&oacute;mo
									liberarte de ellos. A trav&eacute;s de un
									enfoque profundo y reflexivo,
									descubrir&aacute;s:
								</p>
								<ul>
									<li>
										<strong>
											El origen de tus elecciones:
										</strong>{" "}
										&iquest;Qu&eacute; experiencia del
										pasado est&aacute; influenciando tus
										relaciones?
									</li>
									<li>
										<strong>
											C&oacute;mo te afectan tus patrones
											actuales:
										</strong>{" "}
										Reconocer&aacute;s lo que te est&aacute;
										limitando.
									</li>
									<li>
										<strong>
											El camino hacia el cambio:
										</strong>{" "}
										Identificar&aacute;s qu&eacute; pasos
										tomar para romper el ciclo.
									</li>
									<li>
										<strong>
											Una gu&iacute;a personalizada:
										</strong>{" "}
										Recibir&aacute;s un informe &uacute;nico
										con recomendaciones y herramientas
										pr&aacute;cticas.
									</li>
								</ul>
								<p>
									<strong>
										Es una br&uacute;jula para que
										transformes tu vida amorosa desde la
										conciencia
									</strong>
								</p>
								<p>
									<strong>
										&iquest;Que incluye?
										<br />
									</strong>
								</p>
								<ul>
									<li>
										Una lectura terap&eacute;utica profunda.
									</li>
									<li>
										Informe personalizado con devoluciones
										claras y pr&aacute;cticas.
									</li>
									<li>
										Recomendaciones para transformar tus
										relaciones futuras.
									</li>
								</ul>
							</>
						}
						passPreferencia={setPreferecia}
						passEstadoPasarela={manejoPasarela}
						passProductoActual={manejoProdActual}
					/>
				</div>
			</div>

			<div className="seccionTestimonios" id="seccionTestimonios">
				<div className="textoSeccion">
					<h3 style={{ color: "#FFFFFF" }}>Testimonios</h3>
					<p>
						Conoce como El Método Waiss han Ayudado a Otras Personas
					</p>
				</div>
				<div className="containerTestimonios">
					<TarjetaTestimonio
						img={testigoOdontologo}
						titulo={
							<>
								Dr Diego Rebisso <br /> Odontologo e
								Implantologo
							</>
						}
						cuerpo={
							<>
								"Pensaba que era cuestión de predicciones o
								cosas sobrenaturales, pero realmente es una{" "}
								<b>
									herramienta potente que te ayuda a reducir
									tu estado de ánimo y enfocarte mejor
								</b>
								, entendiendo las necesidades de cada paciente."
							</>
						}
					/>
					<TarjetaTestimonio
						img={testigoOdontologa}
						titulo={
							<>
								Dra Mercedes
								<br />
								Odontologa
							</>
						}
						cuerpo={
							<>
								"Inés me ayudó con su método profesional, WISE,
								a encauzar la búsqueda laboral de una secretaria
								y a tomar la decisión para contratar a la
								persona ideal para mi equipo.
								<b>
									Su forma clara y amorosa de acercar la
									información fue clave para entender lo
									que necesitaba."
								</b>
							</>
						}
					/>
					<TarjetaTestimonio
						img={testigoContadora}
						titulo={
							<>
								Julieta Orozco
								<br />
								contadora publica
							</>
						}
						cuerpo={
							<>
								"En un momento caótico de mi vida, comencé a
								hacerme tirar las cartas, y ahí es donde conocí
								a Inés. Aunque mi vida siempre estuvo orientada
								a los números y a lo exacto,{" "}
								<b>
									ella me mostró que lo terapéutico también
									podía ser para mí.
								</b>
								"
							</>
						}
					/>
				</div>
				<div className="containerMasTestimonios">
					<p
						style={{ color: "#E8C5C1" }}
						className="tituloMasTestimonios"
					>
						Otros Testimonios Sobre Lecturas
					</p>
					<div className="containerImgTestimonios">
						<img
							src={testimonioLectura1}
							alt="Testimonio Whatsapp"
							className="testimonioExtra"
						/>
						<img
							src={testimonioLectura2}
							alt="Testimonio Whatsapp"
							className="testimonioExtra"
						/>
						<img
							src={testimonioLectura3}
							alt="Testimonio Whatsapp"
							className="testimonioExtra"
						/>
					</div>
				</div>
			</div>

			<div
				className={
					"contenedorPasarelas" + (estadoPasarela ? " visible" : " ")
				}
				onClick={manejoPasarela}
			>
				<div className="innerPasarelas">
					<div className="btnCerrarModal" onClick={manejoPasarela}>
						<box-icon name="x" size="md"></box-icon>
					</div>
					<div className="contenedorWallet">
						<Wallet
							initialization={{
								preferenceId: preferenciaGenerada,
							}}
						/>
						{estadoPasarela ? (
							<PayPalPayment idProd={IDproductoActual} />
						) : (
							<p>no cargo paypal</p>
						)}
					</div>
				</div>
			</div>

			<div className="seccionFooter">
				<img
					className="logoFooter"
					src={logoWaiss}
					alt="Iness Waiss Tarot Terapeutico"
				/>
				<div className="logosFooter">
					<img
						src={logoMercadoPago}
						alt="logoMP"
						className="logoMercado"
					/>
					<img
						src={logoPayPal}
						alt="logoPayPal"
						className="logoPayPal"
					/>
					<p className="textoFooter">
						Fondo de Hero Section diseñada por Freepik
					</p>
				</div>
			</div>
		</>
	);
}

export default Home;
