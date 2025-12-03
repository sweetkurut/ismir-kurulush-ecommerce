import { FiArrowRight } from "react-icons/fi";
import s from "./style.module.scss";
import { useNavigate } from "react-router-dom";
// import icon1 from "@/shared/assets/icons/service1.svg";

interface ServiceCardProps {
    id: number;
    name: string;
    icon: string;
    description: string;
}

export const ServiceCard = ({ id, icon, name, description }: ServiceCardProps) => {
    const nav = useNavigate();

    const handleNav = () => {
        nav(`/service/${id}`);
    };

    return (
        <div className={s.card} onClick={handleNav}>
            <div className={s.icon_wrap}>
                <img src={icon} alt={"услуги"} />
            </div>
            <h3 className={s.title}>{name}</h3>
            <p className={s.desc}>{description}</p>
            <button className={s.btn}>
                Подробнее
                <FiArrowRight className={s.arrow} />
            </button>
        </div>
    );
};
