import s from "./style.module.scss";

export const SkeletonProfileContent = () => {
    return (
        <div className={s.wrapper}>
            <div className={`${s.tabContent} ${s.skeleton}`}>
                <div className={s.skeletonTitle}></div>
                <div className={s.skeletonGroup}>
                    <div className={s.skeletonLabel}></div>
                    <div className={s.skeletonInput}></div>
                </div>
                <div className={s.skeletonGroup}>
                    <div className={s.skeletonLabel}></div>
                    <div className={s.skeletonInput}></div>
                </div>
                <div className={s.skeletonGroup}>
                    <div className={s.skeletonLabel}></div>
                    <div className={s.skeletonInput}></div>
                </div>
                <div className={s.skeletonButton}></div>
            </div>
        </div>
    );
};
