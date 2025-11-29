import { FeedbackForm } from "@/widgets/FeedbackForm/FeedbackForm";
import s from "./style.module.scss";
import icon from "@/shared/assets/icons/messageicon.svg";
import { useLocation } from "react-router-dom";

export const FeedBackPage = () => {
    const location = useLocation();
    const cartId = location.state?.cartId ?? null;

    return (
        <div className={s.main_wrapper}>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <div className={s.icon_wrap}>
                        <img src={icon} alt="icon service" />
                    </div>

                    <h2 className={s.title}>Оставить заявку</h2>
                    <p className={s.sub_title}>
                        Заполните форму, и наш менеджер свяжется с вами в ближайшее время
                    </p>
                </div>
            </div>
            <div className={s.content}>
                <FeedbackForm cartId={cartId} />
            </div>
        </div>
    );
};

export default FeedBackPage;
