import s from "./style.module.scss";
import qualityIcon from "@/shared/assets/icons/check.svg";
import deliveryIcon from "@/shared/assets/icons/card_icon1.svg";
import individualIcon from "@/shared/assets/icons/individual.svg";
import warrantyIcon from "@/shared/assets/icons/garanty.svg";
import priceIcon from "@/shared/assets/icons/abouticon3.svg";
import supportIcon from "@/shared/assets/icons/support.svg";

const reasonsData = [
    {
        id: 1,
        icon: qualityIcon,
        title: "Проверенное качество",
        description:
            "Работаем только с проверенными производителями. Каждая партия товара проходит контроль качества перед поступлением на склад.",
    },
    {
        id: 2,
        icon: deliveryIcon,
        title: "Оперативная доставка",
        description:
            "Собственный автопарк позволяет доставлять заказы точно в срок. Доставка по Ашхабаду за 1–2 дня, по регионам — 3–5 дней.",
    },
    {
        id: 3,
        icon: individualIcon,
        title: "Индивидуальный подход",
        description:
            "Персональный менеджер для каждого клиента. Помогаем с выбором материалов и расчетом необходимого количества.",
    },
    {
        id: 4,
        icon: warrantyIcon,
        title: "Гарантии и возврат",
        description:
            "Предоставляем гарантию на все товары. Возможность возврата в течение 14 дней при наличии заводского брака.",
    },
    {
        id: 5,
        icon: priceIcon,
        title: "Выгодные цены",
        description:
            "Прямые поставки от производителей без посредников. Система скидок для оптовых покупателей и постоянных клиентов.",
    },
    {
        id: 6,
        icon: supportIcon,
        title: "Поддержка 24/7",
        description:
            "Наша служба поддержки работает круглосуточно. Ответим на любые вопросы по телефону, в мессенджерах или онлайн-чате.",
    },
];

export const WhyUs = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <h2 className={s.main_title}>Почему выбирают нас</h2>
                <p className={s.subtitle}>
                    Мы создаем долгосрочные отношения с нашими клиентами, предлагая лучший <br /> сервис и
                    качество
                </p>

                <div className={s.cards_grid}>
                    {reasonsData.map((reason) => (
                        <div key={reason.id} className={s.card}>
                            <div className={s.icon_wrap}>
                                <img src={reason.icon} alt={reason.title} className={s.icon} />
                            </div>
                            <h3 className={s.card_title}>{reason.title}</h3>
                            <p className={s.card_desc}>{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
