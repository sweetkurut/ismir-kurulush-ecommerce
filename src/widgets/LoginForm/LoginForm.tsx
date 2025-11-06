import { useState } from "react";
import s from "./style.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchForgotPassword, fetchLogin } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const nav = useNavigate();
    const [authMethod, setAuthMethod] = useState("email");
    const [step, setStep] = useState<"login" | "forgot">("login");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        code: "",
    });

    const isEmailActive = authMethod === "email";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.password) return;

        try {
            await dispatch(
                fetchLogin({
                    email: formData.email,
                    password: formData.password,
                })
            ).unwrap();
            nav("/profile");
        } catch (error) {
            console.error(error);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email) return;

        try {
            await dispatch(fetchForgotPassword({ email: formData.email })).unwrap();
            setStep("forgot");
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    if (step === "forgot") {
        return (
            <div className={s.form}>
                <button className={s.backButton} onClick={() => setStep("login")}>
                    <FaArrowLeft /> Назад
                </button>

                <h2 className={s.title}>Восстановление пароля</h2>
                <p className={s.desc}>
                    Введите email, указанный при регистрации. Мы отправим код для восстановления пароля.
                </p>

                {error && <div className={s.error}>{error}</div>}

                <form onSubmit={handleForgotPassword}>
                    <div className={s.formGroup}>
                        <label className={s.label}>Email</label>
                        <input
                            className={s.input}
                            type="email"
                            placeholder="example@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                        />
                    </div>

                    <button className={s.submitButton} type="submit" disabled={loading}>
                        {loading ? "Отправка..." : "Отправить код"}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <form className={s.form} onSubmit={handleLogin}>
            <h2 className={s.title}>Войти в аккаунт</h2>
            <p className={s.desc}>Введите email или номер телефона для входа</p>

            {error && <div className={s.error}>{error}</div>}

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

            <div className={s.formGroup}>
                <label className={s.label}>Пароль</label>
                <input
                    className={s.input}
                    type="password"
                    placeholder="Введите пароль"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                />
            </div>

            <button className={s.forgotPassword} type="button" onClick={() => setStep("forgot")}>
                Забыли пароль?
            </button>

            <button className={s.submitButton} type="submit" disabled={loading}>
                {loading ? "Вход..." : "Войти"}
            </button>
        </form>
    );
};
