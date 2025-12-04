/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import s from "./style.module.scss";
import { TiArrowLeft } from "react-icons/ti";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Card } from "@/widgets/Cards/Cards";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetDetailProducts } from "@/store/slices/productsSlice";
import { fetchAddFavorites } from "@/store/slices/favoritesSlice";
import { fetchAddToCart, updateCartItem } from "@/store/slices/cartSlice";
import { SkeletonDetail } from "@/components/SkeletonDetail/SkeletonDetail";
import { SkeletonSimilarCard } from "@/components/SkeletonSimilarCard/SkeletonSimilarCard";
import { renderStars } from "@/utils/renderStars";

export const DetailCatalogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { loading, product } = useAppSelector((state) => state.products);
    const { cart, addLoading } = useAppSelector((state) => state.cart);
    const favorites = useAppSelector((state) => state.favorites.favorites?.results || []);

    const cartItem = cart?.items.find((item) => item.product.id === product?.id);
    const quantityInCart = cartItem?.quantity || 0;

    const isFavorite = product
        ? favorites.some((item: any) => item.product?.id === product.id || item.id === product.id)
        : false;

    useEffect(() => {
        if (id) dispatch(fetchGetDetailProducts(Number(id)));
    }, [id, dispatch]);

    const handleBack = () => navigate("/catalog");

    const handleIncrease = async () => {
        if (!product) return;

        if (quantityInCart === 0) {
            await dispatch(fetchAddToCart({ product: product.id, quantity: 1 }));
        } else {
            await dispatch(updateCartItem({ item_id: cartItem!.id, quantity: quantityInCart + 1 }));
        }
    };

    const handleDecrease = async () => {
        if (!product || quantityInCart <= 1) return;

        await dispatch(updateCartItem({ item_id: cartItem!.id, quantity: quantityInCart - 1 }));
    };

    const handleAddToCart = async () => {
        if (!product || quantityInCart > 0) return;
        await dispatch(fetchAddToCart({ product: product.id, quantity: 1 }));
    };

    const handleToggleFavorite = async () => {
        if (!product) return;
        await dispatch(fetchAddFavorites(product.id));
    };

    if (loading) return <SkeletonDetail />;
    if (!product) return <div className={s.notFound}>Товар не найден</div>;

    return (
        <div className={s.page}>
            <div className={s.container}>
                <span className={s.backLink} onClick={handleBack}>
                    <TiArrowLeft /> Вернуться к каталогу
                </span>

                <div className={s.mainContent}>
                    <div className={s.imageSection}>
                        <img
                            src={product.images?.[0]?.image || product?.main_image}
                            alt={product.name}
                            className={s.mainImage}
                            loading="lazy"
                            decoding="async"
                        />
                        <div className={s.thumbnails}>
                            {product.images?.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.image}
                                    alt=""
                                    className={s.thumbnail}
                                    onClick={() => {}}
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}
                        </div>
                    </div>

                    <div className={s.infoSection}>
                        <div className={s.topBadgeAndRating}>
                            <div className={product.quantity > 0 ? s.badge : s.badge_out}>
                                {product.quantity > 0 ? "В наличии" : "Нет в наличии"}
                            </div>
                            <div className={s.rating}>{renderStars(product.popularity_score)}</div>
                        </div>

                        <h1 className={s.productTitle}>{product.name}</h1>

                        <div className={s.priceBlock}>
                            <span className={s.currentPrice}>
                                {parseFloat(product.price).toLocaleString()} {product.currency}
                            </span>
                        </div>

                        <div className={s.actionBlock}>
                            {/* Количество */}
                            <div className={s.quantityControl}>
                                <button
                                    className={s.qtyButton}
                                    onClick={handleDecrease}
                                    disabled={addLoading || quantityInCart <= 1}
                                >
                                    −
                                </button>
                                <input disabled className={s.qtyInput} value={quantityInCart} readOnly />
                                <button
                                    className={s.qtyButton}
                                    onClick={handleIncrease}
                                    disabled={addLoading}
                                >
                                    +
                                </button>
                            </div>

                            {quantityInCart === 0 ? (
                                <button
                                    className={s.addButton}
                                    onClick={handleAddToCart}
                                    disabled={addLoading}
                                >
                                    <FiShoppingCart />
                                    {addLoading ? "Добавляем..." : "Добавить в корзину"}
                                </button>
                            ) : (
                                <button
                                    className={s.addButton}
                                    onClick={() => navigate("/basket")}
                                    // style={{ backgroundColor: "#28a745" }}
                                >
                                    <FiShoppingCart />В корзине: {quantityInCart} шт.
                                </button>
                            )}

                            <button
                                className={s.heartButton}
                                onClick={handleToggleFavorite}
                                title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                                disabled={addLoading}
                            >
                                {isFavorite ? (
                                    <FaHeart className={s.btn_heart_active} />
                                ) : (
                                    <FaRegHeart className={s.btn_heart} />
                                )}
                            </button>
                        </div>

                        <div className={s.deliveryInfo}>
                            <span>Доставка по Кыргызстану — 1–2 дня</span>
                            <span>Гарантия качества</span>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className={s.same_tovar}>
                    <h2 className={s.title_cards}>Похожие товары</h2>

                    <div className={s.cards_grid}>
                        {[1, 2, 3, 4].map((i) => (
                            <SkeletonSimilarCard key={i} />
                        ))}
                    </div>
                </div>
            ) : (
                product.similar?.length > 0 && (
                    <div className={s.same_tovar}>
                        <h2 className={s.title_cards}>Похожие товары</h2>
                        <div className={s.cards_grid}>
                            {product.similar.map((item) => (
                                <Card key={item.id} product={item} />
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default DetailCatalogPage;
