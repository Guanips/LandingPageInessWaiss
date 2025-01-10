import btnWhatsapp from "/assets/img/WhatsAppButtonGreenMedium.svg"
import logoWaiss from "/assets/img/logoWaiss.png";
import "./ResultadoCompra.css"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";

const ResultadoCompra = () => {
    axios.defaults.headers.common["ngrok-skip-browser-warning"] = 'uwu'
    const [idPagoActualMP, setIdPagoMP] = useState(null)
    const [idPagoActualPayPal, setIdPagoPayPal] = useState(null)
    const [contenido, setContenido] = useState("<p class='cuerpoExito'>Verificacion de Pago en Proceso<p/>")
    const [queryParameters] = useSearchParams()

    useEffect(()=>{
        setIdPagoMP(queryParameters.get("payment_id"))
        setIdPagoPayPal(queryParameters.get("paypal_payment_id"))
    },[])

    useEffect(()=>{
        if(idPagoActualMP != null || idPagoActualPayPal != null){
            verificarPago()
        } else {
            verificarPago()
        }
    }, [idPagoActualMP, idPagoActualPayPal])

    const verificarPago = async () => {
        const respuesta = await axios.post("https://f248-190-226-73-198.ngrok-free.app/verificarCompra", {
            id_compra_MP: idPagoActualMP, 
            id_compra_PP: idPagoActualPayPal,
        })

        setContenido(respuesta.data)
    }

    return (
        <>
            <div className="contenedorGeneral">
                <div className="contenedorContenido">
                    <img src={logoWaiss} alt="Iness Waiss Tarot Terapeutico" />
                    <div dangerouslySetInnerHTML={{__html: contenido}}></div>
                </div>
            </div>
        </>
    )
}

export default ResultadoCompra