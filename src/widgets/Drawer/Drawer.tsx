/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Drawer, Tree, Card, Image, Typography, Row, Col } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategoryTree, fetchGetProducts } from "@/store/slices/productsSlice";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader/Loader";

const { Title, Text } = Typography;

interface PreviewProduct {
    id: number;
    name: string;
    price: string;
    main_image: string;
    in_stock: boolean;
}

const CategoryDrawer: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { categoryTree, categoryTreeLoading } = useAppSelector((state) => state.products);

    const [open, setOpen] = useState(false);
    const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(null);
    const [previewProducts, setPreviewProducts] = useState<PreviewProduct[]>([]);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);

    useEffect(() => {
        if (open && categoryTree.length === 0) {
            dispatch(fetchCategoryTree());
        }
    }, [open, dispatch, categoryTree.length]);

    // Наведение — грузим превью товаров
    const handleHover = async (categoryId: number) => {
        if (hoveredCategoryId === categoryId) return;

        setIsLoadingPreview(true);
        setHoveredCategoryId(categoryId);

        try {
            const res = await dispatch(fetchGetProducts({ category: categoryId, limit: 8 })).unwrap();
            setPreviewProducts(res.slice(0, 8));
        } catch (err) {
            console.error(err);
            setPreviewProducts([]);
        } finally {
            setIsLoadingPreview(false);
        }
    };

    const handleMouseLeave = () => {
        setHoveredCategoryId(null);
        setPreviewProducts([]);
    };

    const handleSelect = (selectedKeys: React.Key[]) => {
        if (selectedKeys.length > 0) {
            const categoryId = Number(selectedKeys[selectedKeys.length - 1]);
            dispatch(fetchGetProducts({ category: categoryId }));
            setOpen(false);
        }
    };

    const handleShowAll = () => {
        dispatch(fetchGetProducts({}));
        setOpen(false);
    };

    const handleProductClick = (productId: number) => {
        navigate(`/catalog/${productId}`);
        setOpen(false);
    };

    return (
        <>
            {/* Кнопка открытия */}
            <div
                onClick={() => setOpen(true)}
                style={{
                    cursor: "pointer",
                    padding: "12px 20px",
                    background: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontWeight: 600,
                    fontSize: 16,
                }}
            >
                <MenuOutlined style={{ fontSize: 22 }} />
            </div>

            {/* Drawer */}
            <Drawer
                placement="left"
                width={hoveredCategoryId ? 850 : 320}
                open={open}
                onClose={() => setOpen(false)}
                closeIcon={<CloseOutlined style={{ fontSize: 18 }} />}
                headerStyle={{ borderBottom: "none" }}
                bodyStyle={{ padding: 0, display: "flex", height: "100%" }}
            >
                {/* Левая часть — категории */}
                <div style={{ width: 320, borderRight: "1px solid #f0f0f0", padding: "16px 0" }}>
                    <div
                        onClick={handleShowAll}
                        onMouseEnter={() => setHoveredCategoryId(null)}
                        style={{
                            padding: "12px 24px",
                            cursor: "pointer",
                            fontWeight: 600,
                            color: "#1890ff",
                            borderBottom: "1px solid #f0f0f0",
                        }}
                    >
                        Все товары
                    </div>

                    {categoryTreeLoading ? (
                        <div style={{ padding: 40, textAlign: "center" }}>
                            <Loader />
                        </div>
                    ) : (
                        <Tree
                            treeData={categoryTree}
                            defaultExpandAll
                            onSelect={handleSelect}
                            selectable={true}
                            onMouseEnter={(info) => {
                                const node = info.node as any;
                                if (node.key) handleHover(Number(node.key));
                            }}
                            titleRender={(node: any) => (
                                <div
                                    style={{
                                        padding: "8px 0",
                                        fontSize: 15,
                                        fontWeight: hoveredCategoryId === Number(node.key) ? 600 : 400,
                                        color: hoveredCategoryId === Number(node.key) ? "#1890ff" : "inherit",
                                    }}
                                >
                                    {node.title}
                                </div>
                            )}
                        />
                    )}
                </div>

                {/* Правая часть — превью товаров */}
                <div
                    style={{
                        flex: 1,
                        padding: 24,
                        background: "#fafafa",
                        overflowY: "auto",
                    }}
                    onMouseLeave={handleMouseLeave}
                >
                    {isLoadingPreview ? (
                        <div style={{ textAlign: "center", paddingTop: 100 }}>
                            <Loader />
                        </div>
                    ) : previewProducts.length > 0 ? (
                        <>
                            <Title level={5} style={{ marginBottom: 16, color: "#333" }}>
                                Товары в категории
                            </Title>
                            <Row gutter={[16, 24]}>
                                {previewProducts.map((product) => (
                                    <Col span={12} key={product.id}>
                                        <Card
                                            hoverable
                                            onClick={() => handleProductClick(product.id)} // ← ВОТ ТУТ ПЕРЕХОД!
                                            style={{ cursor: "pointer" }}
                                            cover={
                                                <Image
                                                    src={product.main_image}
                                                    alt={product.name}
                                                    style={{ height: 180, objectFit: "cover" }}
                                                    preview={false}
                                                />
                                            }
                                            bodyStyle={{ padding: 12 }}
                                        >
                                            <Text
                                                strong
                                                style={{
                                                    fontSize: 14,
                                                    display: "block",
                                                    marginBottom: 6,
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {product.name.length > 50
                                                    ? `${product.name.substring(0, 50)}...`
                                                    : product.name}
                                            </Text>
                                            <Text type="danger" strong style={{ fontSize: 16 }}>
                                                {product.price} сом
                                            </Text>
                                            {!product.in_stock && (
                                                <Text
                                                    type="secondary"
                                                    style={{ fontSize: 12, display: "block" }}
                                                >
                                                    Нет в наличии
                                                </Text>
                                            )}
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    ) : hoveredCategoryId ? (
                        <div style={{ textAlign: "center", color: "#999", paddingTop: 100 }}>
                            Товары не найдены
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", color: "#aaa", paddingTop: 100, fontSize: 16 }}>
                            Наведите на категорию
                        </div>
                    )}
                </div>
            </Drawer>
        </>
    );
};

export default CategoryDrawer;
