import { useState } from "react";
import { updateCartItem, removeCartItem } from "@/store/slices/cartSlice";
import { FaRegTrashAlt, FaExclamationTriangle } from "react-icons/fa";
import s from "./style.module.scss";
import type { CartItem } from "@/store/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { memo } from "react";
import { Modal } from "@/components/Modal/Modal";

interface BasketItemCardProps {
    cartItem: CartItem;
}

export const BasketItemCard = memo(({ cartItem }: BasketItemCardProps) => {
    const dispatch = useAppDispatch();
    const { addLoading } = useAppSelector((state) => state.cart);
    const { product, quantity, total_price, id: cartItemId } = cartItem;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        dispatch(updateCartItem({ item_id: cartItemId, quantity: newQuantity }));
    };

    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => !deleteLoading && setShowDeleteModal(false);

    const handleConfirmDelete = async () => {
        setDeleteLoading(true);
        await dispatch(removeCartItem({ item_id: cartItemId }));
        setDeleteLoading(false);
        setShowDeleteModal(false);
    };

    const total = Number(total_price);

    return (
        <>
            <div className={s.basketItem}>
                <div className={s.itemImage}>
                    <img
                        src={product.main_image || "/placeholder.jpg"}
                        alt={product.name}
                        onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                        className={s.itemImage}
                    />
                </div>

                <div className={s.itemContent}>
                    <div className={s.itemName}>{product.name}</div>

                    <div className={s.controls}>
                        <div className={s.quantityControl}>
                            <button
                                className={s.qtyButton}
                                onClick={() => handleQuantityChange(quantity - 1)}
                                disabled={addLoading || quantity <= 1}
                            >
                                −
                            </button>
                            <input disabled className={s.qtyInput} value={quantity} readOnly />
                            <button
                                className={s.qtyButton}
                                onClick={() => handleQuantityChange(quantity + 1)}
                                disabled={addLoading}
                            >
                                +
                            </button>
                        </div>

                        <span className={s.itemPrice}>{total.toLocaleString()} сом</span>
                    </div>
                </div>

                <div onClick={openDeleteModal} className={s.icon_delete}>
                    <FaRegTrashAlt className={s.icon_delete} />
                </div>
            </div>

            <Modal isOpen={showDeleteModal} onClose={closeDeleteModal} title="Удалить товар?" size="sm">
                <div className={s.deleteModalContent}>
                    <div className={s.warningIcon}>
                        <FaExclamationTriangle />
                    </div>

                    <div className={s.warningText}>
                        <h4>Удалить товар из корзины?</h4>
                        <p>
                            <strong>"{product.name}"</strong>
                        </p>
                        <p>Это действие нельзя отменить.</p>
                    </div>

                    <div className={s.modalActions}>
                        <button
                            className={s.confirmDeleteBtn}
                            onClick={handleConfirmDelete}
                            disabled={deleteLoading}
                        >
                            {deleteLoading ? (
                                <>
                                    <div className={s.spinnerSmall}></div>
                                    Удаление...
                                </>
                            ) : (
                                "Да, удалить"
                            )}
                        </button>
                        <button
                            className={s.cancelDeleteBtn}
                            onClick={closeDeleteModal}
                            disabled={deleteLoading}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
});

BasketItemCard.displayName = "BasketItemCard";
