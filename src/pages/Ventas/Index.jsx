import styles from "./venta.module.css";
import { useSyncAdmin } from "../../hooks/useSyncservAdm";
import dbAdm from "../../db/dbAdm";
import { useEffect, useState } from "react";
import TarjetaVentas from "../../components/TarjetaVentas/Index";
import NavMenu from "../../components/NavMenu/Index";
import useFiltrosVentas, { estadosDisponibles } from "../../hooks/useFiltrosVentas";
import { Undo } from "@mui/icons-material";{}

function Venta() {
    const [ventas, setVentas] = useState([]);
    const [carritos, setCarritos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const { loading, error } = useSyncAdmin(true);

    // Usamos el hook de filtros
    const {
        filtros,
        limpiarFiltros,
        toggleEstadoFiltro,
        aplicarFiltros
    } = useFiltrosVentas();

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

    const ventasFiltradas = aplicarFiltros(ventas);

    const obtenerCliente = (id_cli) =>
        clientes.find((cli) => cli.id_cli === id_cli)?.nombre || "—";

    const obtenerCarrito = (id_vta) =>
        carritos.filter((item) => item.id_vta === id_vta);

    const calcularCantidadTotal = (items) =>
        items.reduce((sum, item) => sum + (item.cant || 0), 0);

    // Manejador de selección en el menú
    const handleMenuSelection = (item) => {

        if (item.action === "limpiar") {
            limpiarFiltros();
        } else if (item.action === "filtrar-estado") {
            toggleEstadoFiltro(item.value);
        }
    };

    // Configuración del menú
    const menuConfig = [
        {
            label: "Filtros",
            submenu: [
                {
                    label: <Undo fontSize="lite"/>,
                    action: "limpiar-filtros"
                },
                ...estadosDisponibles.map((estado) => ({
                    label: `${estado}`,
                    action: "filtrar-estado",
                    value: estado
                }))
            ]
        },
        {
            label: "Ventas",
            submenu: [
                { label: "Nueva", href: "#nueva-venta" }
            ]
        }
    ];

    return (
        <section className={styles.paginaVentas}>
            <div className={styles.paginaVentas_submenu}>
                <NavMenu
                    menus={menuConfig}
                    onItemSelected={handleMenuSelection}
                />
            </div>

            <h1 className={styles.paginaVentas__titulo}>Listado de Ventas</h1>
            <div className={styles.paginaVentas__ventasActivas}>
                {ventasFiltradas.map((vta) => {
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
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default Venta;