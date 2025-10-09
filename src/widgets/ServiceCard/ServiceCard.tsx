import s from "./style.module.scss";
import arrowRight from "@/shared/assets/icons/arrow-right.svg";

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
    onClick?: () => void;
}

export const ServiceCard = ({ icon, title, description, onClick }: ServiceCardProps) => {
    return (
        <div className={s.card} onClick={onClick}>
            <div className={s.icon_wrap}>
                <img src={icon} alt={title} />
            </div>
            <h3 className={s.title}>{title}</h3>
            <p className={s.desc}>{description}</p>
            <button className={s.btn}>
                Подробнее
                {/* <img src={arrowRight} alt="arrow" /> */}
            </button>
        </div>
    );
};
