import styles from "./Cabecera.module.css"
import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { ArrowBackIosNew } from "@mui/icons-material"
import ProgressBall from "../ProgressBall"
function Cabecera() {
    const { ir, cabecera } = useContext(GlobalContext)
    const { titulo, origen } = cabecera

    return (
        <section className={styles.cabecera}>
            <button
                className={styles.cabecera__volver}
                onClick={() => { ir(origen) }}
                aria-label="Volver"
            >
                <ArrowBackIosNew
                    fontSize="medium"
                    className={styles.iconoVolver}
                />
            </button>
            <div className={styles.cabecera__titulo}>
                <h2>{titulo}</h2>
            </div>

            <div className={styles.cabecera__estado}>
                <ProgressBall/>
            </div>
        </section>
    )
}
export default Cabecera