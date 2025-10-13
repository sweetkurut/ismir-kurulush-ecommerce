import { useState } from "react";
import s from "./style.module.scss";
import { FaRegTrashAlt } from "react-icons/fa";

type CardProps = {
    item: {
        name: string;
        price: number;
        quantity: number;
    };
};

export const BasketItemCard = ({ item }: CardProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className={s.basketItem}>
            <div className={s.itemImage} />
            <div className={s.itemContent}>
                <div className={s.itemName}>{item.name}</div>

                <div className={s.controls}>
                    <div className={s.quantityControl}>
                        <button className={s.qtyButton} onClick={decreaseQuantity}>
                            −
                        </button>
                        <input
                            disabled
                            className={s.qtyInput}
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                        />
                        <button className={s.qtyButton} onClick={increaseQuantity}>
                            +
                        </button>
                    </div>
                    <span className={s.itemPrice}>{item.price} сом</span>
                </div>
            </div>
            <FaRegTrashAlt className={s.icon_delete} />
        </div>
    );
};
