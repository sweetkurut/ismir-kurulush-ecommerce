import { useEffect, useState } from "react";
import s from "./MobileMenu.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { FaArrowRight } from "react-icons/fa";

const navItems = [
  { title: "Главная", to: "/" },
  { title: "Каталог", to: "/catalog" },
  { title: "Услуги", to: "/service" },
  { title: "Контакты", to: "/contacts" },
  { title: "Оставить заявку", to: "/feedback" },
];

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
 

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button onClick={toggleMenu} className={s.burgerButton}>
        <span className={classNames(s.line, { [s.active]: isOpen })}></span>
        <span className={classNames(s.line, { [s.active]: isOpen })}></span>
        <span className={classNames(s.line, { [s.active]: isOpen })}></span>
      </button>

      <div className={classNames(s.overlay, { [s.active]: isOpen })} onClick={toggleMenu} />

      <div className={classNames(s.menu, { [s.active]: isOpen })}>
       

        <nav className={s.nav}>
          {navItems.map((item) => (
            
             <AppLink
              key={item.title}
              to={item.to}
              className={s.navItem}
              activeClassName={s.navItem__active}
              onClick={() => setIsOpen(false)}
              >
              {item.title}
              <FaArrowRight/>
            </AppLink>
          ))}
        </nav>
      </div>
    </>
  );
};