import { classNames } from "@/shared/lib/classNames/classNames";
import s from "./style.module.scss";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { FaSearch } from "react-icons/fa";
import { CiHeart, CiUser } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import logo from "@/shared/assets/images/logo.svg";
import { useAppSelector } from "@/store/hooks";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useEffect, useState } from "react";

interface HeaderProps {
    className?: string;
}

const navItems = [
    { title: "Главная", to: "/" },
    { title: "Каталог", to: "/catalog" },
    { title: "Услуги", to: "/service" },
    { title: "Оставить заявку", to: "/feedback" },
];

export const Header = ({ className }: HeaderProps) => {
    const [isHidden, setIsHidden] = useState(false);
    const { cart } = useAppSelector((state) => state.cart);
    const { favorites } = useAppSelector((state) => state.favorites);
    const totalFavorites = favorites?.results.length ?? 0;
    const totalItemsInCart = cart?.items.length ?? 0;

    useEffect(() => {
        let lastScrollY = 0;
        const threshold = 90;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > threshold && currentScrollY > lastScrollY) {
                setIsHidden(true);
            } else if (currentScrollY < lastScrollY) {
                setIsHidden(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={classNames(s.Header, { [s.hidden]: isHidden }, [className])}>
            {/* TopBar */}
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
                    <div className={s.burger_logo_wrap}>
                        <div className={s.mobileOnly}>
                            <MobileMenu />
                        </div>
                        <AppLink to="/" className={s.logoLink}>
                            <img
                                src={logo}
                                alt="ISMIR KURULUSH"
                                className={s.logo_img}
                                loading="eager"
                                decoding="async"
                            />
                        </AppLink>
                    </div>

                    <div className={s.searchContainer}>
                        <FaSearch className={s.searchIcon} />
                        <input type="text" placeholder="Поиск товаров..." className={s.searchInput} />
                    </div>

                    <div className={s.actionIcons}>
                        <AppLink to="/favorites" className={s.actionIconLink}>
                            <CiHeart />
                            {totalFavorites > 0 && (
                                <span className={s.badge}>
                                    {totalFavorites > 99 ? "99+" : totalFavorites}
                                </span>
                            )}
                        </AppLink>
                        <AppLink to="/basket" className={s.actionIconLink}>
                            <SlBasket />
                            {totalItemsInCart > 0 && (
                                <span className={s.badge}>
                                    {totalItemsInCart > 99 ? "99+" : totalItemsInCart}
                                </span>
                            )}
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
