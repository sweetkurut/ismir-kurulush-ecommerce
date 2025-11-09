import { useAppDispatch, useAppSelector } from "@/store/hooks";
import s from "./style.module.scss";
import support from "@/shared/assets/icons/support.svg";
import { useEffect } from "react";
import { fetchGetCategory } from "@/store/slices/categoriesSlice";

export const CategoryCards = () => {
    const dispatch = useAppDispatch();

    const { loading, error, category } = useAppSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchGetCategory());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <h2 className={s.title}>Категории товаров</h2>
                {category?.results?.length === 0 && <p>Нет категорий</p>}

                <div className={s.cards}>
                    {category?.results.map((card) => (
                        <div key={card.id} className={s.card}>
                            <div className={s.card_img_wrap}>
                                <img src={support} alt="Иконка" />
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
