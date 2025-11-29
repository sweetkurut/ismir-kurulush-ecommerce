import s from "./style.module.scss";
import { Card } from "@/widgets/Cards/Cards";
import { SkeletonCard } from "@/components/SkeletonCard/SkeletonCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchFavorites } from "@/store/slices/favoritesSlice";

export const FavoritesContent = () => {
    const dispatch = useAppDispatch();
    const { favorites, loading } = useAppSelector((state) => state.favorites);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    return (
        <div className={s.tabContentFavorites}>
            <div className={s.catalog_wrap}>
                {loading && (
                    <div className={s.cards_grid}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {/* {error && <p>Ошибка загрузки</p>} */}

                {!loading && favorites?.results.length === 0 && <p>Нет товаров</p>}

                {!loading && favorites && (
                    <div className={s.cards_grid}>
                        {favorites.results.map((item) => (
                            <Card key={item.id} product={item.product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
