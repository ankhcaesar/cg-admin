import { useContext } from "react"
import styles from "./Boton.module.css"
import { GlobalContext } from "../../context/GlobalContext"

function Boton(props) {
    const { botonVibrar } = useContext(GlobalContext)
    const { ancho, type, onClick, label, disabled, formulario } = props
    return (
        <button
            className={disabled ? styles.boton_disabled : styles.boton_active}
            style={{ width: `${ancho}` }}
            type={type}
            disabled={disabled}
            onClick={() => {
                botonVibrar(20);
                {onClick && onClick();}
            }}
            form={formulario}>
            {label}
        </button>
    )
}
export default Boton