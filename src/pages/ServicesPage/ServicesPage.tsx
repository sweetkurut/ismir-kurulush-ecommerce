import { ServiceCard } from "@/widgets/ServiceCard/ServiceCard";
import s from "./style.module.scss";
import settings from "@/shared/assets/icons/settings.svg";

const services = [
    {
        // icon: icon1,
        title: "Производство металлических ферм",
        description: "Изготовление металлических ферм любой сложности для строительных конструкций",
    },
    {
        // icon: icon2,
        title: "Лазерная и плазменная резка металла",
        description: "Высокоточная резка металла с использованием современного оборудования",
    },
    {
        // icon: icon3,
        title: "Гибка листового металла",
        description: "Профессиональная гибка листового металла по вашим размерам",
    },
    {
        // icon: icon1,
        title: "Производство металлических ферм",
        description: "Изготовление металлических ферм любой сложности для строительных конструкций",
    },
    {
        // icon: icon2,
        title: "Лазерная и плазменная резка металла",
        description: "Высокоточная резка металла с использованием современного оборудования",
    },
    {
        // icon: icon3,
        title: "Гибка листового металла",
        description: "Профессиональная гибка листового металла по вашим размерам",
    },
    {
        // icon: icon1,
        title: "Производство металлических ферм",
        description: "Изготовление металлических ферм любой сложности для строительных конструкций",
    },
    {
        // icon: icon2,
        title: "Лазерная и плазменная резка металла",
        description: "Высокоточная резка металла с использованием современного оборудования",
    },
    {
        // icon: icon3,
        title: "Гибка листового металла",
        description: "Профессиональная гибка листового металла по вашим размерам",
    },
    {
        // icon: icon1,
        title: "Производство металлических ферм",
        description: "Изготовление металлических ферм любой сложности для строительных конструкций",
    },
    {
        // icon: icon2,
        title: "Лазерная и плазменная резка металла",
        description: "Высокоточная резка металла с использованием современного оборудования",
    },
    {
        // icon: icon3,
        title: "Гибка листового металла",
        description: "Профессиональная гибка листового металла по вашим размерам",
    },
];

export const ServicesPage = () => {
    return (
        <div className={s.main_wrapper}>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <div className={s.icon_wrap}>
                        <img src={settings} alt="icon service" />
                    </div>

                    <h2 className={s.title}>Наши услуги</h2>
                    <p className={s.sub_title}>
                        Полный спектр услуг по обработке металла и производству металлоконструкций
                    </p>
                </div>
            </div>
            <div className={s.content}>
                <div className={s.grid}>
                    {services.map((item, i) => (
                        <ServiceCard key={i} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};
