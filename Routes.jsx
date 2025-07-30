import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./src/hooks/ProtectedRoute";
import { lazy, Suspense, useEffect } from "react";

import LayoutApp from "./src/components/LayoutApp/Index"
import LoginPage from "./src/pages/Login/Index";
import Ventas from "./src/pages/Ventas/Index"
import E404 from "./src/pages/E404/Index"

function AppRoute() {

    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
        };
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);
    return (
        <BrowserRouter>
            <Suspense fallback={null}>
                <Routes>
                    <Route element={<LayoutApp />}>
                        {/** Rutas públicas */}
                        <Route index element={<LoginPage />} />
                        <Route path="*" element={<E404 />} />

                        {/** Rutas protrgidas */}
                        <Route element={<ProtectedRoute />}>
                        <Route path="/Ventas" element={<Ventas />} />
                        

                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )

}
export default AppRoute