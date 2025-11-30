// BasketPage.tsx
import { useEffect, memo } from "react";
import { fetchGetCart } from "@/store/slices/cartSlice";
import { BasketItemCard } from "@/widgets/BasketItemCard/BasketItemCard";
import s from "./style.module.scss";
import { GiCheckMark } from "react-icons/gi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SkeletonBasketItem } from "@/components/SkeletonBasketItem/SkeletonBasketItem";

// Маленькие компоненты-состояния (чтобы не рендерилось всё заново)
const BasketLoadingState = memo(() => (
    <div className={s.wrapper}>
        <div className={s.container}>
            <h1 className={s.title}>Корзина</h1>
            <div className={s.skeletonList}>
                {[...Array(4)].map((_, i) => (
                    <SkeletonBasketItem key={i} />
                ))}
            </div>
        </div>
    </div>
));

const BasketErrorState = memo(({ error, onRetry }: { error: string; onRetry: () => void }) => (
    <div className={s.wrapper}>
        <div className={s.container}>
            <h1 className={s.title}>Ошибка загрузки корзины</h1>
            <p style={{ color: "red" }}>{error}</p>
            <button onClick={onRetry} className={s.retryButton}>
                Повторить
            </button>
        </div>
    </div>
));

const BasketEmptyState = memo(() => (
    <div className={s.auth}>
        <div className={s.auth_container}>
            <div className={s.unauthorized}>
                <div className={s.unauthorizedContent}>
                    {/* <div className={s.icon_wrap}>
                                <FaRegUser className={s.icon_auth} />
                            </div> */}
                    <div>
                        <h3 className={s.unauthorizedTitle}>Корзина пуста</h3>
                    </div>

                    <div className={s.loginButton_wrap}>
                        <NavLink to={"/catalog"} className={s.loginButton}>
                            Перейти в каталог
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
));

export const BasketPage = memo(() => {
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const { cart, loading, addLoading, error } = useAppSelector((state) => state.cart);
    const subtotal = Number(cart?.total_amount);
    const delivery = 200;
    const total = subtotal + delivery;
    const itemsCount = cart?.items.length;

    const goToOrder = () => {
        nav("/feedback", { state: { cartId: cart?.id } });
    };

    useEffect(() => {
        if (!cart && !loading && !error) {
            dispatch(fetchGetCart());
        }
    }, [dispatch, cart, loading, error]);

    if (loading) {
        return <BasketLoadingState />;
    }

    if (error) {
        return <BasketErrorState error={error} onRetry={() => dispatch(fetchGetCart())} />;
    }

    if (!cart || cart.items.length === 0) {
        return <BasketEmptyState />;
    }

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <h1 className={s.title}>Корзина ({itemsCount})</h1>

                <div className={s.basketLayout}>
                    <div className={s.itemsList}>
                        {cart.items.map((cartItem) => (
                            <BasketItemCard
                                key={cartItem.id}
                                cartItem={cartItem}
                                // isUpdating={addLoading}
                            />
                        ))}
                    </div>

                    <div className={s.summaryBlock}>
                        <div className={s.summaryTitle}>Итого</div>

                        <div className={s.totalTable}>
                            <div className={s.totalRow}>
                                <span>Товары ({itemsCount})</span>
                                <span className={s.sum_col}>{subtotal.toLocaleString()} сом</span>
                            </div>
                            <div className={s.totalRow}>
                                <span>Доставка</span>
                                <span className={s.sum_col}>{delivery} сом</span>
                            </div>
                        </div>

                        <div className={s.totalOverall}>
                            <span className={s.vsego}>Всего</span>
                            <span className={s.sum}>{total.toLocaleString()} сом</span>
                        </div>

                        <Link
                            to="/feedback"
                            state={{ cartId: cart.id }}
                            className={`${s.actionButton} ${s.checkoutButton}`}
                            // onClick={goToOrder}
                        >
                            Оформить заказ
                        </Link>

                        <Link to="/catalog" className={`${s.actionButton} ${s.continueButton}`}>
                            Продолжить покупки
                        </Link>

                        <div className={s.summaryFeatures}>
                            <div className={s.featureItem}>
                                <GiCheckMark /> Гарантия качества
                            </div>
                            <div className={s.featureItem}>
                                <GiCheckMark /> Оплата при получении
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

BasketPage.displayName = "BasketPage";
