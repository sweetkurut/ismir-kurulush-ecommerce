import { BsArrowRightShort } from "react-icons/bs";
import s from "./style.module.scss";
import auto from "@/shared/assets/icons/card_icon1.svg";
import garanty from "@/shared/assets/icons/garanty.svg";
import support from "@/shared/assets/icons/support.svg";
import { CategoryCards } from "@/widgets/CategoryCards/CategoryCards";
import { About } from "@/widgets/About/About";
import { Popular } from "@/widgets/Popular/Popular";
import { WhyUs } from "../WhyUs/WhyUs";
import { Consultation } from "@/widgets/Consultation/Consultation";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const nav = useNavigate();

    const handleNav = () => {
        nav("/feedback");
    };

    const goToCatalog = () => {
        nav("/catalog");
    };

    return (
        <>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <h1 className={s.title}>
                        Качественные <br /> строительные материалы
                    </h1>
                    <p className={s.subtitle}>
                        Широкий ассортимент продукции для строительства и ремонта. <br /> Выгодные цены,
                        быстрая доставка, профессиональная консультация.
                    </p>
                    <div className={s.btns_wrap}>
                        <button className={s.catalog_btn} onClick={goToCatalog}>
                            Каталог товаров <BsArrowRightShort className={s.arrow_icon} />
                        </button>
                        <button className={s.feedback_btn} onClick={handleNav}>
                            Оставить заявку
                        </button>
                    </div>
                </div>
            </div>
            <div className={s.cards_wrap}>
                <div className={s.cards}>
                    <div className={s.card}>
                        <div className={s.card_img_wrap}>
                            <img src={auto} alt="icon" />
                        </div>
                        <div className={s.card_desc}>
                            <h3 className={s.card_title}>Быстрая доставка</h3>
                            <p className={s.card_desc_p}>Доставим ваш заказ в течение 1-2 дней</p>
                        </div>
                    </div>
                    <div className={s.card}>
                        <div className={s.card_img_wrap}>
                            <img src={garanty} alt="icon" />
                        </div>
                        <div className={s.card_desc}>
                            <h3 className={s.card_title}>Гарантия качества</h3>
                            <p className={s.card_desc_p}>Все товары имеют сертификаты качества</p>
                        </div>
                    </div>
                    <div className={s.card}>
                        <div className={s.card_img_wrap}>
                            <img src={support} alt="icon" />
                        </div>
                        <div className={s.card_desc}>
                            <h3 className={s.card_title}>Поддержка 24/7</h3>
                            <p className={s.card_desc_p}>Наши специалисты всегда готовы помочь</p>
                        </div>
                    </div>
                </div>
            </div>
            <CategoryCards />
            <About />
            <Popular />
            <WhyUs />
            <Consultation />
        </>
    );
};
