// src/shared/ui/SearchDropdown/SearchDropdown.jsx

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "./SearchDropdown.module.scss";
// Предполагаем, что эти экшены импортируются из соответствующих слайсов
import { fetchGetCategory } from "@/store/slices/categoriesSlice";
import { fetchGetProducts } from "@/store/slices/productsSlice";

// 🚨 ВАЖНО: Определите ваши типы Product и Category (они должны соответствовать тому, что лежит в products?.results)
interface Product {
    id: number;
    name: string;
    slug: string; // Для ссылки на товар
    // Добавьте другие поля, если они нужны для отображения (например, price, image)
}
interface Category {
    id: number;
    name: string;
    // ...
}

export const SearchDropdown = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    // 🎯 Получаем данные и статус загрузки из Redux-стейта
    const { products, loading: productsLoading } = useAppSelector((state) => state.products);
    // 💡 Предполагаем, что ваш слайс 'category' имеет поле 'catogory'
    const { catogory, loading: categoryLoading } = useAppSelector((state) => state.category);

    // Инициируем загрузку данных при монтировании компонента
    useEffect(() => {
        dispatch(fetchGetCategory());
        // Загружаем все продукты или достаточно большой лимит для поиска
        dispatch(fetchGetProducts({ limit: 500 }));
    }, [dispatch]);

    // 🎯 КЛЮЧЕВОЕ: Фильтрация результатов
    const filteredResults = useMemo(() => {
        // Убедитесь, что products и catogory имеют структуру { results: [] }
        const productList: Product[] = products?.results || [];
        const categoryList: Category[] = catogory?.results || [];

        const isLoading = productsLoading || categoryLoading;

        // 1. Состояние загрузки
        if (isLoading) {
            return { productResults: [], categoryResults: [], isLoading: true };
        }

        // 2. Условие минимальной длины запроса (>= 2 символов)
        if (searchTerm.length < 2) return { productResults: [], categoryResults: [], isLoading: false };

        const query = searchTerm.toLowerCase();

        // 3. Фильтрация
        const productResults = productList
            .filter((product) => product.name.toLowerCase().includes(query))
            .slice(0, 5); // Ограничение результатов

        const categoryResults = categoryList
            .filter((cat) => cat.name.toLowerCase().includes(query))
            .slice(0, 3);

        // 4. Возвращаем объект результатов
        return { productResults, categoryResults, isLoading: false };
    }, [searchTerm, products, catogory, productsLoading, categoryLoading]);

    // Обработчик для скрытия выпадающего списка при клике вне
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectResult = useCallback(() => {
        // Сбрасываем запрос и скрываем список после выбора/перехода
        setSearchTerm("");
        setIsFocused(false);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchTerm.trim() !== "") {
            handleSelectResult();
            // 💡 В реальном приложении: window.location.href = `/search?q=${searchTerm}`;
        }
    };

    const hasResults =
        filteredResults.productResults.length > 0 || filteredResults.categoryResults.length > 0;
    const isVisible = isFocused && searchTerm.length >= 2 && hasResults;

    return (
        <div className={styles.searchContainer} ref={searchRef}>
            <FaSearch className={styles.searchIcon} />
            <input
                type="text"
                placeholder="Поиск товаров..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyDown}
            />

            {/* 1. Индикатор загрузки */}
            {filteredResults.isLoading && isFocused && (
                <div className={styles.dropdown}>
                    <p className={styles.noResults}>Загрузка данных для поиска...</p>
                </div>
            )}

            {/* 2. Отображение результатов */}
            {isVisible && (
                <div className={styles.dropdown}>
                    {/* Результаты категорий */}
                    {filteredResults.categoryResults.length > 0 && (
                        <>
                            <h4 className={styles.sectionTitle}>Категории</h4>
                            {filteredResults.categoryResults.map((cat) => (
                                <AppLink
                                    key={`cat-${cat.id}`}
                                    to={`/catalog?category=${cat.id}`}
                                    className={styles.dropdownItem}
                                    onClick={handleSelectResult}
                                >
                                    {cat.name}
                                </AppLink>
                            ))}
                        </>
                    )}

                    {/* Результаты продуктов */}
                    {filteredResults.productResults.length > 0 && (
                        <>
                            <h4 className={styles.sectionTitle}>Товары</h4>
                            {filteredResults.productResults.map((product) => (
                                <AppLink
                                    key={`prod-${product.id}`}
                                    to={`/product/${product.slug}`}
                                    className={styles.dropdownItem}
                                    onClick={handleSelectResult}
                                >
                                    {product.name}
                                </AppLink>
                            ))}
                        </>
                    )}

                    {/* Ссылка на страницу поиска */}
                    <AppLink
                        to={`/search?q=${searchTerm}`}
                        className={styles.seeAll}
                        onClick={handleSelectResult}
                    >
                        Показать все результаты
                    </AppLink>
                </div>
            )}

            {/* 3. Сообщение об отсутствии результатов */}
            {isFocused && searchTerm.length >= 2 && !hasResults && !filteredResults.isLoading && (
                <div className={styles.dropdown}>
                    <p className={styles.noResults}>По запросу "{searchTerm}" ничего не найдено.</p>
                </div>
            )}
        </div>
    );
};
