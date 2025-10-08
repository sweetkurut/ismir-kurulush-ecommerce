import { Filter } from "@/shared/ui/Filter/Filter";
import s from "./style.module.scss";
import { Card } from "@/widgets/Cards/Cards";

import { products } from "@/pages/CatalogPage/data";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { useState } from "react";

const ITEMS_PER_PAGE = 4;
const totalItems = products.length;
const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

export const CatalogPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = products.slice(startIndex, endIndex);

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.filter_wrap}>
                    <Filter />
                </div>

                <div className={s.catalog_wrap}>
                    <h2 className={s.title}>Каталог товаров</h2>
                    <div className={s.cards_grid}>
                        {currentProducts.map((product) => (
                            <Card key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </div>
    );
};
