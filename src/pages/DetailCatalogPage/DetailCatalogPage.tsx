import { useState } from "react";
import s from "./style.module.scss";
import { TiArrowLeft } from "react-icons/ti";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { Card } from "@/widgets/Cards/Cards";
import { useNavigate } from "react-router-dom";

const productData = {
    title: "Арматура № 06 АIII в Бишкеке",
    location: "",
    price: 90,
    oldPrice: 120,
    discount: 25,
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

const products = [
    {
        id: 1,
        category: "Производство сетки MAK",
        title: "Сетка MAK 4 на 4",
        price: 3000,
        image: "https://placehold.co/400x400/eaeaea/eaeaea",
    },
    {
        id: 2,
        category: "Арматура",
        title: "Анкерная шайба АШХ-3 (18)",
        price: 200,
        image: "https://placehold.co/400x400/eaeaea/eaeaea",
    },
    {
        id: 3,
        category: "Водопровод и канализация",
        title: "Американка муфта 20х1/2",
        price: 150,
        image: "https://placehold.co/400x400/eaeaea/eaeaea",
    },
    {
        id: 4,
        category: "Лакокрасочные материалы",
        title: "Краска водоэмульсионная белая",
        price: 3000,
        image: "https://placehold.co/400x400/eaeaea/eaeaea",
    },
];

export const DetailCatalogPage = () => {
    const [activeTab, setActiveTab] = useState("description");
    const [quantity, setQuantity] = useState(1);
    const nav = useNavigate();

    const handleBack = () => {
        nav("/catalog");
    };

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
                <a href="#" className={s.backLink} onClick={handleBack}>
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
            <div className={s.same_tovar}>
                <h2 className={s.title_cards}>Похожие товары</h2>
                <div className={s.cards_grid}>
                    {products.map((product) => (
                        <Card key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};
