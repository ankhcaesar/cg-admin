import styles from "./loginPage.module.css";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../db/supabaseclient"
import CampoForm from "../../components/CampoForm/Index";
import Boton from "../../components/Boton/Index"
import { GlobalContext } from "../../context/GlobalContext";
function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setBotonMenu, setCabecera, ir, session, setSession } = useContext(GlobalContext)


    useEffect(() => {
        setBotonMenu("login");
        setCabecera((prev) => ({ ...prev, titulo: "Login", origen: "Login" }));

    }, []);

    useEffect(() => {
        if (session) {
            console.log("ingreso exitoso")
            ir("ventas");
        }
    }, [session, ir]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { email, password } = formData;
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError("Email o contraseña incorrectos");
            setLoading(false);
            return;
        }

        // ACTUALIZA LA SESSION EN CONTEXTO
        const { data: sessionData } = await supabase.auth.getSession();
        setSession(sessionData.session);

        setLoading(false);
        setFormData({ email: "", password: "" });
        ir("inicio");

        console.log("Session seteada:", sessionData.session); // <- Debería mostrar los datos del usuario
    };

    return (
        <section className={styles.login}>



            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2 className={styles.title}>Iniciar Sesión</h2>

                <CampoForm
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    title="Debes ingresar un email válido"
                />

                <CampoForm
                    label="Contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    required
                    title="Debes ingresar una contraseña"
                />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.boton}>

                    <Boton
                        ancho="40%"
                        type="submit"
                        disabled={loading}
                        label="Ingresar"
                    >
                    </Boton>
                </div>
            </form>
        </section>
    );
}
export default LoginPage