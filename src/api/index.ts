/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
    AddToCartRequest,
    IFavorites,
    ILoginData,
    IOrderRequestList,
    IOrderRequestResponse,
    IOrderRequestTypes,
    IProfileUpdate,
    IProfileUpdatePassword,
    IResetPassword,
    ISetPassword,
    ISignUpEmail,
    IVerifyCode,
    RemoveCartItemRequest,
    UpdateCartItemRequest,
} from "@/store/types";
import instance from "./axiosInstance";

interface ProductQueryParams {
    page?: number;
    ordering?: string;
    [key: string]: any;
}

export const storesApi = {
    login(data: ILoginData) {
        return instance.post(`/users/signin/`, data);
    },
    signUp(data: ISignUpEmail) {
        return instance.post(`/users/signup/`, data);
    },
    verifyCode(data: IVerifyCode) {
        return instance.patch(`/users/verify-email/`, data);
    },
    setPassword(data: ISetPassword) {
        return instance.patch(`/users/set-password/`, data);
    },

    forgotPassword(data: ISignUpEmail) {
        return instance.post(`/users/forgot-password/`, data);
    },
    resetPassword(data: IResetPassword) {
        return instance.post(`/users/reset-password/`, data);
    },
    refreshToken: (refreshToken: string) => {
        return instance.post("/users/token/refresh/", {
            refresh: refreshToken,
        });
    },
    getProfile() {
        return instance.get(`/users/profile/`);
    },
    updateProfile(data: IProfileUpdate | { email: string }) {
        return instance.patch(`/users/profile/`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    updateNewEmail(data: { code: string }) {
        return instance.post(`/users/confirm-new-email/`, data);
    },

    updateProfilePassword(data: IProfileUpdatePassword) {
        return instance.put(`/users/change-password/`, data);
    },

    deleteProfile() {
        return instance.delete(`/users/profile/`);
    },

    // продукты, категории, бренды
    // getProducts() {
    //     return instance.get(`/catalog/products/`);
    // },
    getProducts(params: ProductQueryParams) {
        return instance.get(`/catalog/products/`, {
            params: params,
        });
    },
    getProductById(id: number) {
        return instance.get(`/catalog/products/${id}/`);
    },
    getCategories() {
        return instance.get(`/catalog/categories/`);
    },
    getBrands() {
        return instance.get(`/catalog/brands/`);
    },

    getSortingOptions() {
        return instance.get(`/catalog/sorting-options/`);
    },

    // избранные
    // getFavorites(): Promise<IFavorites[]> {
    //     return instance.get<IFavorites[]>(`favourites`).then((res) => res.data);
    // },

    getFavorites(): Promise<IFavorites> {
        return instance.get<IFavorites>(`favourites`).then((res) => res.data);
    },

    addFavorite(id: number) {
        return instance.post(`favourites/toggle/${id}/`);
    },

    // заказы/заявки
    // create
    addReqOrder(data: IOrderRequestResponse) {
        return instance.post(`order/order-request/`, data);
    },

    getReqOrder() {
        return instance.get<IOrderRequestList[]>(`order/order-requests-by-user/`);
    },

    // тип заявки
    getTypeReqOrder() {
        return instance.get<IOrderRequestTypes[]>(`order/order-request-types-selector/`);
    },

    // корзина
    getCartsList() {
        return instance.get("order/cart");
    },

    addToCart(data: AddToCartRequest) {
        return instance.post(`order/cart/add_item/`, data);
    },

    updateCartItem: (data: UpdateCartItemRequest) => instance.patch("order/cart/update_item/", data),

    removeCartItem: (data: RemoveCartItemRequest) => instance.post("order/cart/remove_item/", data),

    // услуги
    getServices() {
        return instance.get(`/service/services/`);
    },

    getServiceDetail(id: number) {
        return instance.get(`/service/services/${id}/`);
    },
};
