import { FiArrowRight } from "react-icons/fi";
import { Card } from "../Cards/Cards";
import s from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchGetProducts } from "@/store/slices/productsSlice";
import { SkeletonCard } from "@/components/SkeletonCard/SkeletonCard";

export const Popular = () => {
    const nav = useNavigate();

    const dispatch = useAppDispatch();
    const { loading,  products } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchGetProducts());
    }, [dispatch]);

    const handleNav = () => {
        nav("/catalog");
    };

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.titles_btn}>
                    <h2 className={s.title}>Полулярные товары</h2>
                    <button className={s.btn_all} onClick={handleNav}>
                        Смотреть все <FiArrowRight className={s.icon} />
                    </button>
                </div>

                <div className={s.cards_grid}>
                    {loading
                        ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                        : products?.map((product) => (
                              <Card key={product.id} product={product} />
                          ))}
                </div>
            </div>
        </div>
    );
};
