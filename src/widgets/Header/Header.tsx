import { classNames } from "@/shared/lib/classNames/classNames";
import s from "./style.module.scss";
import { AppLink } from "@/shared/ui/AppLink/AppLink";

import { FaSearch } from "react-icons/fa";
import { CiHeart, CiUser } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";

import logo from "@/shared/assets/images/logo.svg";

interface HeaderProps {
    className?: string;
}

const navItems = [
    { title: "Главная", to: "/" },
    { title: "Каталог", to: "/catalog" },
    { title: "Услуги", to: "/service" },
    // { title: "Контакты", to: "/feedback" },
    { title: "Оставить заявку", to: "/feedback" },
];

export const Header = ({ className }: HeaderProps) => {
    return (
        <header className={classNames(s.Header, {}, [className])}>
            <div className={s.TopBar}>
                <div className={classNames(s.TopBarContent, {}, ["container"])}>
                    <div className={s.info}>
                        <p>Работаем: Пн-СБ 9:00-18:00</p>
                        <p>Доставка по всему Кыргызстану</p>
                    </div>
                    <div className={s.contact}>
                        <a href="tel:+99312123456">+993 12 12-34-56</a>
                    </div>
                </div>
            </div>

            <div className={s.MainBar}>
                <div className={classNames(s.MainBarContent, {}, ["container"])}>
                    <AppLink to={"/"} className={s.logoLink}>
                        <img src={logo} alt="logo" />
                    </AppLink>

                    <div className={s.searchContainer}>
                        <FaSearch className={s.searchIcon} />
                        <input type="text" placeholder="Поиск товаров..." className={s.searchInput} />
                    </div>

                    <div className={s.actionIcons}>
                        <AppLink to="/wishlist" className={s.actionIconLink}>
                            <CiHeart />
                            <span className={s.badge}>10</span>
                        </AppLink>
                        <AppLink to="/basket" className={s.actionIconLink}>
                            <SlBasket />
                            <span className={s.badge}>0</span>
                        </AppLink>
                        <AppLink to="/profile" className={s.actionIconLink}>
                            <CiUser />
                        </AppLink>
                    </div>
                </div>
            </div>

            <nav className={s.MenuBar}>
                <div className={classNames(s.MenuContent, {}, ["container"])}>
                    <ul className={s.navigationList}>
                        {navItems.map((item) => (
                            <li key={item.title}>
                                <AppLink
                                    className={s.menuItem}
                                    activeClassName={s.menuItem__active}
                                    to={item.to}
                                >
                                    {item.title}
                                </AppLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};
