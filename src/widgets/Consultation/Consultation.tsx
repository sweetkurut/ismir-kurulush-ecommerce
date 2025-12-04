import { FiArrowRight } from "react-icons/fi";
import s from "./style.module.scss";
import { useNavigate } from "react-router-dom";

export const Consultation = () => {
    const nav = useNavigate();

    const handelNav = () => {
        nav("/feedback");
    };

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.content}>
                    <h2>Нужна консультация?</h2>
                    <p>Наши специалисты помогут подобрать материалы для вашего проекта</p>
                    <button onClick={handelNav}>
                        Оставить заявку <FiArrowRight className={s.icon} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Consultation;
