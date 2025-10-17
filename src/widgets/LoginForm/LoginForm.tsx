import { useState } from "react";
import s from "./style.module.scss";
import { FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";

export const LoginForm = () => {
    const [authMethod, setAuthMethod] = useState("email");

    const isEmailActive = authMethod === "email";

    const labelText = isEmailActive ? "Email" : "Телефон";
    const inputPlaceholder = isEmailActive ? "example@email.com" : "+996 (XXX) XX-XX-XX";

    const handleToggleClick = (e, method) => {
        e.preventDefault();
        setAuthMethod(method);
    };

    return (
        <form className={s.form}>
            <h2 className={s.title}>Войти в аккаунт</h2>
            <p className={s.desc}>Введите email или номер телефона для входа</p>

            <div className={s.toggleTabs}>
                <button
                    className={`${s.toggleTab} ${isEmailActive ? s.toggleActive : ""}`}
                    onClick={(e) => handleToggleClick(e, "email")}
                >
                    <FaRegEnvelope /> Email
                </button>

                <button
                    className={`${s.toggleTab} ${!isEmailActive ? s.toggleActive : ""}`}
                    onClick={(e) => handleToggleClick(e, "phone")}
                >
                    <FaPhoneAlt /> Телефон
                </button>
            </div>

            <div className={s.formGroup} style={{ marginTop: "0" }}>
                <label className={s.label}>{labelText}</label>
                <input
                    className={s.input}
                    type={isEmailActive ? "email" : "tel"}
                    placeholder={inputPlaceholder}
                />
            </div>

            <button className={s.submitButton} type="submit">
                Получить код
            </button>
        </form>
    );
};
