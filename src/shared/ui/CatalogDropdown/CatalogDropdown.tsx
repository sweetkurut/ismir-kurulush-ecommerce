import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./CatalogDropdown.module.scss";

type Category = {
    id: number;
    name: string;
    icon?: React.ReactNode;
    subcategories?: Category[];
};

export const CatalogDropdown = ({
    categories,
    onNavigateAndClose,
}: {
    categories: Category[];
    onNavigateAndClose?: () => void;
}) => {
    const [open, setOpen] = useState(false);
    const [activeSub, setActiveSub] = useState<number | null>(null);
    const navigate = useNavigate();

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 1024;

    const handleNavigation = (categoryId: number) => {
        navigate(`/catalog?category=${categoryId}`);
        setOpen(false);
        setActiveSub(null);

        if (onNavigateAndClose) {
            onNavigateAndClose();
        }
    };

    const handleTriggerClick = () => {
        if (isMobile) {
            if (!open) {
                // 1-е нажатие: открыть меню
                setOpen(true);
                setActiveSub(null);
            } else {
                // 2-е нажатие: переход в каталог
                navigate("/catalog");
                setOpen(false);
                setActiveSub(null);

                if (onNavigateAndClose) {
                    onNavigateAndClose();
                }
            }
            return;
        }

        // ДЕСКТОП
        if (!activeSub) {
            navigate("/catalog");
            setOpen(false);
        }
    };

    // ❗ Функции для Десктопа
    const handleMouseEnter = () => !isMobile && setOpen(true);
    const handleMouseLeave = () => !isMobile && setOpen(false) && setActiveSub(null);

    return (
        <div
            className={`${styles.catalog_dropdown} ${open ? styles.open : ""} ${
                isMobile ? styles.mobile_view : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className={styles.trigger} onClick={handleTriggerClick}>
                Каталог
                <ChevronRight className={`${styles.chevron} ${open ? styles.rotated : ""}`} />
            </button>

            <div className={styles.menu}>
                <div
                    className={styles.menu_inner}
                    // ВАЖНО: На десктопе сохраняем сдвиг, на мобильном отключаем!
                    style={{
                        transform: activeSub !== null && !isMobile ? "translateX(-50%)" : "translateX(0)",
                    }}
                >
                    {/* 🎯 КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: УСЛОВНЫЙ РЕНДЕРИНГ НА МОБИЛЬНОМ */}

                    {/* 1. Основное меню (скрываем, если активно подменю и мы на мобильном) */}
                    {!(isMobile && activeSub !== null) && (
                        <div className={styles.main_menu}>
                            {categories?.map((cat) => {
                                // ... (логика рендеринга main_menu остается прежней) ...
                                const hasSubcategories = cat.subcategories && cat.subcategories.length > 0;

                                return (
                                    <label
                                        key={cat.id}
                                        onClick={() => {
                                            if (hasSubcategories) {
                                                setActiveSub(cat.id);
                                            } else {
                                                handleNavigation(cat.id);
                                            }
                                        }}
                                        className={hasSubcategories ? styles.has_sub : ""}
                                    >
                                        <p>{cat.name}</p>
                                        {hasSubcategories && (
                                            <ChevronRight className={styles.chevron_right} />
                                        )}
                                    </label>
                                );
                            })}
                        </div>
                    )}

                    {/* 2. Подменю (показываем, если активно подменю и мы на мобильном) */}
                    {isMobile && activeSub !== null && (
                        <div className={styles.sub_menu_wrapper}>
                            {categories?.map((cat) =>
                                cat.subcategories && cat.subcategories.length > 0 && activeSub === cat.id ? (
                                    <div key={cat.id} className={styles.sub_menu}>
                                        <label onClick={() => setActiveSub(null)} className={styles.back}>
                                            ← Назад
                                        </label>
                                        {cat.subcategories.map((sub) => (
                                            <button
                                                key={sub.id}
                                                onClick={() => {
                                                    handleNavigation(sub.id);
                                                }}
                                            >
                                                <p>{sub.name}</p>
                                            </button>
                                        ))}
                                    </div>
                                ) : null
                            )}
                        </div>
                    )}

                    {/* 3. Для ДЕСКТОПА: показываем оба блока, чтобы сработал translateX */}
                    {!isMobile && (
                        <div className={styles.sub_menu_wrapper}>
                            {/* ... (ваш существующий код для sub_menu_wrapper) ... */}
                            {categories?.map((cat) =>
                                cat.subcategories && cat.subcategories.length > 0 && activeSub === cat.id ? (
                                    <div key={cat.id} className={styles.sub_menu}>
                                        <label onClick={() => setActiveSub(null)} className={styles.back}>
                                            ← Назад
                                        </label>
                                        {cat.subcategories.map((sub) => (
                                            <button
                                                key={sub.id}
                                                onClick={() => {
                                                    handleNavigation(sub.id);
                                                }}
                                            >
                                                <p>{sub.name}</p>
                                            </button>
                                        ))}
                                    </div>
                                ) : null
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
