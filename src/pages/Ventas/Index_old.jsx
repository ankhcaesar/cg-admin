import { useEffect, useState } from "react";
import dbAdm from "../../db/dbAdm"
import {useSyncAdmin} from "../../db/syncservAdm"

const Admin = () => {
    const [ventas, setVentas] = useState([]);
    const [carritos, setCarritos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [abierto, setAbierto] = useState(null); 
const {loading, error}= useSyncAdmin(true)

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
        <div className="p-4">
            
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => {
                        const cliente = obtenerCliente(venta.id_cli);
                        const items = obtenerCarrito(venta.id_vta);
                        const totalArticulos = calcularCantidadTotal(items);

                        return (
                            <tr key={venta.id_vta}>
                                <td >{new Date(venta.fecha_hora).toLocaleString()}</td>
                                <td >{cliente}</td>
                                <td >{totalArticulos}</td>
                                <td >${venta.total_venta?.toFixed(2)}</td>
                                <td >
                                    <button
                                        className="text-blue-600 underline"
                                        onClick={() =>
                                            setAbierto(abierto === venta.id_vta ? null : venta.id_vta)
                                        }
                                    >
                                        {abierto === venta.id_vta ? "Ocultar" : "Ver"}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Detalles desplegables */}
            {ventas.map((venta) => {
                if (abierto !== venta.id_vta) return null;

                const items = obtenerCarrito(venta.id_vta);
                return (
                    <div key={`detalle-${venta.id_vta}`} className="bg-gray-100 p-4 border-t">
                        <h3 className="font-semibold mb-2">Detalle de la venta #{venta.id_vta}</h3>
                        <ul className="space-y-1">
                            {items.map((item, i) => (
                                <li key={i} className="flex justify-between">
                                    <span>{item.cant} x {item.nombreArts}</span>
                                    <span>${item.valor_x_cant?.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default Admin;
