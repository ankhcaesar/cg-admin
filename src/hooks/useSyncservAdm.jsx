import { useEffect, useState, useContext } from "react";
import dbAdm from "../db/dbAdm";
import { supabase } from "../db/supabaseclient";
import { getPublicImage } from "../db/getPublicImage";
import { GlobalContext } from "../context/GlobalContext";

export const useSyncAdmin = (autoSync = false) => {
    const { session } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const carpetasStorage = {
        articulos: "arts",
        categorias: "cats",
        sub_categorias: "subcats"
    };
    const camposImagen = {
        articulos: "imagen_articulo",
        categorias: "imagen_categoria",
        sub_categorias: "imagen_subcategoria",
    };
    const procesarRegistro = async (tabla, registro) => {
        const campoImagen = camposImagen[tabla];
        const registroProcesado = { ...registro };

        if (campoImagen && registro[campoImagen]) {
            registroProcesado.imagen_blob = await getPublicImage(
                carpetasStorage[tabla],
                registro[campoImagen]
            );
        } else {
            registroProcesado.imagen_blob = null;
        }

    
        if (tabla === "carrito") {
            try {
                const articulo = await dbAdm.articulos.get(registro.id_arts);
                const subcat = articulo?.id_subcats
                    ? await dbAdm.sub_categorias.get(articulo.id_subcats)
                    : null;

registroProcesado.nombreArts = `${subcat?.sub_categorias || "—"} ${articulo?.articulo || "—"}`.trim();
            } catch (e) {
                console.error("Error construyendo nombreArts:", e);
                registroProcesado.nombreArts = "— —";
            }
        }

        return registroProcesado;
    };


    const syncAdmin = async () => {
        if (!session) return;
        try {
            setLoading(true);
            setError(null);
            const tablas = ["articulos", "categorias", "sub_categorias", "ventas", "carrito", "clientes", "entrega"];

            for (const tabla of tablas) {
                const { data, error } = await supabase.from(tabla).select("*");
                if (error) {
                    setError(error);
                    console.error(`Error obteniendo ${tabla}:`, error);
                    continue;
                }

                const registrosProcesados = await Promise.all(
                    data.map((registro) => procesarRegistro(tabla, registro))
                );

                for (const item of registrosProcesados) {
                    await dbAdm[tabla].put(item);
                }

            }
            if (error) {
                console.error("Error general durante sincronización:", error);
                setError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autoSync) {
            syncAdmin();
        }
    }, [autoSync, session]);


    useEffect(() => {
        const subscriptions = [];

        ["articulos", "categorias", "sub_categorias", "ventas", "carrito", "clientes", "entrega"].forEach((tabla) => {
            const subscription = supabase
                .channel(`changes_${tabla}`)
                .on(
                    "postgres_changes",
                    {
                        event: "*",
                        schema: "public",
                        table: tabla,
                    },
                    async (payload) => {
                        try {
                            const primaryKeys = {
                                articulos: "id_arts",
                                categorias: "id_cats",
                                sub_categorias: "id_subcats",
                                ventas: "id_vta",
                                carrito: "id_carrito",
                                clientes: "id_cli",
                                entrega: "id_entrega"

                            };
                            const registroProcesado =
                                payload.new && (await procesarRegistro(tabla, payload.new));
                            switch (payload.eventType) {
                                case "INSERT":
                                case "UPDATE":
                                    await dbAdm[tabla].put(registroProcesado);
                                    break;
                                case "DELETE":


                                    const key = primaryKeys[tabla];
                                    if (payload.old?.[key]) {
                                        await dbAdm[tabla].delete(payload.old[key]);
                                    }
                                    break;
                            }
                        } catch (err) {
                            console.error(`Error en cambio de ${tabla}:`, err);
                        }
                    }
                )
                .subscribe();

            subscriptions.push(subscription);
        });

        return () => {
            subscriptions.forEach((sub) => supabase.removeChannel(sub));
        };
    }, []);
    return {
        syncAdmin,
        loading,
        error,
    };

};
