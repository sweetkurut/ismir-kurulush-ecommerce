import { useEffect, useState } from "react";
import s from "./BurgerMenu.module.scss";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { classNames } from "@/shared/lib/classNames/classNames";
import arrow from "@/shared/assets/icons/arrow_Icon.svg";

export const BurgerMenu = () => {
    const [isClosed, setIsClosed] = useState(false);

    const handleClick = () => {
        setIsClosed(!isClosed);
    };

    useEffect(() => {
        if (isClosed) {
            document.body.style.overflow = "hidden";
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = () => {
                handleClick();
            };
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            window.onpopstate = () => {};
        };
    }, [isClosed]);

    return (
        <div className={classNames(s.Burger, {}, ["container"])}>
            <div className={s.header}>
                <AppLink to={"/"}>
                    {/* <img src={info?.logo} alt="KPFL" /> */}
                    <h4>LOGO</h4>
                </AppLink>
                <button onClick={handleClick} className={s.button}>
                    <svg
                        fill="#000"
                        className={`${s.burger6} ${s.ham} ${s.hamRotate} ${s.ham1} ${
                            isClosed ? s.isClosed : ""
                        }`}
                        viewBox="0 0 100 100"
                    >
                        <path
                            className={`${s.line} ${s.top}`}
                            d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
                        />
                        <path className={`${s.line} ${s.middle}`} d="m 30,50 h 40" />
                        <path
                            className={`${s.line} ${s.bottom}`}
                            d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
                        />
                    </svg>
                </button>
            </div>
            <div className={`${s.wrapper} ${isClosed && s.active}`}>
                <nav>
                    <ul>
                        <li>
                            <AppLink
                                onClick={handleClick}
                                className={s.item}
                                activeClassName={s.item__active}
                                to={"/"}
                            >
                                <img src={arrow} alt="arrow" />; Главная
                            </AppLink>
                        </li>
                        <li>
                            <AppLink
                                onClick={handleClick}
                                className={s.item}
                                activeClassName={s.item__active}
                                to={"/standings"}
                            >
                                <img src={arrow} alt="arrow" />; Таблица
                            </AppLink>
                        </li>
                        <li>
                            <AppLink
                                onClick={handleClick}
                                className={s.item}
                                activeClassName={s.item__active}
                                to={"/statistics"}
                            >
                                <img src={arrow} alt="arrow" />; Статистика
                            </AppLink>
                        </li>
                        <li>
                            <AppLink
                                onClick={handleClick}
                                className={s.item}
                                activeClassName={s.item__active}
                                to={"/calendar-matches"}
                            >
                                <img src={arrow} alt="arrow" />; Календарь
                            </AppLink>
                        </li>
                        <li>
                            <AppLink
                                onClick={handleClick}
                                className={s.item}
                                activeClassName={s.item__active}
                                to={"/clubs"}
                            >
                                <img src={arrow} alt="arrow" />; Клубы
                            </AppLink>
                        </li>
                        <li>
                            <AppLink
                                onClick={handleClick}
                                className={s.item}
                                activeClassName={s.item__active}
                                to={"/judges"}
                            >
                                <img src={arrow} alt="arrow" />; Судьи
                            </AppLink>
                        </li>
                        <li>
                            <AppLink
                                onClick={handleClick}
                                className={s.item}
                                activeClassName={s.item__active}
                                to={"/news"}
                            >
                                <img src={arrow} alt="arrow" />; Новости
                            </AppLink>
                        </li>
                        <li>
                            <AppLink
                                onClick={handleClick}
                                className={s.item}
                                activeClassName={s.item__active}
                                to={"/media"}
                            >
                                <img src={arrow} alt="arrow" />; Медиа
                            </AppLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
