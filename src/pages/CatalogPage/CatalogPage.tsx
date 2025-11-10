import { Filter } from "@/shared/ui/Filter/Filter";
import s from "./style.module.scss";
import { Card } from "@/widgets/Cards/Cards";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetProducts } from "@/store/slices/productsSlice";
import { CustomSelect } from "@/components/Select/Select";

const ITEMS_PER_PAGE = 8;

const sortOptions = [
    { value: "popularity", label: "По популярности" },
    { value: "price_asc", label: "По цене (возрастание)" },
    { value: "price_desc", label: "По цене (убывание)" },
    { value: "name_asc", label: "По названию (А-Я)" },
];

export const CatalogPage = () => {
    const dispatch = useAppDispatch();
    const { loading, error, products } = useAppSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);

    useEffect(() => {
        dispatch(fetchGetProducts());
    }, [dispatch]);

    const handlePageChange = (_: unknown, page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSortChange = (value: string) => {
        setSelectedSort(value);
        console.log("Выбрана сортировка:", value);
        // Здесь вы можете вызвать Redux-экшен или обновить состояние для перезагрузки товаров
        // dispatch(fetchGetProducts({ ...activeFilters, sort_by: value }));
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
                    <div className={s.select_title_wrap}>
                        <div>
                            <h2 className={s.title}>Каталог товаров</h2>
                            <span className={s.found_tovar}>{`Найдено ${products?.length} товаров`}</span>
                        </div>

                        <div>
                            <CustomSelect
                                options={sortOptions}
                                defaultValue={selectedSort}
                                placeholder="Выберите сортировку"
                                onSelect={handleSortChange}
                            />
                        </div>
                    </div>

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
