import s from "./Pagination.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Pagination as PaginationMui } from "@mui/material";
import { motion } from 'framer-motion';

interface PaginationProps {
    className?: string;
    count?: number;
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const Pagination = ({ className, count, onChange, page }: PaginationProps) => {
    const paginationVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className={classNames(s.pagination_wrapper, {}, [className])}
            variants={paginationVariants}
            initial="hidden"
            animate="visible"
        >
            <PaginationMui
                className={classNames(s.pagination, {}, [className])}
                count={count ? count : 0}
                onChange={onChange}
                variant="outlined"
                page={page}
                shape="rounded"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    "& .MuiPagination-ul": {
                        gap: "8px",
                    },
                    "& .MuiPaginationItem-root": {
                        borderRadius: "12px",
                        minWidth: "40px",
                        height: "40px",
                        color: "rgba(255, 255, 255, 0.6)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        fontSize: "14px",
                        fontFamily: "var(--font-muller-r)",
                        background: "rgba(255, 255, 255, 0.02)",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s ease",

                        "&:hover": {
                            background: "rgba(255, 255, 255, 0.03)",
                            borderColor: "rgba(255, 255, 255, 0.15)",
                            color: "#fff",
                        }
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                        fontSize: "14px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        color: "#fff",
                        fontFamily: "var(--font-muller-r)",
                        fontWeight: 500,

                        "&:hover": {
                            background: "rgba(255, 255, 255, 0.08)",
                        }
                    },
                    "& .MuiPaginationItem-previousNext": {
                        borderRadius: "12px",
                        minWidth: "40px",
                        height: "40px",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        color: "rgba(255, 255, 255, 0.6)",
                        background: "rgba(255, 255, 255, 0.02)",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s ease",

                        "&:hover": {
                            background: "rgba(255, 255, 255, 0.03)",
                            borderColor: "rgba(255, 255, 255, 0.15)",
                            color: "#fff",
                        },

                        "&.Mui-disabled": {
                            opacity: 0.3,
                            cursor: "not-allowed",
                        }
                    },
                }}
            />
        </motion.div>
    );
};
