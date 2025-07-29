import styles from "./venta.module.css"
import { useSyncAdmin } from "../../hooks/useSyncservAdm"
import dbAdm from "../../db/dbAdm"
import { useEffect, useState } from "react";
import TarjetaVentas from "../../components/TarjetaVentas/Index";

function Venta() {

    const [ventas, setVentas] = useState([]);
    const [carritos, setCarritos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [abierto, setAbierto] = useState(null);
    const { loading, error } = useSyncAdmin(true)

    useEffect(() => {
        const cargarDatos = async () => {
            const [ventasData, carritosData, clientesData] = await Promise.all([
                dbAdm.ventas.toArray(),
                dbAdm.carrito.toArray(),
                dbAdm.clientes.toArray()
            ]);

            setVentas(ventasData.sort((a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora)));
            setCarritos(carritosData);
            setClientes(clientesData);
        };

        cargarDatos();
    }, []);

    const obtenerCliente = (id_cli) =>
        clientes.find((cli) => cli.id_cli === id_cli)?.nombre || "—";

    const obtenerCarrito = (id_vta) =>
        carritos.filter((item) => item.id_vta === id_vta);

    const calcularCantidadTotal = (items) =>
        items.reduce((sum, item) => sum + (item.cant || 0), 0);



    return (
        <section className={styles.paginaVentas}>
            <h1 className={styles.paginaVentas__titulo}>Listado de Ventas</h1>
            <div className={styles.paginaVentas__ventasActivas}>



                {
                    ventas.map((vta) => {
                        const cliente = obtenerCliente(vta.id_cli);
                        const items = obtenerCarrito(vta.id_vta) || [];
                        const totalArticulos = calcularCantidadTotal(items);
                        

                        return (
                            <TarjetaVentas
                                key={vta.id_vta}
                                cliente={cliente}
                                cant={totalArticulos}
                                totalVenta={vta.total_venta}
                                fecha={vta.fecha_hora}
                                carrito={items}
                            />)
                    })
                }





            </div>
        </section>
    )
}
export default Venta