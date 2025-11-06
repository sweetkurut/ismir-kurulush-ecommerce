import s from "./style.module.scss";

export const OrdersContent = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.tabContentOrders}>
                <div className={s.orderCard}>
                    <div className={s.orderHeader}>
                        <div className={s.wrap_title}>
                            <h2 className={s.orderTitle}>Заказ #ORD-001</h2>
                            <span className={s.orderDate}>15 сентября 2025</span>
                        </div>
                        <span className={`${s.orderStatus} ${s.statusDelivered}`}>Доставлен</span>
                    </div>
                    <p className={s.orderItemsCount}>3 товара</p>
                    <ul className={s.orderItemsList}>
                        <li>Анкерная шайба АЦШ-3 (18)</li>
                        <li>Краска водоэмульсионная белая</li>
                        <li>Американка муфта 20х1/2</li>
                    </ul>
                    <span className={s.orderTotal}>1 250 сом</span>
                </div>

                <div className={s.orderCard}>
                    <div className={s.orderHeader}>
                        <div className={s.wrap_title}>
                            <h2 className={s.orderTitle}>Заказ #ORD-002</h2>
                            <span className={s.orderDate}>25 сентября 2025</span>
                        </div>
                        <span className={`${s.orderStatus} ${s.statusProcessing}`}>В обработке</span>
                    </div>
                    <p className={s.orderItemsCount}>1 товар</p>
                    <ul className={s.orderItemsList}>
                        <li>Анкерная шайба АЦШ-3 (18)</li>
                    </ul>
                    <span className={s.orderTotal}>900 сом</span>
                </div>
            </div>
        </div>
    );
};