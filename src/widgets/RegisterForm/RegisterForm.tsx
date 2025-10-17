import React, { useState } from "react";
import s from "./style.module.scss";
import { FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";

export const RegisterForm = () => {
    // 0 = Ввод данных (Шаг 1), 1 = Ввод кода (Шаг 2)
    const [step, setStep] = useState(0);
    const [authMethod, setAuthMethod] = useState("email");

    const isEmailActive = authMethod === "email";

    // Обработчик для перехода на Шаг 2
    const handleCodeRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Здесь должна быть логика отправки данных на сервер и получение кода
        setStep(1);
    };

    // --- Шаг 2: Ввод кода подтверждения ---
    if (step === 1) {
        return (
            <div className={s.formCard}>
                <h2 className={s.title}>Создать аккаунт</h2>
                <p className={s.subtitle}>Заполните данные для регистрации</p>

                {/* Заголовки из макета image_ec14c4.png */}
                <p className={s.codeHeader}>Введите код подтверждения</p>
                <p className={s.codeHint}>Код отправлен на example@email.com</p>

                {/* Поля для кода */}
                <div className={s.codeInputs}>
                    {[...Array(6)].map((_, index) => (
                        <input
                            key={index}
                            className={s.codeInput}
                            type="text"
                            maxLength={1}
                            // Для удобства пользователя
                            inputMode="numeric"
                            autoFocus={index === 0}
                        />
                    ))}
                </div>

                <button className={s.submitButton}>Подтвердить</button>

                {/* Здесь можно добавить кнопку "Отправить код повторно" */}
            </div>
        );
    }

    // --- Шаг 1: Ввод данных (По умолчанию) ---
    return (
        <form className={s.formCard}>
            <h2 className={s.title}>Создать аккаунт</h2>
            <p className={s.subtitle}>Заполните данные для регистрации</p>

            <div className={s.formGroup}>
                <label className={s.label}>Имя</label>
                <input className={s.input} type="text" placeholder="Ваше имя" />
            </div>

            {/* Переключение Email/Телефон */}
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

            {/* Кнопка "Получить код" - переходит на Шаг 2 */}
            <button className={s.submitButton} onClick={handleCodeRequest} type="submit">
                Получить код
            </button>
        </form>
    );
};
