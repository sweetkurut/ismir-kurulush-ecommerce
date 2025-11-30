import s from "./style.module.scss";
import { Card } from "@/widgets/Cards/Cards";
import { SkeletonCard } from "@/components/SkeletonCard/SkeletonCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { fetchFavorites } from "@/store/slices/favoritesSlice";
import { Pagination } from "@/shared/ui/Pagination/Pagination";

const ITEMS_PER_PAGE = 4;

export const FavoritesContent = () => {
    const dispatch = useAppDispatch();
    const { favorites, loading } = useAppSelector((state) => state.favorites);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    const totalPages = Math.ceil((favorites?.results.length || 0) / ITEMS_PER_PAGE);

    const currentFavorites = favorites?.results.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (_: any, page: number) => {
        setCurrentPage(page);
        const container = document.querySelector(`.${s.tabContentFavorites}`);
        if (container) {
            container.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className={s.tabContentFavorites}>
            <div className={s.catalog_wrap}>
                {loading && (
                    <div className={s.cards_grid}>
                        {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {!loading && favorites?.results.length === 0 && <p>Нет товаров</p>}

                {!loading && favorites && (
                    <div>
                        <div className={s.cards_grid}>
                            {currentFavorites.map((item) => (
                                <Card key={item.id} product={item.product} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className={s.pagination}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
