import { FeedbackForm } from "@/widgets/FormGroup/FormGroup";
import s from "./style.module.scss";
import icon from "@/shared/assets/icons/messageicon.svg";

export const FeedBackPage = () => {
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
                <FeedbackForm />
            </div>
        </div>
    );
};

export default FeedBackPage;
