import { useAppDispatch, useAppSelector } from "@/store/hooks";
import s from "./style.module.scss";
import support from "@/shared/assets/icons/support.svg";
import { useEffect } from "react";
import { fetchGetCategory } from "@/store/slices/categoriesSlice";
import { SkeletonCategoryCard } from "@/components/SkeletonCategoryCard/SkeletonCategoryCard";

export const CategoryCards = () => {
    const dispatch = useAppDispatch();
    const skeletonCount = 6;

    const { loading, category } = useAppSelector((state) => state.category);

    console.log(category, "категории");

    useEffect(() => {
        dispatch(fetchGetCategory());
    }, [dispatch]);

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <h2 className={s.title}>Категории товаров</h2>

                <div className={s.cards}>
                    {loading
                        ? [...Array(skeletonCount)].map((_, i) => <SkeletonCategoryCard key={i} />)
                        : category?.map((card) => (
                              <div key={card.id} className={s.card}>
                                  <div className={s.card_img_wrap}>
                                      <img src={support} alt="Иконка" loading="lazy" decoding="async" />
                                  </div>
                                  <div className={s.card_desc}>
                                      <h3 className={s.card_title}>{card.name}</h3>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCards;  
