import s from "./style.module.scss";

export const SkeletonProfileContent = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.tabContent}>
                <h2 className={s.skeletonTitle} />
                <div className={s.formGroup}>
                    <div
                        className={s.skeletonLine}
                        style={{ width: "50%", height: "20px", marginBottom: 8 }}
                    />
                    <div className={s.skeletonInput} />
                </div>
                <div className={s.formGroup}>
                    <div
                        className={s.skeletonLine}
                        style={{ width: "50%", height: "20px", marginBottom: 8 }}
                    />
                    <div className={s.skeletonInput} />
                </div>
                <div className={s.formGroup}>
                    <div className={s.skeletonButton} />
                </div>
            </div>
        </div>
    );
};
