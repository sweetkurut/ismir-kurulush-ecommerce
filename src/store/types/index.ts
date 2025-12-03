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

export interface ProductImage {
    id: number;
    image: string;
    alt: string;
    order: number;
}

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
    main_image: string;
}

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

// для сортировки
export interface SortOption {
    name: string;
    value: string;
}

export interface SortingOptionsMap {
    lowest_price: SortOption;
    highest_price: SortOption;
    newest: SortOption;
    oldest: SortOption;
    most_popular: SortOption;
    least_popular: SortOption;
}

export interface SortingResponse {
    sorting_options: SortingOptionsMap;
}

// избранные

export interface IFavorites {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        id: number;
        created_at: string;
        product: {
            id: number;
            name: string;
            slug: string;
            price: string;
            currency: string;
            main_image: string;
            in_stock: boolean;
            popularity_score: string;
            created_at: string;
            brand: Brand;
            categories: Category[];
        };
    }[];
}

// заявки/заказы
export interface IOrderRequestResponse {
    name: string;
    phone: string;
    comment: string;
    email: string;
    request_type?: string;
    cart: number | null;
    service?: number | null;
}

export interface IOrderRequestTypes {
    id: number;
    name: string;
}

export interface IOrderRequest {
    id: number;
    name: string;
    phone: string;
    comment: string;
    created_at: string;
    updated_at: string;
    is_processed: boolean;
}
// Добавьте интерфейс для пагинированного ответа
export interface IOrderRequestList {
    count: number;
    next: string | null;
    previous: string | null;
    results: IOrderRequest[];
}

// корзина

export interface Product {
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

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    total_price: string;
}

export interface Cart {
    id: number;
    user: number;
    session_id: number | null;
    items: CartItem[];
    total_amount: string;
}

export interface AddToCartRequest {
    product: number;
    quantity: number;
}

export interface AddToCartResponse {
    id: number;
    user: number;
    session_id: number | null;
    items: Array<{
        id: number;
        product: {
            id: number;
            name: string;
            slug: string;
            brand: { id: number; name: string; slug: string };
            categories: Array<{ id: number; name: string; slug: string }>;
            price: string;
            currency: string;
            main_image: string;
            in_stock: boolean;
            popularity_score: string;
            created_at: string;
        };
        quantity: number;
        total_price: string;
    }>;
    total_amount: string;
}

export interface UpdateCartItemRequest {
    item_id: number;
    quantity: number; // новое количество (1, 2, 3...)
}

export interface RemoveCartItemRequest {
    item_id: number;
}

// услуги
export interface Service {
    id: number;
    name: string;
    icon: string;
    description: string;
}

export interface IServiceOption {
    id: number;
    name: string;
}

export interface IServiceProcessStep {
    id: number;
    step_number: number;
    description: string;
}

export interface IServiceDetail {
    id: number;
    icon: string;
    name: string;
    description: string;
    price: string;
    unit_of_measurement: string;
    term: string;
    possibilities: IServiceOption[];
    advantages: IServiceOption[];
    work_process: IServiceProcessStep[];
}
