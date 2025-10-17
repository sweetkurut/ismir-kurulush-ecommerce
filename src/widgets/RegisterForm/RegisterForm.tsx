import React, { useState } from "react";
import s from "./style.module.scss";
import { FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";

export const RegisterForm = () => {
    const [step, setStep] = useState(0);
    const [authMethod, setAuthMethod] = useState("email");

    const isEmailActive = authMethod === "email";

    const handleCodeRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStep(1);
    };

    if (step === 1) {
        return (
            <div className={s.formCard}>
                <h2 className={s.title}>Создать аккаунт</h2>
                <p className={s.subtitle}>Заполните данные для регистрации</p>

                <p className={s.codeHeader}>Введите код подтверждения</p>
                <p className={s.codeHint}>Код отправлен на example@email.com</p>

                <div className={s.codeInputs}>
                    {[...Array(6)].map((_, index) => (
                        <input
                            key={index}
                            className={s.codeInput}
                            type="text"
                            maxLength={1}
                            inputMode="numeric"
                            autoFocus={index === 0}
                        />
                    ))}
                </div>

                <button className={s.submitButton}>Подтвердить</button>
            </div>
        );
    }

    return (
        <form className={s.formCard}>
            <h2 className={s.title}>Создать аккаунт</h2>
            <p className={s.subtitle}>Заполните данные для регистрации</p>

            <div className={s.formGroup}>
                <label className={s.label}>Имя</label>
                <input className={s.input} type="text" placeholder="Ваше имя" />
            </div>

            <div className={s.toggleTabs}>
                <button
                    className={`${s.toggleTab} ${isEmailActive ? s.toggleActive : ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setAuthMethod("email");
                    }}
                >
                    <FaRegEnvelope /> Email
                </button>
                <button
                    className={`${s.toggleTab} ${!isEmailActive ? s.toggleActive : ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setAuthMethod("phone");
                    }}
                >
                    <FaPhoneAlt /> Телефон
                </button>
            </div>

            <div className={s.formGroup} style={{ marginTop: "0" }}>
                <label className={s.label}>{isEmailActive ? "Email" : "Телефон"}</label>
                <input
                    className={s.input}
                    type={isEmailActive ? "email" : "tel"}
                    placeholder={isEmailActive ? "example@email.com" : "+993 (XX) XX-XX-XX"}
                />
            </div>

            <button className={s.submitButton} onClick={handleCodeRequest} type="submit">
                Получить код
            </button>
        </form>
    );
};
