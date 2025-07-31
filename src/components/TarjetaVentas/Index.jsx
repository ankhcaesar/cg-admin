import { useContext, useState } from "react";
import styles from "./tarjetaVentas.module.css";
import { GlobalContext } from "../../context/GlobalContext";
import { Undo, ShoppingBasket, Delete } from "@mui/icons-material"; { }


function TarjetaVentas({ cliente, cant, totalVenta, fecha, carrito = [], onBorrar }) {
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const { formatomoneda, formatoFecha } = useContext(GlobalContext);

    const toggleDetalle = () => {
        setMostrarDetalle(prev => !prev);
    };

    return (
        <section className={styles.tarjetaVentas_principal}>
            <div className={styles.tarjetaVentas_principal_up}>


                <div className={styles.tarjetaVentas_principal_datos}>

                    <div className={styles.tarjetaVentas_principal_datos_up}>
                        <p> {cliente}</p>
                        <p> {formatoFecha(fecha)}</p>
                    </div>

                    <div className={styles.tarjetaVentas_principal_datos_down}>
                        <p>{cant} {cant > 1 ? 'articulos' : 'articulo'} </p>
                        <p className={styles.tarjetaVentas_principal_datos_down_total}>{formatomoneda(totalVenta, true)}</p>
                    </div>
                </div>

                <div className={styles.tarjetaVentas_principal_botones}>

                    <button className={styles.tarjetaVentas_principal_botones_borrar}
                        onClick={onBorrar}
                        title="Eliminar venta"
                    >
                        <Delete fontSize="small" color="error" />
                    </button>
                    <button className={styles.tarjetaVentas_principal_botones_mas}
                        onClick={toggleDetalle}>
                        {mostrarDetalle ? <ShoppingBasket fontSize="small" color="secondary" /> : <ShoppingBasket fontSize="small" color="primary" />}
                    </button>



                </div>
            </div>

            {mostrarDetalle &&
                carrito.map((item, index) => (
                    <div className={styles.tarjetaVentas_detalle} key={index}>

                        <div className={styles.tarjetaVentas_detalle_izq}>
                            <p className={styles.tarjetaVentas_detalle_izq_cant}>{item.cant}</p>
                            <p className={styles.tarjetaVentas_detalle_izq_articulo}>{item.nombreArts}</p>
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
