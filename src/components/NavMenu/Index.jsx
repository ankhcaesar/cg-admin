import { useState } from "react";
import styles from "./NavMenu.module.css";
import { ArrowBackIosNew } from "@mui/icons-material";

function NavMenu({ menus, onItemSelected, filtros }) {
    const [stack, setStack] = useState([menus]);
    const [openIndex, setOpenIndex] = useState(null);

    const currentMenus = stack[stack.length - 1];

    const toggleSubmenu = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleItemClick = (item) => {
        if (Array.isArray(item.submenu) && item.submenu.length > 0) {
            // Tiene submenú real: lo abrimos
            setStack([...stack, item.submenu]);
            setOpenIndex(null);
        } else {
            // Ítem de acción: notificamos
            console.log(">>> Item seleccionado:", item);
            if (onItemSelected) onItemSelected(item);

            // Retrocompatibilidad
            if (item.onClick) item.onClick();
            if (item.href) window.location.href = item.href;
        }
    };

    const goBack = () => {
        if (stack.length > 1) {
            setStack(stack.slice(0, -1));
            setOpenIndex(null);
        }
    };

    return (
        <section className={styles.contenedor}>
            {stack.length > 1 && (
               <button className={styles.contenedor_nav_btn} onClick={goBack}>
                    <ArrowBackIosNew fontSize="ligth" />
                </button>
            )}

            {currentMenus.map((menu, index) => (
                <nav className={styles.contenedor_nav} key={index}>
                    <button
                        className={styles.contenedor_nav_btn}
                        onClick={() => toggleSubmenu(index)}
                    >
                        {menu.label}
                    </button>

                    {openIndex === index && menu.submenu && (
                        <nav className={styles.contenedor_subnav}>
                            {menu.submenu.map((item, i) => {
                                const isActivo = item.action === "filtrar-estado" && filtros?.estados?.includes(item.value);
                                return (
                                    <button
                                        key={i}
                                        className={`${styles.contenedor_nav_btn} ${isActivo ? styles.activo : ""}`}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        {item.label}
                                    </button>
                                )
                            })}
                        </nav>
                    )}
                </nav>
            ))}
        </section>
    );
}

export default NavMenu;
