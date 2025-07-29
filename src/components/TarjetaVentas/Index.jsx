import { useContext, useState } from "react";
import styles from "./tarjetaVentas.module.css";
import { GlobalContext } from "../../context/GlobalContext";

function TarjetaVentas({ cliente, cant, totalVenta, fecha, carrito = [] }) {
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const { formatomoneda, formatoFecha } = useContext(GlobalContext);

    const toggleDetalle = () => {
        setMostrarDetalle(prev => !prev);
    };

    return (
        <section className={styles.tarjetaVentas_principal}>
            <div className={styles.tarjetaVentas_principal_datos}>
                <p><strong>Fecha:</strong> {formatoFecha(fecha)}</p>
                <p><strong>Cliente:</strong> {cliente}</p>
                <p><strong>Cantidad:</strong> {cant}</p>
                <p><strong>Total:</strong> {formatomoneda(totalVenta, true)}</p>
            </div>

            <div className={styles.tarjetaVentas_principal_boton}>
                <button onClick={toggleDetalle}>
                    {mostrarDetalle ? "Ocultar Detalle" : "Ver Detalle"}
                </button>
            </div>

            {mostrarDetalle &&
                carrito.map((item, index) => (
                    <div className={styles.tarjetaVentas_detalle} key={index}>

                        <div className={styles.tarjetaVentas_detalle_izq}>
                            <p>{item.nombreArts}</p>
                            <p>{item.cant} </p>
                        </div>
                        <div className={styles.tarjetaVentas_detalle_der}>
                            <p>{formatomoneda(item.valor_venta, true)} </p>
                        </div>

                    </div>

                ))

            }
        </section>
    );
}

export default TarjetaVentas;
