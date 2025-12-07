import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Drawer, Spin, Badge, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./CategoryMegaMenu.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetCategory } from "@/store/slices/categoriesSlice";
import { fetchGetProducts } from "@/store/slices/productsSlice";

const { Text } = Typography;

const CategoryMegaMenu: React.FC = () => {
    const dispatch = useAppDispatch();

    const [hoveredCatId, setHoveredCatId] = useState<number | null>(null);
    const [mobileVisible, setMobileVisible] = useState(false);
    const [selectedMobileCat, setSelectedMobileCat] = useState<number | null>(null);

    const categories = useAppSelector((state) => state.category.category || []);
    const products = useAppSelector((state) => state.products.products || []); // ← было state.products
    const loadingProducts = useAppSelector((state) => state.products.loading || false);

    useEffect(() => {
        dispatch(fetchGetCategory());
    }, [dispatch]);

    // Загружаем товары при наведении (десктоп) или выборе (мобилка)
    useEffect(() => {
        const id = hoveredCatId || selectedMobileCat;
        if (id) {
            dispatch(fetchGetProducts({ category: id }));
        }
    }, [hoveredCatId, selectedMobileCat, dispatch]);

    // Только корневые категории (без parent)
    const rootCategories = categories.filter((cat: any) => !cat.parent);

    // Мега-меню для десктопа
    const getMegaOverlay = (catId: number, catName: string) => (
        <div
            className={styles.dropdownOverlay}
            onMouseEnter={() => setHoveredCatId(catId)}
            onMouseLeave={() => setHoveredCatId(null)}
        >
            <div className={styles.title}>{catName}</div>

            {loadingProducts ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <Spin size="large" />
                </div>
            ) : !products || products?.length === 0 ? (
                <Text type="secondary">Товаров пока нет</Text>
            ) : (
                <div className={styles.productsGrid}>
                    {products?.slice(0, 8).map((product: any) => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.imageWrapper}>
                                <img src={product.main_image} alt={product.name} />
                            </div>
                            <div className={styles.name}>{product.name}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span className={styles.price}>{product.price} сом</span>
                                {!product.in_stock && (
                                    <span className={styles.outOfStock}>Нет в наличии</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const desktopMenu = (
        <div className={styles.desktopMenu}>
            <Menu mode="horizontal" style={{ border: "none", background: "transparent" }}>
                {rootCategories.map((cat: any) => (
                    <Menu.Item key={cat.id}>
                        <Dropdown
                            overlay={getMegaOverlay(cat.id, cat.name)}
                            trigger={["hover"]}
                            placement="bottomLeft"
                            overlayClassName={styles.megaDropdown}
                            getPopupContainer={() => document.body}
                        >
                            <span style={{ fontWeight: 500, cursor: "pointer" }}>{cat.name}</span>
                        </Dropdown>
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    );

    // Мобильная версия
    const mobileMenu = (
        <>
            <div className={styles.mobileTrigger}>
                <MenuOutlined onClick={() => setMobileVisible(true)} />
            </div>

            <Drawer
                title="Каталог товаров"
                placement="left"
                open={mobileVisible}
                onClose={() => {
                    setMobileVisible(false);
                    setSelectedMobileCat(null);
                }}
                width={320}
                className={styles.mobileDrawer}
            >
                <Menu
                    mode="inline"
                    selectedKeys={selectedMobileCat ? [String(selectedMobileCat)] : []}
                    className={styles.categoryList}
                >
                    {rootCategories.map((cat: any) => (
                        <Menu.Item key={cat.id} onClick={() => setSelectedMobileCat(cat.id)}>
                            {cat.name}
                        </Menu.Item>
                    ))}
                </Menu>

                {selectedMobileCat && (
                    <div className={styles.mobileProducts}>
                        <div className={styles.sectionTitle}>
                            {rootCategories.find((c: any) => c.id === selectedMobileCat)?.name}
                        </div>

                        {loadingProducts ? (
                            <Spin />
                        ) : (
                            products?.slice(0, 10).map((p: any) => (
                                <div key={p.id} className={styles.mobileProduct}>
                                    <img src={p.main_image} alt={p.name} />
                                    <div className={styles.info}>
                                        <div className={styles.name}>{p.name}</div>
                                        <div className={styles.price}>{p.price} сом</div>
                                        {!p.in_stock && <Badge status="error" text="Нет в наличии" />}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </Drawer>
        </>
    );

    return (
        <div className={styles.menuContainer}>
            <div className="max-w-7xl mx-auto px-4">
                {desktopMenu}
                {mobileMenu}
            </div>
        </div>
    );
};

export default CategoryMegaMenu;
