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
    const { loading, error, products } = useAppSelector((state) => state.products);
    const { sorting } = useAppSelector((state) => state.sorting);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSort, setSelectedSort] = useState("");
    const [activeFilters, setActiveFilters] = useState<FilterParams>({});

    const sortOptions = useMemo(() => {
        const optionsMap = sorting?.sorting_options;
        if (!optionsMap) {
            return [];
        }
        return Object.values(optionsMap).map((option) => ({
            label: option.name,
            value: option.value,
        }));
    }, [sorting]);

    const getCombinedParams = useCallback(
        (page = 1): ProductQueryParams => {
            const params: ProductQueryParams = {
                page,
            };

            if (selectedSort) {
                params.ordering = selectedSort;
            }

            if (activeFilters.category) {
                params.category = activeFilters.category;
            }

            if (activeFilters.brand) {
                params.brand = activeFilters.brand;
            }

            if (activeFilters.min_price !== undefined) {
                params.min_price = activeFilters.min_price;
            }

            if (activeFilters.max_price !== undefined) {
                params.max_price = activeFilters.max_price;
            }

            console.log("📦 Формируем параметры запроса:", params);
            return params;
        },
        [selectedSort, activeFilters]
    );

    const loadProducts = useCallback(
        (params: ProductQueryParams) => {
            console.log("🚀 Отправляем запрос с параметрами:", params);
            dispatch(fetchGetProducts(params));
        },
        [dispatch]
    );

    // Обработчик изменения фильтров
    const handleFilterChange = (filters: FilterParams) => {
        console.log("🎯 Получены новые фильтры:", filters);
        setActiveFilters(filters);
        setCurrentPage(1); // Сбрасываем на первую страницу
    };

    useEffect(() => {
        dispatch(fetchGetSorting());
    }, [dispatch]);

    useEffect(() => {
        if (sortOptions.length > 0 && selectedSort === "") {
            const defaultSortValue = sortOptions[0].value;
            setSelectedSort(defaultSortValue);
        }
    }, [sortOptions, selectedSort]);

    // Загрузка товаров при изменении фильтров или сортировки
    useEffect(() => {
        console.log("🔄 useEffect: загружаем товары", {
            selectedSort,
            activeFilters,
            hasFilters: Object.keys(activeFilters).length > 0,
        });

        loadProducts(getCombinedParams(1));
    }, [selectedSort, activeFilters, loadProducts, getCombinedParams]);

    const handleSortChange = (value: string) => {
        let correctedValue = value;

        if (
            value === sorting?.sorting_options?.highest_price?.value &&
            sorting?.sorting_options?.highest_price?.name === "Самая высокая цена"
        ) {
            correctedValue = "-price";
            console.log("2. Обнаружена ошибка API, ключ ИСПРАВЛЕН на:", correctedValue);
        } else {
            console.log("2. Ключ не требовал исправления. Отправляем:", correctedValue);
        }

        setSelectedSort(correctedValue);
    };

    const handlePageChange = (_: unknown, page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
        loadProducts(getCombinedParams(page));
    };

    const totalPages = Math.ceil((products?.length ?? 0) / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = products?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.filter_wrap}>
                    <Filter onFilterChange={handleFilterChange} />
                </div>

                <div className={s.catalog_wrap}>
                    <div className={s.select_title_wrap}>
                        <div>
                            <h2 className={s.title}>Каталог товаров</h2>
                            {/* Отображение активных фильтров с названиями */}
                            {/* {(activeFilters.category || activeFilters.brand || activeFilters.max_price) && (
                                <div className={s.activeFilters}>
                                    Активные фильтры:
                                    {activeFilters.category &&
                                        ` Категория: ${getCategoryName(activeFilters.category)},`}
                                    {activeFilters.brand && ` Бренд: ${getBrandName(activeFilters.brand)},`}
                                    {activeFilters.min_price && ` Цена от ${activeFilters.min_price}`}
                                    {activeFilters.max_price && ` до ${activeFilters.max_price}`}
                                </div>
                            )} */}
                        </div>

                        <div>
                            {sortOptions.length > 0 && selectedSort && (
                                <CustomSelect
                                    options={sortOptions}
                                    defaultValue={selectedSort}
                                    placeholder="Выберите сортировку"
                                    onSelect={handleSortChange}
                                />
                            )}
                        </div>
                    </div>

                    {loading && (
                        <div className={s.cards_grid}>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    )}

                    {error && <p>Ошибка загрузки</p>}

                    {!loading && currentProducts?.length === 0 && <p>Нет товаров</p>}

                    {!loading && (
                        <div className={s.cards_grid}>
                            {currentProducts?.map((product) => (
                                <Card key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </div>
    );
};
