import { useState, useEffect, useRef } from "react";
import s from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetCategory } from "@/store/slices/categoriesSlice";
import { fetchGetBrand } from "@/store/slices/brandSlice";

interface FilterProps {
    onFilterChange: (filters: FilterParams) => void;
}

export interface FilterParams {
    category?: string; // slug категории
    brand?: number; // id бренда
    min_price?: number;
    max_price?: number;
}

export const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const dispatch = useAppDispatch();
    const { category } = useAppSelector((state) => state.category);
    const { brand } = useAppSelector((state) => state.brand);
    const [priceRange, setPriceRange] = useState(100);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<number | "">("");

    const minPrice = 0;
    const maxPrice = 1000;

    const sliderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(fetchGetCategory());
        dispatch(fetchGetBrand());
    }, [dispatch]);

    const updateSliderTrack = (value: number) => {
        const percentage = ((value - minPrice) / (maxPrice - minPrice)) * 100;
        if (sliderRef.current) {
            sliderRef.current.style.background = `linear-gradient(to right, ${s.primaryOrange} 0%, ${s.primaryOrange} ${percentage}%, ${s.borderGray} ${percentage}%, ${s.borderGray} 100%)`;
        }
    };

    useEffect(() => {
        updateSliderTrack(priceRange);
    }, [priceRange]);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceRange(Number(event.target.value));
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleBrandChange = (brandId: number) => {
        setSelectedBrand(brandId);
    };

    const handleApplyFilters = () => {
        const filters: FilterParams = {
            min_price: minPrice,
            max_price: priceRange,
        };

        if (selectedCategory) {
            filters.category = selectedCategory;
        }

        if (selectedBrand) {
            filters.brand = selectedBrand;
        }

        console.log("Применяемые фильтры:", filters);
        onFilterChange(filters);
    };

    const handleResetFilters = () => {
        setPriceRange(100);
        setSelectedCategory("");
        setSelectedBrand("");

        onFilterChange({});
    };

    return (
        <div className={s.catalogPage}>
            <div className={s.filtersContainer}>
                <div className={s.filtersHeader}>
                    <span className={s.iconFilter}>☰</span>
                    <h2>Фильтры</h2>
                </div>

                <div className={s.filterSection}>
                    <h3>Цена (сом)</h3>
                    <div className={s.priceValue}>{priceRange} сом</div>
                    <div className={s.priceSliderContainer}>
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange}
                            onChange={handlePriceChange}
                            ref={sliderRef}
                            className={s.priceRangeSlider}
                        />
                        <div className={s.priceLabels}>
                            <span>{minPrice} сом</span>
                            <span>{maxPrice} сом</span>
                        </div>
                    </div>
                </div>

                <div className={s.filterSection}>
                    <h3>Категории</h3>
                    <form>
                        {category?.map((cat) => (
                            <div className={s.categoryItem} key={cat.id}>
                                <label className={s.customRadio}>
                                    <input
                                        type="radio"
                                        name="category"
                                        value={cat.slug}
                                        checked={selectedCategory === cat.slug}
                                        onChange={() => handleCategoryChange(cat.slug)}
                                    />
                                    <span className={s.radioCheckmark}></span>
                                    {cat.name}
                                </label>
                            </div>
                        ))}
                    </form>
                </div>

                <div className={s.filterSection}>
                    <h3>Бренды</h3>
                    <form>
                        {brand?.map((br) => (
                            <div className={s.categoryItem} key={br.id}>
                                <label className={s.customRadio}>
                                    <input
                                        type="radio"
                                        name="brand"
                                        value={br.id}
                                        checked={selectedBrand === br.id}
                                        onChange={() => handleBrandChange(br.id)}
                                    />
                                    <span className={s.radioCheckmark}></span>
                                    {br.name}
                                </label>
                            </div>
                        ))}
                    </form>
                </div>

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
