import React from "react";
import s from "./Pagination.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { motion } from "framer-motion";

interface PaginationProps {
    className?: string;
    count: number; // Общее количество страниц (обязательный)
    page: number; // Текущая страница (обязательный)
    onChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
}

// Вспомогательная функция для генерации номеров страниц (отображение 1, 2, 3...)
const getPageNumbers = (currentPage: number, totalPages: number): (number | '...')[] => {
    // В вашем макете отображаются только 5 элементов: "Предыдущая", 1, 2, 3, "Следующая"
    // Мы упростим логику до отображения соседних страниц.
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Если страниц много, отобразим текущую и пару соседних
    const pages: (number | '...')[] = [];
    const maxVisiblePages = 3;
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    
    return pages;
};

export const Pagination = ({ className, count, onChange, page }: PaginationProps) => {
    
    // Передавать variants в motion.div без пропса variants может вызвать предупреждение,
    // но если вы хотите сохранить анимацию, лучше явно указать Variants
    const paginationVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0, 0, 0.2, 1],
            },
        },
    };
    
    const pageNumbers = getPageNumbers(page, count);
    const isFirstPage = page === 1;
    const isLastPage = page === count;
    
    // Функции-обработчики для кнопок
    const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isFirstPage) {
            onChange(e, page - 1);
        }
    };

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isLastPage) {
            onChange(e, page + 1);
        }
    };

    const handlePageClick = (e: React.MouseEvent<HTMLButtonElement>, pageNum: number) => {
        onChange(e, pageNum);
    };

    return (
        <motion.div
            className={classNames(s.pagination_wrapper, {}, [className])}
            variants={paginationVariants} // Добавил обратно, чтобы соответствовать логике
            initial="hidden"
            animate="visible"
        >
            <div className={s.pagination}>
                {/* Кнопка "Предыдущая" */}
                <button
                    className={classNames(s.pagination_item, { [s.disabled]: isFirstPage })}
                    onClick={handlePrev}
                    disabled={isFirstPage}
                >
                    Предыдущая
                </button>

                {/* Номера страниц */}
                {pageNumbers.map((pageNum, index) => {
                    if (pageNum === '...') {
                        return <span key={index} className={s.pagination_ellipsis}>...</span>;
                    }

                    const isCurrent = pageNum === page;
                    return (
                        <button
                            key={pageNum}
                            className={classNames(s.pagination_item, { [s.active]: isCurrent, [s.page_number]: true })}
                            onClick={(e) => handlePageClick(e, pageNum)}
                            aria-current={isCurrent ? 'page' : undefined}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                {/* Кнопка "Следующая" */}
                <button
                    className={classNames(s.pagination_item, { [s.disabled]: isLastPage })}
                    onClick={handleNext}
                    disabled={isLastPage}
                >
                    Следующая
                </button>
            </div>
        </motion.div>
    );
};