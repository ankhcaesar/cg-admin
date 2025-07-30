import { useState } from "react";

export const estadosDisponibles = [
    'recibido',
    'confirmado',
    'en preparación',
    'listo',
    'cobrado'
];

export default function useFiltrosVentas() {
    const [filtros, setFiltros] = useState({
        estados: [],
    });

    const limpiarFiltros = () => {

        setFiltros({ estados: [] });
    };

    const toggleEstadoFiltro = (estado) => {
        setFiltros(prev => {
            const nuevosEstados = prev.estados.includes(estado)
                ? prev.estados.filter(e => e !== estado)
                : [...prev.estados, estado];

            return {
                ...prev,
                estados: nuevosEstados
            };
        });
    };

    const aplicarFiltros = (ventas) => {
        const filtrado = ventas.filter(vta => {
            if (filtros.estados.length > 0 && !filtros.estados.includes(vta.estado)) {
                return false;
            }
            return true;
        });

        return filtrado;
    };

    return {
        filtros,
        limpiarFiltros,
        toggleEstadoFiltro,
        aplicarFiltros
    };
}
