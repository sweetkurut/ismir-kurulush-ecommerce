import { products } from "@/pages/CatalogPage/data";
import s from "./style.module.scss";
import { Card } from "@/widgets/Cards/Cards";

export const FavoritesContent = () => {
    return (
        <div className={s.tabContentFavorites}>
            <div className={s.cards_grid}>
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};
