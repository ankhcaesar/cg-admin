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

            {mostrarDetalle && (
                <div className={styles.tarjetaVentas_detalle}>
                    <ul>
                        {carrito.map((item, index) => (
                            <li key={index}>
                                {item.nombreArts} — {item.cant} x {formatomoneda(item.valor_venta, true)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}

export default TarjetaVentas;
