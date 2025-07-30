import styles from "./Menu.module.css"
import BotonMenu from "../BotonMenu/Index"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { Storefront, ProductionQuantityLimits, People, DeliveryDining } from "@mui/icons-material"

function Menu() {

    return (
        <section className={styles.menu}>
            <BotonMenu
                destino="inicio"
                icono={Storefront}
            />
            <BotonMenu
                destino="ventas"
                icono={ProductionQuantityLimits}
            />

            <div className={styles.menu__carrito}>
                <BotonMenu
                    destino="clientes"
                    icono={People}
                />
            </div>

            <div className={styles.menu__carrito}>
                <BotonMenu
                    destino="entregas"
                    icono={DeliveryDining}
                />
            </div>
        </section>
    )
}

export default Menu