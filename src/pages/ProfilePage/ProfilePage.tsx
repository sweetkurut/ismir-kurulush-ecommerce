import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { fetchGetProfile, clearProfileError, fetchDeleteProfile } from "@/store/slices/profileSlice";
import { FaExclamationTriangle, FaRegUser, FaTrashAlt } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import s from "./style.module.scss";
import { ProfileContent } from "./components/ProfileContent/ProfileContent";
import { OrdersContent } from "./components/OrdersContent/OrdersContent";
import { FavoritesContent } from "./components/Favorites/FavoritesContent";
import { ApplicationsContent } from "./components/ApplicationsContent/ApplicationsContent";
import { Modal } from "@/components/Modal/Modal";
import { fetchGetOrdersReq } from "@/store/slices/orderRequestSlice";
import type { IOrderRequest } from "@/store/types";
import { Loader } from "@/components/Loader/Loader";
import { SkeletonProfile } from "@/components/SkeletonProfile/SkeletonProfile";


export const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

    const { profile, loading, error } = useAppSelector((state) => state.profile);
    const { login, isAuthenticated } = useAppSelector((state) => state.auth);

     const {orders_req} = useAppSelector((state) => state.orderRequest)

     const renderTabContent = (activeTab: string, orders_req: IOrderRequest[] | null) => {
    switch (activeTab) {
        case "profile":
            return <ProfileContent />;
        case "orders":
            return <OrdersContent />;
        case "favorites":
            return <FavoritesContent />;
        case "applications":
            return <ApplicationsContent orders_req={orders_req}  />;
        default:
            return <ProfileContent />;
    }
};


     
         useEffect(() => {
             dispatch(fetchGetOrdersReq())
         },[])

    useEffect(() => {
        dispatch(clearProfileError());

        if (isAuthenticated && login?.access) {
            dispatch(fetchGetProfile());
        }
    }, [dispatch, isAuthenticated, login]);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogoutConfirm = async () => {
        setLogoutLoading(true);
        try {
            dispatch(logout());
            navigate("/");
        } catch (error) {
            console.error("Ошибка при выходе:", error);
            setLogoutLoading(false);
        }
    };

    const handleRetry = () => {
        dispatch(clearProfileError());
        dispatch(fetchGetProfile());
    };

    const handleDeleteAccount = async () => {
        setDeleteLoading(true);
        try {
            await dispatch(fetchDeleteProfile()).unwrap();
            dispatch(logout());
            navigate("/");
        } catch (error) {
            console.error("Ошибка при удалении аккаунта:", error);
            setDeleteLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={s.auth}>
                <div className={s.auth_container}>
                    <div className={s.unauthorized}>
                        <div className={s.unauthorizedContent}>
                            <div>
                                <h3 className={s.unauthorizedTitle}>Требуется авторизация</h3>
                            </div>
                            <div>
                                <p className={s.unauthorizedText}>
                                    Для просмотра этой страницы необходимо войти в свой аккаунт
                                </p>
                            </div>
                            <div className={s.loginButton_wrap}>
                                <button className={s.loginButton} onClick={handleLogin}>
                                    Войти в аккаунт
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // if (loading && !profile) {
    //     return (
    //         <div className={s.wrapper}>
    //             <div className={s.container}>
    //                 <div className={s.loading}>
    //                     <SkeletonProfile />
    //                     {/* <h2>загрузка</h2> */}
                        
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    if (loading && !profile) {
    return <SkeletonProfile />;
}

    if (error && !profile) {
        return (
            <div className={s.wrapper}>
                <div className={s.container}>
                    <div className={s.errorState}>
                        <div className={s.errorContent}>
                            <h3 className={s.errorTitle}>Ошибка при загрузке профиля</h3>
                            <p className={s.errorText}>{error}</p>
                            <div className={s.errorActions}>
                                <button className={s.retryButton} onClick={handleRetry}>
                                    Попробовать снова
                                </button>
                                <button className={s.logoutButton} onClick={() => setShowLogoutModal(true)}>
                                    Выйти
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.content}>
                    {/* Боковая панель профиля */}
                    <div className={s.profileSection}>
                        <div className={s.profile}>
                            <div className={s.profileHeader}>
                                <div className={s.avatar}>
                                    <div className={s.icon_wrap}>
                                        {profile?.avatar ? (
                                            <img
                                                src={profile.avatar}
                                                alt="Avatar"
                                                className={s.avatarImage}
                                            />
                                        ) : (
                                            <FaRegUser className={s.icon_profileHeader} />
                                        )}
                                    </div>
                                </div>
                                <div className={s.userInfo}>
                                    <h4 className={s.userName}>{profile?.name || "Пользователь"}</h4>
                                    <p className={s.userEmail}>{profile?.email || login?.email}</p>
                                    {profile?.is_company && <span className={s.companyBadge}>Компания</span>}
                                </div>
                            </div>

                            {/* Навигация */}
                            <div className={s.profile_navs}>
                                <div
                                    className={`${s.profile_nav} ${activeTab === "profile" ? s.active : ""}`}
                                    onClick={() => setActiveTab("profile")}
                                >
                                    <FaRegUser />
                                    <span className={s.nav_link}>Профиль</span>
                                </div>
                                <div
                                    className={`${s.profile_nav} ${activeTab === "orders" ? s.active : ""}`}
                                    onClick={() => setActiveTab("orders")}
                                >
                                    <BsBox />
                                    <span className={s.nav_link}>Заказы</span>
                                </div>
                                <div
                                    className={`${s.profile_nav} ${
                                        activeTab === "favorites" ? s.active : ""
                                    }`}
                                    onClick={() => setActiveTab("favorites")}
                                >
                                    <FaRegHeart />
                                    <span className={s.nav_link}>Избранное</span>
                                </div>
                                <div
                                    className={`${s.profile_nav} ${
                                        activeTab === "applications" ? s.active : ""
                                    }`}
                                    onClick={() => setActiveTab("applications")}
                                >
                                    <GrDocumentText />
                                    <span className={s.nav_link}>Заявки</span>
                                </div>

                                <div className={`${s.profile_nav} ${s.deleteNav}`}>
                                    <FaTrashAlt className={s.deleteIcon} />
                                    <button
                                        className={s.deleteAccountBtn}
                                        onClick={() => setShowDeleteModal(true)}
                                    >
                                        Удалить аккаунт
                                    </button>
                                </div>
                            </div>

                            {/* Кнопка выхода */}
                            <div className={s.profile_btn}>
                                <button className={s.logoutBtn} onClick={() => setShowLogoutModal(true)}>
                                    Выйти
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Основной контент */}
                    <div className={s.mainContent}>
                        <div className={s.tabs}>
                            <div
                                className={`${s.tab} ${activeTab === "profile" ? s.active : ""}`}
                                onClick={() => setActiveTab("profile")}
                            >
                                Профиль
                            </div>
                            <div
                                className={`${s.tab} ${activeTab === "orders" ? s.active : ""}`}
                                onClick={() => setActiveTab("orders")}
                            >
                                Заказы
                            </div>
                            <div
                                className={`${s.tab} ${activeTab === "favorites" ? s.active : ""}`}
                                onClick={() => setActiveTab("favorites")}
                            >
                                Избранное
                            </div>
                            <div
                                className={`${s.tab} ${activeTab === "applications" ? s.active : ""}`}
                                onClick={() => setActiveTab("applications")}
                            >
                                Заявки
                            </div>
                        </div>

                        <div className={s.tabContent}>
                            {error && (
                                <div className={s.contentError}>
                                    <span>{error}</span>
                                    <button onClick={handleRetry}>Обновить</button>
                                </div>
                            )}
                            {renderTabContent(activeTab, orders_req)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальное окно подтверждения выхода */}
            <Modal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                title="Выход из аккаунта"
                size="sm"
            >
                <div className={s.logoutModalContent}>
                    <div className={s.logoutText}>
                        <p>Вы уверены, что хотите выйти из аккаунта?</p>
                    </div>

                    <div className={s.modalActions}>
                        <button
                            className={s.confirmLogoutBtn}
                            onClick={handleLogoutConfirm}
                            disabled={logoutLoading}
                        >
                            {logoutLoading ? (
                                <>
                                    <div className={s.spinnerSmall}></div>
                                    Выход...
                                </>
                            ) : (
                                "Да, выйти"
                            )}
                        </button>
                        <button
                            className={s.cancelLogoutBtn}
                            onClick={() => setShowLogoutModal(false)}
                            disabled={logoutLoading}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Модальное окно подтверждения удаления */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Удаление аккаунта"
                size="md"
            >
                <div className={s.deleteModalContent}>
                    <div className={s.warningIcon}>
                        <FaExclamationTriangle />
                    </div>

                    <div className={s.warningText}>
                        <h4>Внимание! Это действие необратимо</h4>
                        <p>Вы собираетесь удалить свой аккаунт. После подтверждения:</p>
                        <ul className={s.warningList}>
                            <li>Все ваши личные данные будут удалены</li>
                            <li>История заказов будет утеряна</li>
                            <li>Список избранного будет очищен</li>
                            <li>Восстановление аккаунта будет невозможно</li>
                        </ul>
                    </div>

                    <div className={s.modalActions}>
                        <button
                            className={s.confirmDeleteBtn}
                            onClick={handleDeleteAccount}
                            disabled={deleteLoading}
                        >
                            {deleteLoading ? (
                                <>
                                    <div className={s.spinnerSmall}></div>
                                    Удаление...
                                </>
                            ) : (
                                "Да, удалить аккаунт"
                            )}
                        </button>
                        <button
                            className={s.cancelDeleteBtn}
                            onClick={() => setShowDeleteModal(false)}
                            disabled={deleteLoading}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
