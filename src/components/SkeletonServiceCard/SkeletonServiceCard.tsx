import s from "./style.module.scss";

export const SkeletonServiceCard = () => {
    return (
        <div className={s.card}>
            <div className={s.icon} />
            <div className={s.title} />
            <div className={s.line} />
            <div className={s.line} />
            <div className={s.btn} />
        </div>
    );
};
