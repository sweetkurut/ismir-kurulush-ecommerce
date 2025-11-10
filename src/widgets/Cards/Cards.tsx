import { fetchAddFavorites, fetchFavorites } from "@/store/slices/favoritesSlice";
import s from "./style.module.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

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
    const isInStock = product.in_stock;
    const cartButtonText = isInStock ? "В корзину" : "Нет в наличии";
    const cartButtonDisabled = !isInStock;
    const cartButtonClass = isInStock ? s.addToCart_btn : s.addToCart_btn_disabled;

    const dispatch = useAppDispatch();
    const { favorites } = useAppSelector((state) => state.favorites);

    const favoriteProductIds = favorites?.results ? favorites.results.map((item) => item.product.id) : [];

    const isFavorite = favoriteProductIds.includes(product.id);

    useEffect(() => {
        if (!favorites) {
            dispatch(fetchFavorites());
        }
    }, [dispatch, favorites]);

    const handleNav = () => {
        nav(`/catalog/${product.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (!isInStock) return;

        console.log(`Добавить товар ${product.id} в корзину`);
    };

    const handleToggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (!product?.id) return;

        try {
            await dispatch(fetchAddFavorites(product.id));

            if (isFavorite) {
                console.log(`Товар ${product.id} удаляется (POST-toggle).`);
            } else {
                console.log(`Товар ${product.id} добавляется (POST-toggle).`);
            }
        } catch (error) {
            console.error("Ошибка при работе с избранным (toggle):", error);
        }
    };

    return (
        <div className={s.card} onClick={handleNav}>
            <div className={isInStock ? s.stock_indicator : s.stock_indicator_out}>
                {isInStock ? "В наличии" : "Нет в наличии"}
            </div>

            <button className={s.favorite_btn} onClick={handleToggleFavorite}>
                {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
            </button>

            <div className={s.image_wrap}>
                <img src={product.main_image} alt={product.name} className={s.image} />
            </div>

            <div className={s.content}>
                <span className={s.category}>{product.categories?.[0]?.name ?? "Без категории"}</span>
                <h3 className={s.title}>{product.name}</h3>
                <p className={s.price}>
                    {parseFloat(product.price).toLocaleString("ru-RU")} {product.currency}
                </p>

                <button className={cartButtonClass} onClick={handleAddToCart} disabled={cartButtonDisabled}>
                    <LuShoppingCart /> {cartButtonText}
                </button>
            </div>
        </div>
    );
};
