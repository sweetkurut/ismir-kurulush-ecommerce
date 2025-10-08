import { FiArrowRight } from "react-icons/fi";
import s from "./style.module.scss";

export const Consultation = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.content}>
                    <h2>Нужна консультация?</h2>
                    <p>Наши специалисты помогут подобрать материалы для вашего проекта</p>
                    <button>
                        Оставить заявку <FiArrowRight className={s.icon} />
                    </button>
                </div>
            </div>
        </div>
    );
};
