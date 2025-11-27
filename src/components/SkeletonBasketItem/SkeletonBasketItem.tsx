import s from "./style.module.scss";

export const SkeletonBasketItem = () => {
  return (
    <div className={s.skeletonItem}>
      <div className={s.image} />

      <div className={s.content}>
        <div className={s.title} />

        <div className={s.bottomRow}>
          <div className={s.qty} />
          <div className={s.price} />
        </div>
      </div>

      <div className={s.deleteIcon} />
    </div>
  );
};
