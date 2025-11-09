import { Filter } from "@/shared/ui/Filter/Filter";
import s from "./style.module.scss";
import { Card } from "@/widgets/Cards/Cards";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetProducts } from "@/store/slices/productsSlice";

const ITEMS_PER_PAGE = 8;

export const CatalogPage = () => {
    const dispatch = useAppDispatch();
    const { loading, error, products } = useAppSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchGetProducts());
    }, [dispatch]);

    const handlePageChange = (_: unknown, page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const totalPages = Math.ceil((products?.length ?? 0) / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = products?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.filter_wrap}>
                    <Filter />
                </div>

                <div className={s.catalog_wrap}>
                    <h2 className={s.title}>Каталог товаров</h2>

                    {loading && <p>Загрузка...</p>}
                    {error && <p>Ошибка загрузки</p>}
                    {!loading && currentProducts?.length === 0 && <p>Нет товаров</p>}

                    <div className={s.cards_grid}>
                        {currentProducts?.map((product) => (
                            <Card key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </div>
    );
};
