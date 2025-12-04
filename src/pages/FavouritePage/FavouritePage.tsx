import { useAppDispatch, useAppSelector } from "@/store/hooks";
import s from "./style.module.scss";
import { memo, useEffect, useState } from "react";
import { fetchFavorites } from "@/store/slices/favoritesSlice";
import { Card } from "@/widgets/Cards/Cards";
import { SkeletonCard } from "@/components/SkeletonCard/SkeletonCard";
import { NavLink } from "react-router-dom";
import { Pagination } from "@/shared/ui/Pagination/Pagination";

const ITEMS_PER_PAGE = 12;

export const FavouritePage = () => {
    const dispatch = useAppDispatch();
    const { favorites, loading } = useAppSelector((state) => state.favorites);
    const [currentPage, setCurrentPage] = useState(1);

    const results = favorites?.results ?? [];
    const totalPages = Math.max(1, Math.ceil(results.length / ITEMS_PER_PAGE));

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (_: unknown, page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [favorites]);

    const BasketEmptyState = memo(() => (
        <div className={s.auth}>
            <div className={s.auth_container}>
                <div className={s.unauthorized}>
                    <div className={s.unauthorizedContent}>
                        <div>
                            <h3 className={s.unauthorizedTitle}>Избранные товары отсутствуют</h3>
                        </div>

                        <div className={s.loginButton_wrap}>
                            <NavLink to={"/catalog"} className={s.loginButton}>
                                Перейти в каталог
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    if (!results.length) {
        return <BasketEmptyState />;
    }

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <h2 className={s.title}>Избранные ({results.length})</h2>

                <div className={s.catalog_wrap}>
                    {loading ? (
                        <div className={s.cards_grid}>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    ) : (
                        <div className={s.cards_grid}>
                            {currentProducts.map((item) => (
                                <Card key={item.id} product={item.product} />
                            ))}
                        </div>
                    )}
                </div>

                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    className={s.pagination}
                />
            </div>
        </div>
    );
};

export default FavouritePage;
