import { useEffect, useState } from "react";
import s from "./style.module.scss";
import { TiArrowLeft } from "react-icons/ti";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { Card } from "@/widgets/Cards/Cards";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetDetailProducts } from "@/store/slices/productsSlice";

export const DetailCatalogPage = () => {
    const [activeTab, setActiveTab] = useState("description");
    const [quantity, setQuantity] = useState(1);
    const nav = useNavigate();

    const [activeImage, setActiveImage] = useState<string | undefined>(undefined);

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { loading, product } = useAppSelector((state) => state.products);
    // const mainImage = product?.images?.[0]?.image;

    useEffect(() => {
        if (id) dispatch(fetchGetDetailProducts(Number(id)));
    }, [id, dispatch]);

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setActiveImage(product.images[0].image);
        }
    }, [product]);

    const handleBack = () => {
        nav("/catalog");
    };

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    if (loading) {
        return <div className={s.loader}>Загрузка...</div>;
    }

    if (!product) {
        return <div className={s.notFound}>Товар не найден</div>;
    }

    return (
        <div className={s.page}>
            <div className={s.container}>
                <span className={s.backLink} onClick={handleBack}>
                    <TiArrowLeft /> Вернуться к каталогу
                </span>

                <div className={s.mainContent}>
                    <div className={s.imageSection}>
                        {activeImage && <img src={activeImage} alt={product.name} className={s.mainImage} />}

                        <div className={s.thumbnails}>
                            {product.images?.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.image}
                                    alt={img.alt}
                                    className={`${s.thumbnail} ${
                                        img.image === activeImage ? s.activeThumbnail : ""
                                    }`}
                                    onClick={() => setActiveImage(img.image)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={s.infoSection}>
                        {product.quantity > 0 ? (
                            <div className={s.badge}>В наличии</div>
                        ) : (
                            <div className={s.badge_out}>Нет в наличии</div>
                        )}

                        <h1 className={s.productTitle}>{product?.name}</h1>

                        <div className={s.priceBlock}>
                            <span className={s.currentPrice}>
                                {parseFloat(product.price).toLocaleString("ru-RU")} {product.currency}
                            </span>
                        </div>

                        <div className={s.tabs}>
                            <div
                                className={`${s.tab} ${activeTab === "description" ? s.active : ""}`}
                                onClick={() => setActiveTab("description")}
                            >
                                Описание
                            </div>
                            <div
                                className={`${s.tab} ${activeTab === "characteristics" ? s.active : ""}`}
                                onClick={() => setActiveTab("characteristics")}
                            >
                                Характеристики
                            </div>
                        </div>

                        <div className={s.tabContent}>
                            {activeTab === "description" && (
                                <p className={s.productDescription}>{product.description}</p>
                            )}

                            {activeTab === "characteristics" && (
                                <ul className={s.specList}>
                                    <li className={s.specItem}>
                                        <span className={s.specLabel}>Бренд</span>
                                        <span>{product.brand?.name ?? "—"}</span>
                                    </li>
                                    <li className={s.specItem}>
                                        <span className={s.specLabel}>Категория</span>
                                        <span>{product.categories[0]?.name}</span>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <div className={s.actionBlock}>
                            <div className={s.quantityControl}>
                                <button className={s.qtyButton} onClick={decreaseQuantity}>
                                    −
                                </button>
                                <input disabled className={s.qtyInput} value={quantity} />
                                <button className={s.qtyButton} onClick={increaseQuantity}>
                                    +
                                </button>
                            </div>

                            <button className={s.addButton}>
                                <FiShoppingCart /> Добавить в корзину
                            </button>

                            <button className={s.heartButton}>
                                <FaRegHeart className={s.btn_heart} />
                            </button>
                        </div>

                        <div className={s.deliveryInfo}>
                            <span>Доставка по Кыргызстану — 1–2 дня</span>
                            <span>Гарантия качества</span>
                        </div>
                    </div>
                </div>
            </div>

            {product?.similar?.length > 0 && (
                <div className={s.same_tovar}>
                    <h2 className={s.title_cards}>Похожие товары</h2>
                    <div className={s.cards_grid}>
                        {product.similar?.map((similar) => (
                            <Card key={similar.id} product={similar} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
