import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const GlobalContext = createContext();


function GlobalContextProvider({ children }) {

    // Variables
    const navigate = useNavigate();
    const [botonMenu, setBotonMenu] = useState("princinicialal");
    const [cabecera, setCabecera] = useState({ "titulo": "Clary Gourmet", "origen": "inicio" });
    const [session, setSession] = useState(null);

    //funcion vibrar
    function botonVibrar(ms) {
        if ('vibrate' in navigator) {
            navigator.vibrate(ms);
        }
    }// fin funcion vibrar

    //funcion ir
    function ir(destino, opciones = {}) {
        const to = destino.trim().toLowerCase();

        if (to === "salir") {
            console.log("funcion cerrar sesion aun no creada");
            return;
        }

        const rutas = {
            inicio: "/",
            ventas: "/Ventas",

        };

        if (rutas[to]) {
            navigate(rutas[to], opciones);
        } else {
            console.warn(`Ruta no reconocida: "${to}"`);
        }
    }
    //onClick={()=>ir("salir")} 
    // fin funcion ir 

    


    // Loader
    const [loader, setLoader] = useState({ show: false });
    // Fin Loader


    // funcion formato moneda 
    function formatomoneda(valor, esmonetario = false) {
        const opciones = {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        };

        if (esmonetario) {
            opciones.style = "currency";
            opciones.currency = "ARS";
        }

        return new Intl.NumberFormat("es-AR", opciones).format(valor);
    } // Fin funcion formato moneda



    // Funcion formato fecha y hora
    function formatoFecha(dateTime) {
        const date = new Date(dateTime);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const anio = date.getFullYear();

        return `${dia}/${mes}/${anio}`;
    };

    function formatoHora(dateTime) {
        const date = new Date(dateTime);
        const hora = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');

        return `${hora}:${minutos}`;
    };// fin formato fechay hora



    return (

        <GlobalContext.Provider value={
            {
                ir,
                botonMenu, setBotonMenu,
                cabecera, setCabecera,

                loader, setLoader,
                botonVibrar,

                formatomoneda, formatoFecha, formatoHora,
                session, setSession
            }
        }> {children} </GlobalContext.Provider>
    )
}
export default GlobalContextProvider