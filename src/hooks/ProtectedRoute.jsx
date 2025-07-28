import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext"
import { supabase } from "../db/supabaseclient";

function ProtectedRoute() {

  const [loading, setLoading] = useState(true);
  const { session, setSession } = useContext(GlobalContext);
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return session ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;