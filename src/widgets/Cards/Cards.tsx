import s from "./style.module.scss";
import placeholderImage from "@/shared/assets/images/placeholderimage.svg"; // Условный путь к заглушке изображения
// import heartIcon from "@/shared/assets/icons/heart.svg";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";

type CardProps = {
    product: {
        id: number;
        title: string;
        price: number;
        category: string;
        image: string;
    };
};

export const Card = ({ product }: CardProps) => {
    return (
        <div className={s.card}>
            <button className={s.favorite_btn}>
                <FaRegHeart />
            </button>

            <div className={s.image_wrap}>
                <img src={product.image || placeholderImage} alt={product.title} className={s.image} />
            </div>

            <div className={s.content}>
                <span className={s.category}>{product.category}</span>
                <h3 className={s.title}>{product.title}</h3>
                <p className={s.price}>{product.price.toLocaleString("ru-RU")} сом</p>

                <button className={s.addToCart_btn}>
                    <LuShoppingCart />В корзину
                </button>
            </div>
        </div>
    );
};
