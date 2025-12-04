/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filter, type FilterParams } from "@/shared/ui/Filter/Filter";
import s from "./style.module.scss";
import { Card } from "@/widgets/Cards/Cards";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetProducts } from "@/store/slices/productsSlice";
import { CustomSelect } from "@/components/Select/Select";
import { fetchGetSorting } from "@/store/slices/sortingSlice";
import { SkeletonCard } from "@/components/SkeletonCard/SkeletonCard";

const ITEMS_PER_PAGE = 8;

interface ProductQueryParams {
    page?: number;
    ordering?: string;
    [key: string]: any;
}

export const CatalogPage = () => {
    const dispatch = useAppDispatch();
    const { loading, products } = useAppSelector((state) => state.products);
    const { sorting } = useAppSelector((state) => state.sorting);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSort, setSelectedSort] = useState("");
    const [activeFilters, setActiveFilters] = useState<FilterParams>({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const sortOptions = useMemo(() => {
        if (!sorting?.sorting_options) return [];
        return Object.values(sorting.sorting_options).map((opt) => ({
            label: opt.name,
            value: opt.value,
        }));
    }, [sorting]);

    const getParams = useCallback(
        (page = 1) => ({
            page,
            ordering: selectedSort || undefined,
            ...activeFilters,
        }),
        [selectedSort, activeFilters]
    );

    const loadProducts = useCallback(
        (params: ProductQueryParams) => {
            dispatch(fetchGetProducts(params));
        },
        [dispatch]
    );

    const handleFilterChange = (filters: FilterParams) => {
        setActiveFilters(filters);
        setCurrentPage(1);
        setIsFilterOpen(false);
    };

    const handleSortChange = (value: string) => {
        const fixed = value.includes("highest_price") ? "-price" : value;
        setSelectedSort(fixed);
        setCurrentPage(1);
    };

    const handlePageChange = (_: any, page: number) => {
        setCurrentPage(page);
        loadProducts(getParams(page));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        dispatch(fetchGetSorting());
    }, [dispatch]);

    useEffect(() => {
        if (sortOptions.length && !selectedSort) setSelectedSort(sortOptions[0].value);
    }, [sortOptions, selectedSort]);

    useEffect(() => {
        loadProducts(getParams(1));
    }, [loadProducts, getParams]);

    const totalPages = Math.ceil((products?.length || 0) / ITEMS_PER_PAGE);
    const currentProducts = products?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <>
            {/* Кнопка "Фильтры" — только на мобильных */}
            <div className={s.mobile_filter_btn} onClick={() => setIsFilterOpen(true)}>
                <span className={s.filter_icon}>☰</span>
                Фильтры
            </div>

            <div className={s.wrapper}>
                {/* Десктоп: фильтр слева */}
                <aside className={s.filter_desktop}>
                    <Filter onFilterChange={handleFilterChange} />
                </aside>

                {/* Мобильный фильтр — выезжает слева */}
                {isFilterOpen && (
                    <>
                        <div className={s.overlay} onClick={() => setIsFilterOpen(false)} />
                        <div className={s.filter_mobile}>
                            <Filter onFilterChange={handleFilterChange} />
                        </div>
                    </>
                )}

                {/* Каталог товаров */}
                <div className={s.catalog_wrap}>
                    <div className={s.header}>
                        <h1 className={s.title}>Каталог товаров</h1>
                        <div className={s.found}>Найдено {products?.length || 0} товаров</div>
                        <div className={s.sort}>
                            {sortOptions.length > 0 && (
                                <CustomSelect
                                    options={sortOptions}
                                    defaultValue={selectedSort}
                                    placeholder="По популярности"
                                    onSelect={handleSortChange}
                                />
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <div className={s.cards_grid}>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    ) : (
                        <div className={s.cards_grid}>
                            {currentProducts?.map((product) => (
                                <Card key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {totalPages > 0 && (
                <div className={s.pagination}>
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                </div>
            )}
        </>
    );
};

export default CatalogPage;
