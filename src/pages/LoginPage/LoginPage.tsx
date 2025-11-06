import { LoginForm } from "@/widgets/LoginForm/LoginForm";
import s from "./style.module.scss";
import { RegisterForm } from "@/widgets/RegisterForm/RegisterForm";

type LoginPageProps = {
    activeTab: string;
    onTabChange: (tab: string) => void;
};

export const LoginPage = ({ activeTab, onTabChange }: LoginPageProps) => {
    const isLogin = activeTab === "login";

    return (
        <div className={s.authPageWrapper}>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <h2 className={s.title}>Вход и регистрация</h2>
                    <p className={s.sub_title}>
                        чтобы использовать все возможности личного кабинета: <br /> отслеживание заказов,
                        статус текущего заказа, к покупкам и другие
                    </p>
                </div>
            </div>
            <div className={s.container}>
                <div className={s.authCard}>
                    <div className={s.tabs}>
                        <div
                            className={`${s.tab} ${isLogin ? s.active : ""}`}
                            onClick={() => onTabChange("login")}
                        >
                            Вход
                        </div>
                        <div
                            className={`${s.tab} ${!isLogin ? s.active : ""}`}
                            onClick={() => onTabChange("register")}
                        >
                            Регистрация
                        </div>
                    </div>

                    <div className={s.formContent}>{isLogin ? <LoginForm /> : <RegisterForm />}</div>
                </div>
            </div>
        </div>
    );
};
