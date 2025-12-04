import s from "./style.module.scss";
import phoneIcon from "@/shared/assets/icons/phone.svg";
import mailIcon from "@/shared/assets/icons/mail.svg";
import locationIcon from "@/shared/assets/icons/location.svg";

import logo from "@/shared/assets/images/logo.svg";
import { FaInstagram } from "react-icons/fa";

const infoLinks = [
    { title: "О компании", href: "#" },
    { title: "Доставка и оплата", href: "#" },
    { title: "Гарантии и возврат", href: "#" },
    { title: "Контакты", href: "#" },
];

const catalogLinks = [
    { title: "Арматура", href: "#" },
    { title: "Металлопрокат", href: "#" },
    { title: "Пиломатериалы", href: "#" },
    { title: "Все категории", href: "#" },
];

const contactsData = [
    { icon: phoneIcon, text: "+7 (000) XXX-XX-XX", isLink: true, href: "tel:+7000xxxxxxx" },
    { icon: mailIcon, text: "info@ismirkurulush.ru", isLink: true, href: "mailto:info@ismirkurulush.ru" },
    { icon: locationIcon, text: "г. Москва, ул. Призерная, д. 123", isLink: false },
];

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={s.wrapper}>
            <div className={s.container}>
                <div className={s.main_content}>
                    <div className={s.col_logo}>
                        <img
                            src={logo}
                            alt="logo"
                            className={s.logo_title}
                            loading="eager"
                            decoding="async"
                        />
                        <p className={s.logo_desc}>Надежный поставщик качественных строительных материалов</p>

                        <a href="#" target="_blank" aria-label="Instagram link" className={s.social_btn}>
                            <FaInstagram />
                        </a>
                    </div>

                    <div className={s.col}>
                        <h4 className={s.col_title}>Информация</h4>
                        <nav className={s.nav_list}>
                            {infoLinks.map((link, index) => (
                                <a key={index} href={link.href} className={s.nav_link}>
                                    {link.title}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className={s.col}>
                        <h4 className={s.col_title}>Каталог</h4>
                        <nav className={s.nav_list}>
                            {catalogLinks.map((link, index) => (
                                <a key={index} href={link.href} className={s.nav_link}>
                                    {link.title}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className={s.col}>
                        <h4 className={s.col_title}>Контакты</h4>
                        <div className={s.contacts_list}>
                            {contactsData.map((item, index) => (
                                <div key={index} className={s.contact_item}>
                                    <img
                                        src={item.icon}
                                        alt="Icon"
                                        className={s.contact_icon}
                                        loading="eager"
                                        decoding="async"
                                    />
                                    {item.isLink ? (
                                        <a href={item.href} className={s.contact_link}>
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className={s.contact_text}>{item.text}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <hr className={s.divider} />

                <div className={s.copyright}>© {currentYear} Ismir Kurulush. Все права защищены.</div>
            </div>
        </footer>
    );
};
