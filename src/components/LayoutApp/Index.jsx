import styles from "./LayoutApp.module.css"
import { Outlet } from "react-router-dom"
import TotalContainer from "../TotalContainer/Index"
import GlobalContextProvider, { GlobalContext } from "../../context/GlobalContext"
import Cabecera from "../Cabecera/Index"
import Menu from "../Menu/Index"

function LayoutApp() {

    return (
        <main> 
            <GlobalContextProvider>
                <TotalContainer className={styles.total__container}>
                    <Cabecera className={styles.cabecera} />
                    <Outlet />
                    <Menu className={styles.menu} />
                </TotalContainer>
            </GlobalContextProvider>
        </main>
    )
}
export default LayoutApp