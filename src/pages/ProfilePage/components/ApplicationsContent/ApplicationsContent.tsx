
import type { IOrderRequest } from "@/store/types";
import s from "./style.module.scss";
import { useNavigate } from "react-router-dom";


interface OrdersContentProps {
    orders_req: IOrderRequest[] | null;
}

export const ApplicationsContent = ({ orders_req }: OrdersContentProps) => {
     const orders = orders_req ?? [];
     const nav = useNavigate()


     const handleNav = () => {
        nav('/feedback')
     }

    


    return (
        <div className={s.tabContentApplications}>
            <div className={s.applicationHeader} >
                <h3>Мои заявки на услуги или консультации</h3>
                <button className={s.newApplicationBtn} onClick={handleNav}>+ Создать новую заявку</button>
            </div>

             {orders.length ? (
                    orders.map(order => (
                       <div className={s.applicationCard}>
                <div className={s.appDetails}>
                    <h4>Заявка #{order.id}</h4>
                    {/* <p className={s.appType}>Тип: Запрос на замер</p> */}
                    <p className={s.appDate}>Дата создания: {new Date(order.created_at).toLocaleDateString()}</p>
                    <p className={s.appDescription}>{order.name}</p>
                    <p className={s.appDescription}>{order.comment}</p>
                    <p className={s.appDescription}>{order.phone}</p>
                </div>
                <div className={s.appStatusTag}>
                   <span className={`${s.orderStatus} ${order.is_processed ? s.statusDelivered : s.statusProcessing}`}>
                                    {order.is_processed ? "Доставлен" : "В обработке"}
                                </span>
                </div>
            </div>
                    ))
                ) : (
                    <p>Заявки не найдены</p>
                )}

            {/* <div className={s.applicationCard}>
                <div className={s.appDetails}>
                    <h4>Заявка #{order.id}</h4>
                    <p className={s.appType}>Тип: Запрос на замер</p>
                    <p className={s.appDate}>Дата создания: {new Date(order.created_at).toLocaleDateString()}</p>
                    <p className={s.appDescription}>{order.comment}</p>
                </div>
                <div className={s.appStatusTag}>
                   <span className={`${s.orderStatus} ${order.is_processed ? s.statusDelivered : s.statusProcessing}`}>
                                    {order.is_processed ? "Доставлен" : "В обработке"}
                                </span>
                </div>
            </div> */}
        </div>
    );
};
