import { useEffect, useState } from "react";
import s from "./MobileMenu.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { useAppSelector } from "@/store/hooks";
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
  const { cart } = useAppSelector((state) => state.cart);
  const totalItemsInCart = cart?.items.length ?? 0;

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
      {/* Кнопка бургера */}
      <button onClick={toggleMenu} className={s.burgerButton}>
        <span className={classNames(s.line, { [s.active]: isOpen })}></span>
        <span className={classNames(s.line, { [s.active]: isOpen })}></span>
        <span className={classNames(s.line, { [s.active]: isOpen })}></span>
      </button>

      {/* Выезжающее меню слева */}
      <div className={classNames(s.overlay, { [s.active]: isOpen })} onClick={toggleMenu} />

      <div className={classNames(s.menu, { [s.active]: isOpen })}>
        {/* <div className={s.menuHeader}>
          <AppLink to="/" onClick={() => setIsOpen(false)}>
            <img src={logo} alt="ISMIR KURULUSH" className={s.logo} />
          </AppLink>
          <button onClick={toggleMenu} className={s.closeButton}>
            ×
          </button>
        </div> */}

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

        {/* Иконки справа внизу меню */}
        {/* <div className={s.bottomIcons}>
          <AppLink to="/wishlist" className={s.iconLink} onClick={() => setIsOpen(false)}>
            <CiHeart />
            <span className={s.badge}>10</span>
          </AppLink>
          <AppLink to="/basket" className={s.iconLink} onClick={() => setIsOpen(false)}>
            <SlBasket />
            {totalItemsInCart > 0 && (
              <span className={s.badge}>
                {totalItemsInCart > 99 ? "99+" : totalItemsInCart}
              </span>
            )}
          </AppLink>
          <AppLink to="/profile" className={s.iconLink} onClick={() => setIsOpen(false)}>
            <CiUser />
          </AppLink>
        </div> */}
      </div>
    </>
  );
};