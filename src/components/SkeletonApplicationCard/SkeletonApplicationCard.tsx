import s from "./SkeletonApplicationCard.module.scss";

export const SkeletonApplicationCard = () => {
    return (
        <div className={s.skeletonCard}>
            <div className={s.details}>
                <div className={s.skeletonLine} style={{ width: "30%", height: "20px", marginBottom: 8 }} />
                <div className={s.skeletonLine} style={{ width: "50%", height: "16px", marginBottom: 4 }} />
                <div className={s.skeletonLine} style={{ width: "80%", height: "16px", marginBottom: 4 }} />
                <div className={s.skeletonLine} style={{ width: "60%", height: "16px", marginBottom: 4 }} />
                <div className={s.skeletonLine} style={{ width: "40%", height: "16px", marginBottom: 4 }} />
            </div>
            <div className={s.statusTag}>
                <div className={s.skeletonStatus} />
            </div>
        </div>
    );
};
