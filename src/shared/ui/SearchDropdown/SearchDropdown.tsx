import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "./SearchDropdown.module.scss";
import { fetchGetCategory } from "@/store/slices/categoriesSlice";
import { fetchGetProducts } from "@/store/slices/productsSlice";
import type { ICategory, Products } from "@/store/types";

export const SearchDropdown = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const { products, loading: productsLoading } = useAppSelector((state) => state.products);
    const { category, loading: categoryLoading } = useAppSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchGetCategory());
        dispatch(fetchGetProducts({ limit: 500 }));
    }, [dispatch]);

    // 🔥 СТРУКТУРА ТЕПЕРЬ ПРАВИЛЬНАЯ:
    const filteredResults = useMemo(() => {
        const productList: Products[] = products ?? [];
        const categoryList: ICategory[] = category ?? [];

        const isLoading = productsLoading || categoryLoading;

        if (isLoading) return { productResults: [], categoryResults: [], isLoading: true };

        if (searchTerm.length < 2) return { productResults: [], categoryResults: [], isLoading: false };

        const q = searchTerm.toLowerCase();

        const productResults = productList.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 5);

        const categoryResults = categoryList.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 3);

        return { productResults, categoryResults, isLoading: false };
    }, [searchTerm, products, category, productsLoading, categoryLoading]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectResult = useCallback(() => {
        setSearchTerm("");
        setIsFocused(false);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchTerm.trim() !== "") {
            handleSelectResult();
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

            {filteredResults.isLoading && isFocused && (
                <div className={styles.dropdown}>
                    <p className={styles.noResults}>Загрузка данных...</p>
                </div>
            )}

            {isVisible && (
                <div className={styles.dropdown}>
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

                    <AppLink
                        to={`/search?q=${searchTerm}`}
                        className={styles.seeAll}
                        onClick={handleSelectResult}
                    >
                        Показать все результаты
                    </AppLink>
                </div>
            )}

            {isFocused && searchTerm.length >= 2 && !hasResults && !filteredResults.isLoading && (
                <div className={styles.dropdown}>
                    <p className={styles.noResults}>По запросу "{searchTerm}" ничего не найдено.</p>
                </div>
            )}
        </div>
    );
};
