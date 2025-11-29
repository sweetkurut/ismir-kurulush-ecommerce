import s from "./style.module.scss";

export const SkeletonSummary = () => {
    return (
        <div className={s.skeletonSummary}>
            <div className={s.title} />

            <div className={s.table}>
                <div className={s.row}>
                    <div className={s.text} />
                    <div className={s.price} />
                </div>
                <div className={s.row}>
                    <div className={s.text} />
                    <div className={s.price} />
                </div>
            </div>

            <div className={s.totalBlock}>
                <div className={s.totalText} />
                <div className={s.totalPrice} />
            </div>

            <div className={s.button} />
            <div className={s.button} />

            <div className={s.features}>
                <div className={s.feature} />
                <div className={s.feature} />
            </div>
        </div>
    );
};
