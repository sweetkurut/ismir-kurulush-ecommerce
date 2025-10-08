import s from "./style.module.scss";
import support from "@/shared/assets/icons/support.svg";

const cardData = [
    { id: 1, icon: support, title: "Арматура", alt: "Support Icon" },
    { id: 2, icon: support, title: "Металлопрокат", alt: "Support Icon" },
    {
        id: 3,
        icon: support,
        title: `Пиломатериалы, ОСП, ДСП,
Фанера`,
        alt: "Support Icon",
    },
    { id: 4, icon: support, title: "Металлоконструкции", alt: "Support Icon" },
    { id: 5, icon: support, title: "Производство сетки МАК", alt: "Support Icon" },
    { id: 6, icon: support, title: "Заборная сетка", alt: "Support Icon" },
    { id: 7, icon: support, title: "Гипсокартон и комплектующие", alt: "Support Icon" },
    {
        id: 8,
        icon: support,
        title: `Утеплитель и изоляцияа`,
        alt: "Support Icon",
    },
    { id: 9, icon: support, title: "Сухие строительные смеси", alt: "Support Icon" },
    { id: 10, icon: support, title: "Лакокрасочные материалы", alt: "Support Icon" },
    { id: 9, icon: support, title: "Сухие строительные смеси", alt: "Support Icon" },
    { id: 10, icon: support, title: "Лакокрасочные материалы", alt: "Support Icon" },
    { id: 10, icon: support, title: "Лакокрасочные материалы", alt: "Support Icon" },
];

export const CategoryCards = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <h2 className={s.title}>Категории товаров</h2>

                <div className={s.cards}>
                    {/* 2. Use the map() method to render the cards */}
                    {cardData.map((card) => (
                        <div key={card.id} className={s.card}>
                            <div className={s.card_img_wrap}>
                                {/* Use the data from the current object in the array */}
                                <img src={card.icon} alt={card.alt} />
                            </div>
                            <div className={s.card_desc}>
                                {/* Use the data from the current object in the array */}
                                <h3 className={s.card_title}>{card.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
