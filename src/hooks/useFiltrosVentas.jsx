import { useState } from "react";

// Lista fija y exacta de los estados válidos
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
        console.log('Limpiando filtros'); // Depuración opcional
        setFiltros({ estados: [] });
    };

    const toggleEstadoFiltro = (estado) => {
        console.log('Cambiando estado:', estado); // Depuración opcional
        setFiltros(prev => {
            const nuevosEstados = prev.estados.includes(estado)
                ? prev.estados.filter(e => e !== estado)
                : [...prev.estados, estado];
            console.log('Nuevos estados:', nuevosEstados); // Depuración opcional
            return {
                ...prev,
                estados: nuevosEstados
            };
        });
    };

    const aplicarFiltros = (ventas) => {
        console.log('Aplicando filtros:', filtros); // Depuración opcional
        const filtrado = ventas.filter(vta => {
            if (filtros.estados.length > 0 && !filtros.estados.includes(vta.estado)) {
                return false;
            }
            return true;
        });
        console.log('Ventas filtradas:', filtrado); // Depuración opcional
        return filtrado;
    };

    return {
        filtros,
        limpiarFiltros,
        toggleEstadoFiltro,
        aplicarFiltros
    };
}
