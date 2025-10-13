import { useState } from "react";
import s from "./style.module.scss";

export const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
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
    );
};
