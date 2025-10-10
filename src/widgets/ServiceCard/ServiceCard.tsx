import { FiArrowRight } from "react-icons/fi";
import s from "./style.module.scss";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
    onClick?: () => void;
}

export const ServiceCard = ({ icon, title, description, onClick }: ServiceCardProps) => {
    const nav = useNavigate();

    const handleNav = () => {
        nav("/service/1");
    };

    return (
        <div className={s.card} onClick={handleNav}>
            <div className={s.icon_wrap}>
                <img src={icon} alt={title} />
            </div>
            <h3 className={s.title}>{title}</h3>
            <p className={s.desc}>{description}</p>
            <button className={s.btn}>
                Подробнее
                <FiArrowRight className={s.arrow} />
            </button>
        </div>
    );
};
