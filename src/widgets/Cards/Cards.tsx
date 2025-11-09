import s from "./style.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

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

    const handleNav = () => {
        nav(`/catalog/${product.id}`);
    };

    return (
        <div className={s.card} onClick={handleNav}>
            <button className={s.favorite_btn}>
                <FaRegHeart />
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

                <button className={s.addToCart_btn}>
                    <LuShoppingCart /> В корзину
                </button>
            </div>
        </div>
    );
};
