import { ServiceCard } from "@/widgets/ServiceCard/ServiceCard";
import s from "./style.module.scss";
import settings from "@/shared/assets/icons/settings.svg";
import icon1 from "@/shared/assets/icons/service1.svg";
import icon2 from "@/shared/assets/icons/service2.svg";
import icon3 from "@/shared/assets/icons/service3.svg";
import icon4 from "@/shared/assets/icons/service4.svg";
import icon5 from "@/shared/assets/icons/service5.svg";
import icon6 from "@/shared/assets/icons/service6.svg";
import icon7 from "@/shared/assets/icons/service7.svg";
import icon8 from "@/shared/assets/icons/service8.svg";
import icon9 from "@/shared/assets/icons/service9.svg";

const services = [
    {
        icon: icon1,
        title: "Производство металлических ферм",
        description: "Изготовление металлических ферм любой сложности для строительных конструкций",
    },
    {
        icon: icon2,
        title: "Лазерная и плазменная резка металла",
        description: "Высокоточная резка металла с использованием современного оборудования",
    },
    {
        icon: icon3,
        title: "Гибка листового металла",
        description: "Профессиональная гибка листового металла по вашим размерам",
    },
    {
        icon: icon4,
        title: "Услуги проектировщика",
        description: "Разработка проектной документации и чертежей для металлоконструкций",
    },
    {
        icon: icon5,
        title: "Вальцовка листового металла",
        description: "Вальцевание металлических листов для создания цилиндрических изделий",
    },
    {
        icon: icon6,
        title: "Трубогиб",
        description: "Гибка труб различных диаметров под любым углом",
    },
    {
        icon: icon7,
        title: "Сварочные работы",
        description: "Качественная сварка металлоконструкций любой сложности",
    },
    {
        icon: icon8,
        title: "Профнастил",
        description: "Производство и монтаж профилированного настила для кровли и ограждений",
    },
    {
        icon: icon9,
        title: "Резка металлопроката",
        description: "Резка металлопроката на заготовки нужных размеров",
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
