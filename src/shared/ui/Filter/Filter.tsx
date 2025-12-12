/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import s from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetCategory } from "@/store/slices/categoriesSlice";
import { fetchGetBrand } from "@/store/slices/brandSlice";
import { fetchGetProducts } from "@/store/slices/productsSlice";

interface FilterProps {
    onFilterChange: (filters: FilterParams) => void;
}

export interface FilterParams {
    category?: string;
    brand?: number;
    min_price?: number;
    max_price?: number;
}

export const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const dispatch = useAppDispatch();
    const { category } = useAppSelector((state) => state.category);
    const { brand } = useAppSelector((state) => state.brand);
    const { products } = useAppSelector((state) => state.products);

    const [minPriceFromApi, setMinPriceFromApi] = useState<number>(0);
    const [maxPriceFromApi, setMaxPriceFromApi] = useState<number>(0);

    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);

    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<number | "">("");

    /** Первичная загрузка */
    useEffect(() => {
        dispatch(fetchGetProducts({}));
        dispatch(fetchGetCategory());
        dispatch(fetchGetBrand());
    }, [dispatch]);

    /** Получаем min/max */
    useEffect(() => {
        if (!products?.length) return;

        // Преобразуем в числа и фильтруем некорректные значения
        const prices = products.map((p) => Number(p.price)).filter((price) => !isNaN(price));

        const min = Math.min(...prices);
        const max = Math.max(...prices);

        setMinPriceFromApi(min);
        setMaxPriceFromApi(max);
        setMinPrice(min);
        setMaxPrice(max);
    }, [products]);

    // const handleApplyFilters = () => {
    //     const fixedMin = Math.max(minPriceFromApi, minPrice);
    //     const fixedMax = Math.min(maxPriceFromApi, maxPrice);

    //     onFilterChange({
    //         min_price: fixedMin,
    //         max_price: fixedMax,
    //         category: selectedCategory || undefined,
    //         brand: selectedBrand || undefined,
    //     });
    // };

    const handleApplyFilters = () => {
        const fixedMin = Math.max(0, minPrice); // просто проверка на отрицательные значения
        const fixedMax = Math.max(fixedMin, maxPrice); // max >= min

        onFilterChange({
            min_price: fixedMin || undefined,
            max_price: fixedMax || undefined,
            category: selectedCategory || undefined,
            brand: selectedBrand || undefined,
        });
    };

    const handleResetFilters = () => {
        setSelectedCategory("");
        setSelectedBrand("");
        setMinPrice(minPriceFromApi);
        setMaxPrice(maxPriceFromApi);

        onFilterChange({});
    };

    return (
        <div className={s.catalogPage}>
            <div className={s.filtersContainer}>
                <div className={s.filtersHeader}>
                    <span className={s.iconFilter}>☰</span>
                    <h2>Фильтры</h2>
                </div>

                {/* PRICE */}
                <div className={s.filterSection}>
                    <h3>Цена (сом)</h3>

                    <div className={s.priceValue}>
                        {minPrice} — {maxPrice} сом
                    </div>

                    <div className={s.priceInputsContainer}>
                        <div className={s.priceInputItem}>
                            <label>Мин:</label>
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                            />
                        </div>

                        <div className={s.priceInputItem}>
                            <label>Макс:</label>
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                {/* CATEGORY */}
                <div className={s.filterSection}>
                    <h3>Категории</h3>

                    {category?.map((cat) => (
                        <div key={cat.id} className={s.categoryItem}>
                            <label className={s.customRadio}>
                                <input
                                    type="radio"
                                    name="category"
                                    value={cat.id}
                                    checked={selectedCategory === String(cat.id)}
                                    onChange={() => setSelectedCategory(String(cat.id))}
                                />
                                <span className={s.radioCheckmark}></span>
                                {cat.name}
                            </label>
                        </div>
                    ))}
                </div>

                {/* BRAND */}
                <div className={s.filterSection}>
                    <h3>Бренды</h3>

                    {brand?.map((br) => (
                        <div key={br.id} className={s.categoryItem}>
                            <label className={s.customRadio}>
                                <input
                                    type="radio"
                                    name="brand"
                                    value={br.id}
                                    checked={selectedBrand === br.id}
                                    onChange={() => setSelectedBrand(br.id)}
                                />
                                <span className={s.radioCheckmark}></span>
                                {br.name}
                            </label>
                        </div>
                    ))}
                </div>

                {/* ACTIONS */}
                <div className={s.actionButtons}>
                    <button className={s.applyButton} onClick={handleApplyFilters}>
                        Применить
                    </button>
                    <button className={s.resetButton} onClick={handleResetFilters}>
                        Сбросить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
