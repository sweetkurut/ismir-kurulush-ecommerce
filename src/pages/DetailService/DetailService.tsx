import s from "./style.module.scss";
import check from "@/shared/assets/icons/checkicon.svg";
import dollar from "@/shared/assets/icons/dollar.svg";
import time from "@/shared/assets/icons/time.svg";

const serviceData = {
    title: "Резка металла на заказ",
    description:
        "Наше предприятие оснащено современными станками лазерной и плазменной резки, что позволяет выполнять работы любой сложности с высокой точностью и скоростью.",
    possibilities: [
        "Толщина металла до 30 мм",
        "Высокая точность резки (±0.1 мм)",
        "Резка сложных контуров",
        "Работа с различными металлами",
        "Минимальные заусенцы",
    ],
    advantages: [
        "Высокое качество кромки",
        "Быстрое выполнение заказов",
        "Возможность работы по чертежам",
        "Экономия материала",
    ],
    process: [
        "Получение чертежей или эскизов",
        "Программирование станка",
        "Резка металла",
        "Контроль геометрии",
        "Упаковка и выдача",
    ],
};

const consultationData = {
    cost: "от 15 сом/м.п.",
    deadline: "от 1 рабочего дня",
};

export const DetailService = () => {
    return (
        <>
            <div className={s.banner}>
                <h2 className={s.main_title}>Лазерная и плазменная резка металла</h2>
                <p className={s.main_desc}>
                    Высокоточная резка металла с использованием современного оборудования
                </p>
            </div>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <div className={s.mainContent}>
                        <div className={s.section}>
                            <h2 className={s.sectionTitle}>Описание</h2>
                            <p className={s.descriptionText}>{serviceData.description}</p>
                        </div>

                        <div className={s.section}>
                            <h2 className={s.sectionTitle}>Возможности</h2>
                            <ul className={s.list}>
                                {serviceData.possibilities.map((item, index) => (
                                    <li key={index} className={s.listItem}>
                                        <img src={check} alt="Check Icon" className={s.checkIcon} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={s.section}>
                            <h2 className={s.sectionTitle}>Преимущества</h2>
                            <ul className={s.list}>
                                {serviceData.advantages.map((item, index) => (
                                    <li key={index} className={s.listItem}>
                                        <img src={check} alt="Check Icon" className={s.checkIcon} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={s.section}>
                            <h2 className={s.sectionTitle}>Процесс работы</h2>
                            <ul className={s.processList}>
                                {serviceData.process.map((item, index) => (
                                    <li key={index} className={s.processItem}>
                                        <span className={s.processStep}>{index + 1}</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={s.sidebar}>
                        <form className={s.consultationForm}>
                            <div className={s.costBlock}>
                                <div className={s.costItem}>
                                    <img src={dollar} alt="Dollar Icon" className={s.costItemIcon} />
                                    Стоимость <span className={s.value}>{consultationData.cost}</span>
                                </div>
                                <div className={s.costItem}>
                                    <img src={time} alt="Time Icon" className={s.costItemIcon} />
                                    Срок выполнения{" "}
                                    <span className={s.value}>{consultationData.deadline}</span>
                                </div>
                            </div>

                            <div className={s.formGroup}>
                                <label htmlFor="name" className={s.formLabel}>
                                    Имя *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className={s.formInput}
                                    placeholder="Введите ваше имя"
                                    required
                                />
                            </div>

                            <div className={s.formGroup}>
                                <label htmlFor="phone" className={s.formLabel}>
                                    Телефон *
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className={s.formInput}
                                    placeholder="+993 ХХ-ХХ-ХХ-ХХ"
                                    required
                                />
                            </div>

                            <div className={s.formGroup}>
                                <label htmlFor="email" className={s.formLabel}>
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className={s.formInput}
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className={s.formGroup}>
                                <label htmlFor="message" className={s.formLabel}>
                                    Сообщение *
                                </label>
                                <textarea
                                    id="message"
                                    className={s.formTextarea}
                                    placeholder="Опишите детали вашей заявки..."
                                    required
                                />
                            </div>

                            <label className={s.checkboxLabel}>
                                <input type="checkbox" className={s.checkboxInput} required />Я согласен на
                                обработку персональных данных
                            </label>

                            <button type="submit" className={s.submitButton}>
                                Получить консультацию
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
