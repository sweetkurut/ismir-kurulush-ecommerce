import { useState } from "react";
import s from "./style.module.scss";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";

export const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("profile");

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
                                    <AppLink to="#">Профиль</AppLink>
                                </div>
                                <div className={s.profile_nav}>
                                    <BsBox />
                                    <AppLink to="#">Заказы</AppLink>
                                </div>
                                <div className={s.profile_nav}>
                                    <FaRegHeart />
                                    <AppLink to="#">Избранное</AppLink>
                                </div>
                                <div className={s.profile_nav}>
                                    <GrDocumentText />
                                    <AppLink to="#">Заявки</AppLink>
                                </div>
                            </div>

                            <div className={s.profile_btn}>
                                <button className={s.btn}>Выйти</button>
                            </div>
                        </div>
                    </div>

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
                </div>
            </div>
        </div>
    );
};
