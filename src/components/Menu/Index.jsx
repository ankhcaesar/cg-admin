import styles from "./Menu.module.css"
import BotonMenu from "../BotonMenu/Index"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import {Home, Search, ShoppingCart} from "@mui/icons-material"

function Menu() {

    return (
        <section className={styles.menu}>
            <BotonMenu
                destino="inicio"
                icono={Home}
            />
            <BotonMenu
                destino="menu"
                icono={Search}
            />
            <div className={styles.menu__carrito}>
                <BotonMenu
                    destino="carrito"
                    icono={ShoppingCart}
                />
            </div>
        </section>
    )
}

export default Menu