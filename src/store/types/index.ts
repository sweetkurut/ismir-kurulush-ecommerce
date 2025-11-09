// это для регситрации
export interface ISignUpEmail {
    email: string;
}

export interface ISignUpEmailResponse {
    id: string;
    email: string;
}

export interface IVerifyCode {
    email: string;
    verification_code: string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface ILoginResponse {
    id: number;
    email: string;
    refresh: string;
    access: string;
}

export interface ISetPassword {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

export interface ISetPasswordResponse {
    status: number;
    id: number;
    name: string;
    user: string;
    refresh: string;
    access: string;
}

export interface IRefreshTokenResponse {
    refresh: string;
    access: string;
}
export interface IResetPassword {
    email: string;
    code: string;
    new_password: string;
}

// тут короче профиль
export interface IProfile {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    is_company: boolean;
    registered_at: string;
    updated_at: string;

    message?: string;
    favorites_count: number;
}

export interface IProfileUpdate {
    name: string;
    email: string;
    avatar: string;
    is_company: boolean;
}

export interface IProfileUpdatePassword {
    old_password: string;
    new_password: string;
}

export interface Brand {
    id: number;
    name: string;
    slug: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Products {
    id: number;
    name: string;
    slug: string;
    brand: Brand;
    categories: Category[];
    price: string;
    currency: string;
    main_image: string;
    in_stock: boolean;
    popularity_score: string;
    created_at: string;
}

/** Изображения в детальном товаре */
export interface ProductImage {
    id: number;
    image: string;
    alt: string;
    order: number;
}

/** Детальная информация о товаре (страница товара) */
export interface ProductDetail {
    id: number;
    images: ProductImage[];
    brand: Brand;
    categories: Category[];
    similar: Products[];
    sku: string | null;
    name: string;
    slug: string;
    description: string;
    price: string;
    currency: string;
    quantity: number;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    search_vector: string;
    popularity_score: string;
}

// категория
export interface ICategory {
    id: number;
    name: string;
    slug: string;
}

export interface ICategoryResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ICategory[];
}
