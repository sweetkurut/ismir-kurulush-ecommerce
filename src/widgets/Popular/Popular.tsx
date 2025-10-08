import { FiArrowRight } from "react-icons/fi";
import { Card } from "../Cards/Cards";
import s from "./style.module.scss";

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

export const Popular = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.titles_btn}>
                    <h2 className={s.title}>Полулярные товары</h2>
                    <button className={s.btn_all}>
                        Смотреть все <FiArrowRight className={s.icon} />
                    </button>
                </div>
                <div className={s.cards_grid}>
                    {products.map((product) => (
                        <Card key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};
