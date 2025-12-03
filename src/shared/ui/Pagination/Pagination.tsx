import React from "react";
import s from "./Pagination.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { motion } from "framer-motion";

interface PaginationProps {
    className?: string;
    count: number;
    page: number;
    onChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
}

const getPageNumbers = (currentPage: number, totalPages: number): (number | "...")[] => {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [];
    // const maxVisiblePages = 3;
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
};

export const Pagination = ({ className, count, onChange, page }: PaginationProps) => {
    const paginationVariants = {
        hidden: {
            opacity: 0,
            y: 10,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    const pageNumbers = getPageNumbers(page, count);
    const isFirstPage = page === 1;
    const isLastPage = page === count;

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
            className={classNames(s.pagination_wrapper, {}, [className || ""])}
            variants={paginationVariants}
            initial="hidden"
            animate="visible"
        >
            <div className={s.pagination}>
                <button
                    className={classNames(s.pagination_item, { [s.disabled]: isFirstPage })}
                    onClick={handlePrev}
                    disabled={isFirstPage}
                >
                    Предыдущая
                </button>

                {pageNumbers.map((pageNum, index) => {
                    if (pageNum === "...") {
                        return (
                            <span key={index} className={s.pagination_ellipsis}>
                                ...
                            </span>
                        );
                    }

                    const isCurrent = pageNum === page;
                    return (
                        <button
                            key={pageNum}
                            className={classNames(s.pagination_item, {
                                [s.active]: isCurrent,
                                [s.page_number]: true,
                            })}
                            onClick={(e) => handlePageClick(e, pageNum)}
                            aria-current={isCurrent ? "page" : undefined}
                        >
                            {pageNum}
                        </button>
                    );
                })}

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
