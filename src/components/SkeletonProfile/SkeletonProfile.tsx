import s from "./style.module.scss";

export const SkeletonProfile = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.content}>

                    {/* Левая панель */}
                    <div className={s.profileSection}>
                        <div className={s.profile}>

                            {/* Аватар + имя */}
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

                            {/* Навигация */}
                            <div className={s.profile_navs}>
                                <div className={s.skeletonNav}></div>
                                <div className={s.skeletonNav}></div>
                                <div className={s.skeletonNav}></div>
                                <div className={s.skeletonNav}></div>
                                <div className={s.skeletonNav}></div>
                            </div>

                            {/* Logout button */}
                            <div className={s.profile_btn}>
                                <div className={s.skeletonButton}></div>
                            </div>
                        </div>
                    </div>

                    {/* Правая часть */}
                    <div className={s.mainContent}>
                        {/* Tabs */}
                        <div className={s.tabs}>
                            <div className={s.skeletonTab}></div>
                            <div className={s.skeletonTab}></div>
                            <div className={s.skeletonTab}></div>
                            <div className={s.skeletonTab}></div>
                        </div>

                        {/* Content blocks (имитация профиля) */}
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
