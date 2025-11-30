import s from "./style.module.scss";

export const SkeletonProfile = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.content}>
                    <div className={s.profileSection}>
                        <div className={s.profile}>
                            <div className={s.profileHeader}>
                                <div className={s.avatar}>
                                    <div className={s.skeletonCircle}></div>
                                </div>

                                <div className={s.userInfo}>
                                    <div className={s.skeletonLineShort}></div>
                                    <div className={s.skeletonLine}></div>
                                    <div className={s.skeletonBadge}></div>
                                </div>
                            </div>

                            <div className={s.profile_navs}>
                                <div className={s.skeletonNav}></div>
                                <div className={s.skeletonNav}></div>
                                <div className={s.skeletonNav}></div>
                                <div className={s.skeletonNav}></div>
                                <div className={s.skeletonNav}></div>
                            </div>

                            <div className={s.profile_btn}>
                                <div className={s.skeletonButton}></div>
                            </div>
                        </div>
                    </div>

                    <div className={s.mainContent}>
                        <div className={s.tabs}>
                            <div className={s.skeletonTab}></div>
                            <div className={s.skeletonTab}></div>
                            <div className={s.skeletonTab}></div>
                            <div className={s.skeletonTab}></div>
                        </div>

                        <div className={s.tabContent}>
                            <div className={s.skeletonBlockLarge}></div>
                            <div className={s.skeletonBlock}></div>
                            <div className={s.skeletonBlock}></div>
                            <div className={s.skeletonBlock}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
