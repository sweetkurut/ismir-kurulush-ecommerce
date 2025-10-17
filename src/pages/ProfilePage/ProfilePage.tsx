import { useState } from "react";
import s from "./style.module.scss";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { ProfileContent } from "./components/ProfileContent/ProfileContent";
import { OrdersContent } from "./components/OrdersContent/OrdersContent";
import { FavoritesContent } from "./components/Favorites/FavoritesContent";
import { ApplicationsContent } from "./components/ApplicationsContent/ApplicationsContent";

const renderTabContent = (activeTab) => {
    switch (activeTab) {
        case "profile":
            return <ProfileContent />;
        case "orders":
            return <OrdersContent />;
        case "favorites":
            return <FavoritesContent />;
        case "applications":
            return <ApplicationsContent />;
        default:
            return <ProfileContent />;
    }
};

export const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("profile");

    const nav = useNavigate();

    const handleNav = () => {
        nav("/login");
    };

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.content}>
                    <div className={s.profileSection}>
                        <div className={s.profile}>
                            <div className={s.profileHeader}>
                                <div className={s.avatar}>
                                    <div className={s.icon_wrap}>
                                        <FaRegUser className={s.icon_profileHeader} />
                                    </div>
                                </div>
                                <div className={s.userInfo}>
                                    <h4 className={s.userName}>Иван Иванов</h4>
                                    <p className={s.userEmail}>ivanov@example.com</p>
                                </div>
                            </div>

                            <div className={s.profile_navs}>
                                <div className={s.profile_nav}>
                                    <FaRegUser />
                                    <Link to="#" className={s.nav_link}>
                                        Профиль
                                    </Link>
                                </div>
                                <div className={s.profile_nav}>
                                    <BsBox />
                                    <Link to="#" className={s.nav_link}>
                                        Заказы
                                    </Link>
                                </div>
                                <div className={s.profile_nav}>
                                    <FaRegHeart />
                                    <Link to="#" className={s.nav_link}>
                                        Избранное
                                    </Link>
                                </div>
                                <div className={s.profile_nav}>
                                    <GrDocumentText />
                                    <Link to="#" className={s.nav_link}>
                                        Заявки
                                    </Link>
                                </div>
                            </div>

                            <div className={s.profile_btn}>
                                <button className={s.btn} onClick={handleNav}>
                                    Войти
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={s.mainContent}>
                        <div className={s.tabs}>
                            <div
                                className={`${s.tab} ${activeTab === "profile" ? s.active : ""}`}
                                onClick={() => setActiveTab("profile")}
                            >
                                Профиль
                            </div>
                            <div
                                className={`${s.tab} ${activeTab === "orders" ? s.active : ""}`}
                                onClick={() => setActiveTab("orders")}
                            >
                                Заказы
                            </div>
                            <div
                                className={`${s.tab} ${activeTab === "favorites" ? s.active : ""}`}
                                onClick={() => setActiveTab("favorites")}
                            >
                                Избранное
                            </div>
                            <div
                                className={`${s.tab} ${activeTab === "applications" ? s.active : ""}`}
                                onClick={() => setActiveTab("applications")}
                            >
                                Заявки
                            </div>
                        </div>
                        <div>{renderTabContent(activeTab)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
