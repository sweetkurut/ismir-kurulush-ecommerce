import s from "./style.module.scss";

export const SkeletonSimilarCard = () => {
  return (
    <div className={s.card}>
      <div className={s.image}></div>

      <div className={s.textBlock}>
        <div className={s.title}></div>
        <div className={s.price}></div>
      </div>
    </div>
  );
};
