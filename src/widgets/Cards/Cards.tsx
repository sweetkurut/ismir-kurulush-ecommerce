import { fetchAddFavorites, fetchFavorites } from "@/store/slices/favoritesSlice";
import { fetchAddToCart } from "@/store/slices/cartSlice";
import s from "./style.module.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { renderStars } from "@/utils/renderStars";

type CardProps = {
    product: {
        id: number;
        name: string;
        price: string;
        currency: string;
        categories: { id: number; name: string; slug: string }[];
        main_image: string;
        in_stock: boolean;
    };
};

export const Card = ({ product }: CardProps) => {
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    const { favorites } = useAppSelector((state) => state.favorites);
    const { cart } = useAppSelector((state) => state.cart);

    const isInStock = product.in_stock;

    const isInCart = cart?.items.some((item) => item.product.id === product.id) || false;

    const favoriteProductIds = favorites?.results
        ? favorites.results.map((item: any) => item.product.id)
        : [];
    const isFavorite = favoriteProductIds.includes(product.id);

    useEffect(() => {
        if (!favorites) dispatch(fetchFavorites());
    }, [dispatch, favorites]);

    const handleNav = () => nav(`/catalog/${product.id}`);

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!isInStock || isInCart) return;

        await dispatch(fetchAddToCart({ product: product.id, quantity: 1 }));
    };

    const handleToggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!isInStock) return;
        await dispatch(fetchAddFavorites(product.id));
    };

    const cardClass = `${s.card} ${!isInStock ? s.disabledCard : ""}`;
    const contentClass = `${s.content} ${!isInStock ? s.disabledContent : ""}`;

    const cartButtonClass = !isInStock
        ? s.addToCart_btn_disabled
        : isInCart
        ? s.addToCart_btn_inCart
        : s.addToCart_btn;

    const cartButtonText = !isInStock ? "Нет в наличии" : isInCart ? "В корзине" : "В корзину";

    return (
        <div
            className={cardClass}
            onClick={isInStock ? handleNav : undefined}
            title={isInStock ? "Нажмите, чтобы посмотреть" : "Товар временно недоступен"}
        >
            <div className={isInStock ? s.stock_indicator : s.stock_indicator_out}>
                {isInStock ? "В наличии" : "Нет в наличии"}
            </div>

            <button className={s.favorite_btn} onClick={handleToggleFavorite} disabled={!isInStock}>
                {isFavorite ? (
                    <FaHeart color={isInStock ? "red" : "red"} />
                ) : (
                    <FaRegHeart color={isInStock ? "red" : "red"} />
                )}
            </button>

            <div className={s.image_wrap}>
                <img
                    src={product.main_image}
                    alt={product.name}
                    className={s.image}
                    style={{ opacity: isInStock ? 1 : 0.6 }}
                />
            </div>

            <div className={contentClass}>
                <span className={s.category}>{product.categories?.[0]?.name ?? "Без категории"}</span>
                <h3 className={s.title}>{product.name}</h3>
                <div className={s.divider}>
                    <p className={s.price}>
                        {parseFloat(product.price).toLocaleString("ru-RU")} {product.currency}
                    </p>
                    <div className={s.rating}>{renderStars(product.popularity_score)}</div>
                </div>

                <button
                    className={cartButtonClass}
                    onClick={handleAddToCart}
                    disabled={!isInStock || isInCart}
                >
                    <LuShoppingCart />
                    {cartButtonText}
                </button>
            </div>
        </div>
    );
};
