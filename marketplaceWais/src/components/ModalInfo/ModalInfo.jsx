import "../ModalInfo/ModalInfo.css"
import "animate.css"
import "boxicons"

const ModalInfo = (props) => {
    return (
        <>
            <div className={"modalTarjeta animate__animated" + (props.estado ? " visible animate__fadeIn" : " ")} onClick={props.funcionManejo}>
                <div className="contenedorModal">
                    <div className={"btnCerrarModal " + props.tipo} onClick={props.funcionManejo}><box-icon name='x' size="md"></box-icon></div>
                    <p className={"tituloModal " + props.tipo}>{props.titulo}</p>
                    <p className="cuerpoModal">{props.contenido}</p>
                </div>
            </div>
        </>
    )
}

export default ModalInfo