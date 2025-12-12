import { useEffect, memo, useState } from "react";
import { fetchGetCart } from "@/store/slices/cartSlice";
import { BasketItemCard } from "@/widgets/BasketItemCard/BasketItemCard";
import s from "./style.module.scss";
import { GiCheckMark } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SkeletonBasketItem } from "@/components/SkeletonBasketItem/SkeletonBasketItem";
import { Pagination } from "@/shared/ui/Pagination/Pagination";

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

const ITEMS_PER_PAGE = 10;

export const BasketPage = memo(() => {
    const dispatch = useAppDispatch();
    const { cart, loading, error } = useAppSelector((state) => state.cart);
    const subtotal = Number(cart?.total_amount);
    const delivery = 200;
    const total = subtotal + delivery;
    const itemsCount = cart?.items.length;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil((cart?.items.length || 0) / ITEMS_PER_PAGE);
    const currentCart = cart?.items?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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

    const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <h1 className={s.title}>Корзина ({itemsCount})</h1>

                    <div className={s.basketLayout}>
                        <div className={s.itemsList}>
                            {currentCart?.map((cartItem) => (
                                <BasketItemCard key={cartItem.id} cartItem={cartItem} />
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
            {totalPages > 0 && (
                <div className={s.pagination}>
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                </div>
            )}
        </>
    );
});

BasketPage.displayName = "BasketPage";

export default BasketPage;
