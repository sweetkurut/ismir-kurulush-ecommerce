import { useEffect, useState } from "react";
import s from "./MobileMenu.module.scss"; // s - это стили MobileMenu
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { FaArrowRight } from "react-icons/fa";
import { CatalogDropdown } from "@/shared/ui/CatalogDropdown/CatalogDropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetCatalogCategories } from "@/store/slices/categoriesSlice";

const navItems = [
    { title: "Главная", to: "/" },
    // { title: "Каталог", to: "/catalog" }, // Удаляем, так как CatalogDropdown заменит этот пункт
    { title: "Услуги", to: "/service" },
    { title: "Оставить заявку", to: "/feedback" },
];

export const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { catalog_category } = useAppSelector((state) => state.category);
    const toggleMenu = () => setIsOpen(!isOpen);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchGetCatalogCategories());
    }, [dispatch]);

    // ... [useEffect для блокировки скролла]

    return (
        <>
            <button onClick={toggleMenu} className={s.burgerButton}>
                <span className={classNames(s.line, { [s.active]: isOpen })}></span>
                <span className={classNames(s.line, { [s.active]: isOpen })}></span>
                <span className={classNames(s.line, { [s.active]: isOpen })}></span>
            </button>

            <div className={classNames(s.overlay, { [s.active]: isOpen })} onClick={toggleMenu} />

            <div className={classNames(s.menu, { [s.active]: isOpen })}>
                <nav className={s.nav}>
                    {navItems.map((item) => (
                        <AppLink
                            key={item.title}
                            to={item.to}
                            className={s.navItem}
                            activeClassName={s.navItem__active}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.title}
                            <FaArrowRight />
                        </AppLink>
                    ))}

                    <CatalogDropdown
                        categories={catalog_category}
                        onNavigateAndClose={() => setIsOpen(false)}
                    />
                </nav>
            </div>
        </>
    );
};
