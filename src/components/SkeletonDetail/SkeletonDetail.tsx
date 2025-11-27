import s from "./style.module.scss";

export const SkeletonDetail = () => {
  return (
    <div className={s.skeleton_page}>
      <div className={s.skeleton_container}>
        <div className={s.skeleton_mainContent}>

          {/* Левая часть (картинки) */}
          <div className={s.skeleton_imageSection}>
            <div className={s.skeleton_mainImage}></div>

            <div className={s.skeleton_thumbnails}>
              <div className={s.skeleton_thumbnail}></div>
              <div className={s.skeleton_thumbnail}></div>
              <div className={s.skeleton_thumbnail}></div>
            </div>
          </div>

          {/* Правая часть (информация) */}
          <div className={s.skeleton_infoSection}>
            <div className={s.skeleton_badge}></div>

            <div className={s.skeleton_title}></div>

            <div className={s.skeleton_price}></div>

            <div className={s.skeleton_actions}>
              <div className={s.skeleton_qty}></div>
              <div className={s.skeleton_btn}></div>
              <div className={s.skeleton_fav}></div>
            </div>

            <div className={s.skeleton_delivery}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
