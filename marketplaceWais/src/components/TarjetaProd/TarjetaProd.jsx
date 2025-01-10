import { useEffect, useState } from "react"
import "./TarjetaProd.css"
import ModalInfo from "../ModalInfo/ModalInfo";
import axios from "axios"

const TarjetaProd = (props) => {
    const [mostrar, setMostrar] = useState(false);
    const [preciosProductos, setPrecios] = useState(null);
    const [statusCarga, setStatusCarga] = useState(false);
    axios.defaults.headers.common["ngrok-skip-browser-warning"] = 'uwu'

    useEffect(()=>{
        guardarPrecios()
    },[])

    useEffect(()=>{
        if(preciosProductos != null){
            setStatusCarga(!statusCarga)
        }
    },[preciosProductos])

    const obtenerPrecios = async () => {
        try {
            const response = await axios.get(" https://3b49-181-97-71-112.ngrok-free.app/get_precios")
            const precios = response.data.preciosProductos
            return precios
        }catch(error){
            console.log(error)
        }
    }

    const guardarPrecios = async () => {
        const aGuardar = await obtenerPrecios();
        setPrecios(aGuardar)
    }

    const manejoModal = () => {
        setMostrar(!mostrar);
    }

    const createPreference = async () => {
        try {
            const response = await axios.post(" https://3b49-181-97-71-112.ngrok-free.app/create_preference", {
                title: props.titulo,
                quantity: 1,
                id_producto: props.idProd,
            })

            const {id} = response.data
            return id

        } catch (error){
            console.log(error)
        }
    }

    const handleBuy = async () => {
        const id = await createPreference();
        if(id){
            props.passPreferencia(id)
            props.passEstadoPasarela()
        }
    }

    const ejectuarCompra = () => {
        props.passProductoActual(props.idProd)
        handleBuy()
    }

    return (
        <>
            <div className="contenedorTarjeta">

                <div className="contenedorTitulo">
                    <p className={props.tipo + " titulo"}>{props.titulo}</p>
                </div>

                <div className="contenedorInfo">
                    <p className="cuerpo">{props.texto}</p>
                    <div onClick={manejoModal} href="#" className={props.tipo + " btnMasInfo"} id="btnMasInfo">Mas Informacion</div>
                </div>

                <div className="contenedorComprar">
                    {!statusCarga ? <p>-----------</p> : <p className="precio cuerpo">{"$" + preciosProductos[props.idProd].precio_USD + " | $" + preciosProductos[props.idProd].precio_ARS + "ARS"}</p>}
                    <button className={props.tipo + " btnComprar"} id="btnComprar" onClick={ejectuarCompra}><p>Comprar Hoy</p></button>
                </div>
                
                <ModalInfo estado={mostrar} funcionManejo={manejoModal} tipo={props.tipo} titulo={props.titulo} contenido={props.infoModal}/>

            </div>
        </>
    )
}

export default TarjetaProd