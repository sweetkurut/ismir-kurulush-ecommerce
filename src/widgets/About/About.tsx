import s from "./style.module.scss";
import experienceIcon from "@/shared/assets/icons/abouticon1.svg";
import clientsIcon from "@/shared/assets/icons/abouticon3.svg";
import qualityIcon from "@/shared/assets/icons/abouticon3.svg";
import supportIcon from "@/shared/assets/icons/abouticon4.svg";

const statsData = [
    {
        id: 1,
        icon: experienceIcon,
        value: "10+",
        description: "Лет на рынке",
        alt: "Иконка опыта",
    },
    {
        id: 2,
        icon: clientsIcon,
        value: "5000+",
        description: "Довольных клиентов",
        alt: "Иконка клиентов",
    },
    {
        id: 3,
        icon: qualityIcon,
        value: "100%",
        description: "Качественная продукция",
        alt: "Иконка качества",
    },
    {
        id: 4,
        icon: supportIcon,
        value: "24/7",
        description: "Поддержка клиентов",
        alt: "Иконка поддержки",
    },
];

export const About = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <h2 className={s.title}>О компании</h2>

                <div className={s.text_block}>
                    <p className={s.text}>
                        <strong className={s.company_name}>Ismir Kurulush</strong> — надежный поставщик
                        строительных материалов с многолетним опытом работы. Мы предлагаем широкий ассортимент
                        качественной продукции для профессиональных строителей и частных клиентов.
                    </p>
                </div>

                <div className={s.stats_grid}>
                    {statsData.map((stat) => (
                        <div key={stat.id} className={s.stat_card}>
                            <div className={s.icon_wrap}>
                                <img src={stat.icon} alt={stat.alt} className={s.icon} />
                            </div>
                            <p className={s.stat_value}>{stat.value}</p>
                            <p className={s.stat_desc}>{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
