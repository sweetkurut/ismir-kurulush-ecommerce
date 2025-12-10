import React, { useState, useMemo, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./SearchDropdown.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetCategory } from "@/store/slices/categoriesSlice";
import { fetchGetProducts } from "@/store/slices/productsSlice";
import type { ICategory, Products } from "@/store/types";

interface SearchItem {
    type: "category" | "product";
    id: number;
    name: string;
}

export const SearchDropdown = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const searchRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { products, loading: productsLoading } = useAppSelector((state) => state.products);
    const { category, loading: categoryLoading } = useAppSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchGetCategory());
        dispatch(fetchGetProducts({ limit: 500 }));
    }, [dispatch]);

    const filteredResults = useMemo(() => {
        const productList: Products[] = products ?? [];
        const categoryList: ICategory[] = category ?? [];
        const isLoading = productsLoading || categoryLoading;

        if (isLoading) return { items: [], isLoading: true };
        if (searchTerm.length < 2) return { items: [], isLoading: false };

        const q = searchTerm.toLowerCase();

        const categoryResults: SearchItem[] = categoryList
            .filter((c) => c.name.toLowerCase().includes(q))
            .slice(0, 3)
            .map((c) => ({ type: "category", id: c.id, name: c.name }));

        const productResults: SearchItem[] = productList
            .filter((p) => p.name.toLowerCase().includes(q))
            .slice(0, 5)
            .map((p) => ({ type: "product", id: p.id, name: p.name }));

        return { items: [...categoryResults, ...productResults], isLoading: false };
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

    const handleSelect = (item: SearchItem) => {
        setSearchTerm("");
        setIsFocused(false);
        if (item.type === "category") navigate(`/catalog/${item.id}`);
        if (item.type === "product") navigate(`/catalog/${item.id}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!filteredResults.items.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev + 1) % filteredResults.items.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex(
                (prev) => (prev - 1 + filteredResults.items.length) % filteredResults.items.length
            );
        } else if (e.key === "Enter") {
            if (highlightedIndex >= 0) {
                handleSelect(filteredResults.items[highlightedIndex]);
            } else if (filteredResults.items.length === 1) {
                handleSelect(filteredResults.items[0]);
            }
        }
    };

    const highlightMatch = (name: string) => {
        const idx = name.toLowerCase().indexOf(searchTerm.toLowerCase());
        if (idx === -1) return name;
        return (
            <>
                {name.slice(0, idx)}
                <strong>{name.slice(idx, idx + searchTerm.length)}</strong>
                {name.slice(idx + searchTerm.length)}
            </>
        );
    };

    const isVisible = isFocused && searchTerm.length >= 2;

    return (
        <div className={styles.searchContainer} ref={searchRef}>
            <FaSearch className={styles.searchIcon} />
            <input
                type="text"
                placeholder="Поиск товаров..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setHighlightedIndex(-1);
                }}
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
                    {filteredResults.items.length > 0 ? (
                        filteredResults.items.map((item, idx) => (
                            <div
                                key={`${item.type}-${item.id}`}
                                className={`${styles.dropdownItem} ${
                                    highlightedIndex === idx ? styles.highlighted : ""
                                }`}
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setHighlightedIndex(idx)}
                            >
                                {highlightMatch(item.name)}
                            </div>
                        ))
                    ) : (
                        <p className={styles.noResults}>По запросу "{searchTerm}" ничего не найдено.</p>
                    )}
                </div>
            )}
        </div>
    );
};
