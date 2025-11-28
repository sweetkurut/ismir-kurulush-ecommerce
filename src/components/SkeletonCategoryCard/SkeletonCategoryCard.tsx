import s from "./style.module.scss";

export const SkeletonCategoryCard = () => {
    return (
        <div className={s.card}>
            <div className={s.card_img_wrap} />
            <div className={s.card_title} />
        </div>
    );
};
