import s from "./SkeletonCard.module.scss";

export const SkeletonCard = () => {
  return (
    <div className={s.card}>
      <div className={s.stock}></div>

      <div className={s.favorite}></div>

      <div className={s.image}></div>

      <div className={s.content}>
        <div className={s.category}></div>
        <div className={s.title}></div>
        <div className={s.price}></div>
        <div className={s.button}></div>
      </div>
    </div>
  );
};
