import { BasketItemCard } from "@/widgets/BasketItemCard/BasketItemCard";
import s from "./style.module.scss";
import { GiCheckMark } from "react-icons/gi";

const basketItems = [
    { id: 1, name: "Цемент портландский М500", quantity: 2, price: 900, image: "cement.jpg" },
    { id: 2, name: "Цемент портландский М500", quantity: 2, price: 900, image: "cement.jpg" },
    { id: 3, name: "Цемент портландский М500", quantity: 2, price: 900, image: "cement.jpg" },
    { id: 4, name: "Цемент портландский М500", quantity: 2, price: 900, image: "cement.jpg" },
];

const SummaryData = {
    subtotal: 29650,
    delivery: 500,
    total: 29700,
};

export const BasketPage = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <h1 className={s.title}>Корзина</h1>

                <div className={s.basketLayout}>
                    <div className={s.itemsList}>
                        {basketItems.map((item) => (
                            <BasketItemCard key={item.id} item={item} />
                        ))}
                    </div>

                    <div className={s.summaryBlock}>
                        <div className={s.summaryTitle}>Итого</div>

                        <div className={s.totalTable}>
                            <div className={s.totalRow}>
                                <span>Товары</span>
                                <span className={s.sum_col}>{SummaryData.subtotal} сом</span>
                            </div>
                            <div className={s.totalRow}>
                                <span>Доставка</span>
                                <span className={s.sum_col}>{SummaryData.delivery} сом</span>
                            </div>
                        </div>

                        <div className={s.totalOverall}>
                            <span className={s.vsego}>Всего</span>
                            <span className={s.sum}>{SummaryData.total} сом</span>
                        </div>

                        <a href="#" className={`${s.actionButton} ${s.checkoutButton}`}>
                            Оформить заказ →
                        </a>
                        <a href="#" className={`${s.actionButton} ${s.continueButton}`}>
                            Продолжить покупки
                        </a>

                        <div className={s.summaryFeatures}>
                            <div className={s.featureItem}>
                                <GiCheckMark />
                                Гарантия качества
                            </div>
                            <div className={s.featureItem}>
                                <GiCheckMark />
                                Возможность оплаты при получении
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
