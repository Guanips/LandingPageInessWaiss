import "../BtnGeneral/BtnGeneral.css"
import { useEffect } from "react"

const BtnGeneral = (props) => {
    let seccionCursos;
    let seccionLecturas;

    useEffect(()=> {
        seccionCursos = document.getElementById("seccionCursos");
        seccionLecturas = document.getElementById("seccionLecturas");
    },[])

    let btnClass = "btnGeneral"
    let objetivo = ""

    const handleScroll = () => {
        if(props.tipo == "Cursos"){
            seccionCursos.scrollIntoView({ behavior: "smooth", block: "start"});
        } else if (props.tipo == "Lecturas"){
            seccionLecturas.scrollIntoView({ behavior: "smooth", block: "start"});
        } else {
            seccionTestimonios.scrollIntoView({ behavior: "smooth", block: "start"});
        }
    }

        if (props.tipo == "Cursos") {
            btnClass += " cursos"
        } else if (props.tipo == "Lecturas"){
            btnClass += " lecturas"
        } else {
            btnClass += " testimonios"
        }


    return (
        <>
            <a className={btnClass + " " + props.className} id="btnGeneral" onClick={handleScroll}>{props.tipo}</a>
        </>
    )
}

export default BtnGeneral;