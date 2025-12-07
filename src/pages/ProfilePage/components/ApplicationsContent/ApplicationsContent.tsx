/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IOrderRequestList } from "@/store/types";
import s from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { SkeletonApplicationCard } from "@/components/SkeletonApplicationCard/SkeletonApplicationCard";

interface ApplicationsContentProps {
    orders_req: IOrderRequestList[] | null;
    loading?: boolean;
}

const ITEMS_PER_PAGE = 4;

export const ApplicationsContent = ({ orders_req, loading = false }: ApplicationsContentProps) => {
    const orders = orders_req ?? [];

    const nav = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
    const currentOrders = orders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleNav = () => {
        nav("/feedback");
    };

    const handlePageChange = (_: any, page: number) => {
        setCurrentPage(page);
    };

    // Прокрутка вверх при смене страницы
    useEffect(() => {
        const container = document.querySelector(`.${s.tabContentApplications}`);
        if (container) {
            container.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [currentPage]);

    return (
        <div className={s.tabContentApplications}>
            <div className={s.applicationHeader}>
                <h3>Мои заявки </h3>
                <button className={s.newApplicationBtn} onClick={handleNav}>
                    + Создать новую заявку
                </button>
            </div>

            {loading ? (
                <div className={s.cards_grid}>
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                        <SkeletonApplicationCard key={i} />
                    ))}
                </div>
            ) : currentOrders.length ? (
                currentOrders.map((order) => (
                    <div key={order.id} className={s.applicationCard}>
                        <div className={s.appDetails}>
                            <h4>Заявка #{order.id}</h4>
                            <p className={s.appDate}>
                                Дата создания: {new Date(order.created_at).toLocaleDateString()}
                            </p>
                            <p className={s.appDescription}>{order.name}</p>
                            <p className={s.appDescription}>{order.comment}</p>
                            <p className={s.appDescription}>{order.phone}</p>
                        </div>
                        {/* <div className={s.appStatusTag}>
                            <span
                                className={`${s.orderStatus} ${
                                    order.is_processed ? s.statusDelivered : s.statusProcessing
                                }`}
                            >
                                {order.is_processed ? "Доставлен" : "В обработке"}
                            </span>
                        </div> */}
                    </div>
                ))
            ) : (
                <p>Заявки не найдены</p>
            )}

            {totalPages > 1 && !loading && (
                <div className={s.pagination}>
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                </div>
            )}
        </div>
    );
};
