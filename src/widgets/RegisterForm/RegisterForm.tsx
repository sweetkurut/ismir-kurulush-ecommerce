import React, { useState } from "react";
import s from "./style.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { fetchSetPassword, fetchSignUp, fetchVerifyCode } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const nav = useNavigate();
    const [step, setStep] = useState<"initial" | "verify" | "password">("initial");
    const [authMethod] = useState("email");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        verification_code: "",
        password: "",
        password_confirm: "",
    });

    const isEmailActive = authMethod === "email";

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email) return;

        try {
            await dispatch(fetchSignUp({ email: formData.email })).unwrap();
            setStep("verify");
            // nav("/login");
        } catch (error) {
            console.error(error);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.verification_code) return;

        try {
            await dispatch(
                fetchVerifyCode({
                    email: formData.email,
                    verification_code: formData.verification_code,
                })
            ).unwrap();
            setStep("password");
        } catch (error) {
            console.error(error);
        }
    };

    const handleSetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.password || formData.password !== formData.password_confirm) return;

        try {
            await dispatch(
                fetchSetPassword({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    password_confirm: formData.password_confirm,
                })
            ).unwrap();
            nav("/login");
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCodeInput = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(0, 1);

        const newCode = formData.verification_code.split("");
        newCode[index] = value;
        const verification_code = newCode.join("");

        setFormData((prev) => ({ ...prev, verification_code }));

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-input-${index + 1}`);
            nextInput?.focus();
        }
    };

    if (step === "password") {
        return (
            <div className={s.formCard}>
                <button className={s.backButton} onClick={() => setStep("verify")}>
                    <FaArrowLeft /> Назад
                </button>

                <h2 className={s.title}>Создать аккаунт</h2>
                <p className={s.subtitle}>Заполните данные для завершения регистрации</p>

                {error && <div className={s.error}>{error}</div>}

                <form onSubmit={handleSetPassword}>
                    <div className={s.formGroup}>
                        <label className={s.label}>Имя</label>
                        <input
                            className={s.input}
                            type="text"
                            placeholder="Ваше имя"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                        />
                    </div>

                    <div className={s.formGroup}>
                        <label className={s.label}>Пароль</label>
                        <input
                            className={s.input}
                            type="password"
                            placeholder="Придумайте пароль"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            required
                        />
                    </div>

                    <div className={s.formGroup}>
                        <label className={s.label}>Подтвердите пароль</label>
                        <input
                            className={s.input}
                            type="password"
                            placeholder="Повторите пароль"
                            value={formData.password_confirm}
                            onChange={(e) => handleInputChange("password_confirm", e.target.value)}
                            required
                        />
                    </div>

                    {formData.password &&
                        formData.password_confirm &&
                        formData.password !== formData.password_confirm && (
                            <div className={s.error}>Пароли не совпадают</div>
                        )}

                    <button
                        className={s.submitButton}
                        type="submit"
                        disabled={loading || formData.password !== formData.password_confirm}
                    >
                        {loading ? "Регистрация..." : "Зарегистрироваться"}
                    </button>
                </form>
            </div>
        );
    }

    if (step === "verify") {
        return (
            <div className={s.formCard}>
                <button className={s.backButton} onClick={() => setStep("initial")}>
                    <FaArrowLeft /> Назад
                </button>

                <h2 className={s.title}>Создать аккаунт</h2>
                <p className={s.subtitle}>Заполните данные для регистрации</p>

                <p className={s.codeHeader}>Введите код подтверждения</p>
                <p className={s.codeHint}>Код отправлен на {formData.email}</p>

                {error && <div className={s.error}>{error}</div>}

                <form onSubmit={handleVerifyCode}>
                    <div className={s.codeInputs}>
                        {[...Array(4)].map((_, index) => (
                            <input
                                key={index}
                                id={`code-input-${index}`}
                                className={s.codeInput}
                                type="text"
                                maxLength={1}
                                inputMode="numeric"
                                value={formData.verification_code[index] || ""}
                                onChange={(e) => handleCodeInput(index, e.target.value)}
                                autoFocus={index === 0}
                                required
                            />
                        ))}
                    </div>

                    <button
                        className={s.submitButton}
                        type="submit"
                        disabled={loading || formData.verification_code.length !== 4}
                    >
                        {loading ? "Проверка..." : "Подтвердить"}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <form className={s.formCard} onSubmit={handleSignUp}>
            <h2 className={s.title}>Создать аккаунт</h2>
            <p className={s.subtitle}>Заполните данные для регистрации</p>

            {error && <div className={s.error}>{error}</div>}

            {/* <div className={s.formGroup}>
                <label className={s.label}>Имя</label>
                <input
                    className={s.input}
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                />
            </div> */}

            {/* <div className={s.toggleTabs}>
                <button
                    type="button"
                    className={`${s.toggleTab} ${isEmailActive ? s.toggleActive : ""}`}
                    onClick={() => setAuthMethod("email")}
                >
                    <FaRegEnvelope /> Email
                </button>
                <button
                    type="button"
                    className={`${s.toggleTab} ${!isEmailActive ? s.toggleActive : ""}`}
                    onClick={() => setAuthMethod("phone")}
                >
                    <FaPhoneAlt /> Телефон
                </button>
            </div> */}

            <div className={s.formGroup} style={{ marginTop: "0" }}>
                <label className={s.label}>{isEmailActive ? "Email" : "Телефон"}</label>
                <input
                    className={s.input}
                    type={isEmailActive ? "email" : "tel"}
                    placeholder={isEmailActive ? "example@email.com" : "+996 (XXX) XX-XX-XX"}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                />
            </div>

            <button className={s.submitButton} type="submit" disabled={loading}>
                {loading ? "Отправка..." : "Получить код"}
            </button>
        </form>
    );
};
