import styles from "./E404.module.css";
import e404img from "/imgs/E_404.svg";

function E404() {
    return (
        <section className={styles.e404}>

            <div className={styles.e404__container}>
                <img
                    src={e404img}
                    alt="Página web no encontrada"
                    className={styles.e404__imagen}
                />
                <div className={styles.e404__animacionPuerta}></div>
            </div>

        </section>
    );
}

export default E404;
