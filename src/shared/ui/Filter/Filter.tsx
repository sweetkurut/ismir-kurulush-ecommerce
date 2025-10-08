import { useState, useEffect, useRef } from "react";
import s from "./style.module.scss";

export const Filter = () => {
    const minPrice = 0;
    const maxPrice = 1000;

    const [priceRange, setPriceRange] = useState(100);
    const [selectedCategory, setSelectedCategory] = useState("Гипсокартон и комплектующие");
    const sliderRef = useRef(null);

    const updateSliderTrack = (value) => {
        const percentage = ((value - minPrice) / (maxPrice - minPrice)) * 100;
        if (sliderRef.current) {
            sliderRef.current.style.background = `linear-gradient(to right, ${s.primaryOrange} 0%, ${s.primaryOrange} ${percentage}%, ${s.borderGray} ${percentage}%, ${s.borderGray} 100%)`;
        }
    };

    useEffect(() => {
        updateSliderTrack(priceRange);
    }, [priceRange]);

    const handlePriceChange = (event) => {
        setPriceRange(Number(event.target.value));
    };

    const categories = [
        "Арматура",
        "Металлопрокат",
        "Пиломатериалы, ОСП, ДСП, Фанера",
        "Металлоконструкции",
        "Производство сетки МАК",
        "Заборная сетка",
        "Гипсокартон и комплектующие",
        "Утеплитель и изоляция",
        "Сухие строительные смеси",
        "Лакокрасочные материалы",
        "Инструменты",
        "Водопровод и канализация",
        "Крепежи",
    ];

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
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
                        {categories.map((category) => (
                            <div className={s.categoryItem} key={category}>
                                <label className={s.customRadio}>
                                    <input
                                        type="radio"
                                        name="category"
                                        value={category}
                                        checked={selectedCategory === category}
                                        onChange={handleCategoryChange}
                                    />
                                    <span className={s.radioCheckmark}></span>
                                    {category}
                                </label>
                            </div>
                        ))}
                    </form>
                </div>

                <div className={s.actionButtons}>
                    <button className={s.applyButton}>Применить</button>
                    <button className={s.resetButton}>Сбросить</button>
                </div>
            </div>
        </div>
    );
};
