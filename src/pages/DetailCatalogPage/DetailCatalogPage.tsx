import { useState } from "react";
import s from "./style.module.scss";
import { TiArrowLeft } from "react-icons/ti";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";

// Упрощенные данные для контента
const productData = {
    title: "Арматура № 06 АIII в Бишкеке",
    location: "",
    price: 90,
    oldPrice: 120,
    discount: 25, // Обновил скидку для соответствия ценам (90/120 = 0.75)
    description:
        "Арматура А-I, А500 (РОССИЯ — Челябинск, ЗАПСИБ, НСМК) ГОСТ 5781-82 — широко применяется для изготовления самого широкого спектра конструкций из железобетона. При этом строительная арматура А-III (арматура рифленная) значительно повышает прочность характеристики такого изделия. Использование арматуры повышает общую надежность и долговечность строительных конструкций.",
    specs: [
        { label: "Диаметр", value: "6 мм" },
        { label: "Класс", value: "АIII" },
        { label: "Длина", value: "11,7 м" },
        { label: "Вес бухты", value: "850 кг (+/- 5%)" },
        { label: "Вес 1 м", value: "0,4 кг (+/- 5%)" },
        { label: "Страна-производитель", value: "Россия" },
    ],
};

export const DetailCatalogPage = () => {
    const [activeTab, setActiveTab] = useState("description");
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className={s.page}>
            <div className={s.container}>
                <a href="#" className={s.backLink}>
                    <TiArrowLeft />
                    Вернуться к каталогу
                </a>

                <div className={s.mainContent}>
                    <div className={s.imageSection}>
                        <div className={s.mainImagePlaceholder}></div>

                        <div className={s.thumbnails}>
                            <div className={s.thumbnailPlaceholder} />
                            <div className={s.thumbnailPlaceholder} />
                            <div className={s.thumbnailPlaceholder} />
                        </div>
                    </div>

                    <div className={s.infoSection}>
                        <div className={s.badge}>В наличии</div>

                        <h1 className={s.productTitle}>{productData.title}</h1>
                        <p className={s.location}>{productData.location}</p>

                        <div className={s.priceBlock}>
                            <span className={s.currentPrice}>{productData.price} сом/кг</span>
                            <span className={s.oldPrice}>{productData.oldPrice} сом</span>
                        </div>
                        <p className={s.discount}>Скидка {productData.discount}%</p>

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
                                <p className={s.productDescription}>{productData.description}</p>
                            )}
                            {activeTab === "characteristics" && (
                                <ul className={s.specList}>
                                    {productData.specs.map((spec, index) => (
                                        <li key={index} className={s.specItem}>
                                            <span className={s.specLabel}>{spec.label}</span>
                                            <span>{spec.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className={s.actionBlock}>
                            <div className={s.quantityControl}>
                                <button className={s.qtyButton} onClick={decreaseQuantity}>
                                    −
                                </button>
                                <input
                                    // type="number"
                                    disabled
                                    className={s.qtyInput}
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min="1"
                                />
                                <button className={s.qtyButton} onClick={increaseQuantity}>
                                    +
                                </button>
                            </div>
                            <button className={s.addButton}>
                                <FiShoppingCart /> Добавить в корзину
                            </button>
                            <button className={s.heartButton} aria-label="Добавить в избранное">
                                <FaRegHeart className={s.btn_heart} />
                            </button>
                        </div>

                        <div className={s.deliveryInfo}>
                            <span>Доставка по Кыргызстану - 1-2 дня</span>
                            <span>Гарантия качества</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
