import "../TarjetaTestimonio/TarjetaTestimonio.css"

const TarjetaTestimonio = (props) =>{
    return(
        <>
            <div className="contenedorTestimonio">
                <img className="imagenTestimonio" src={props.img} alt="retratoTestimonio" />
                <p className="tituloTestimonio">{props.titulo}</p>
                <p className="cuerpoTestimonio">{props.cuerpo}</p>
            </div>
        </>
    )
}

export default TarjetaTestimonio