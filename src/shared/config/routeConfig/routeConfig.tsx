import { BasketPage } from "@/pages/BasketPage/BasketPage";
import { CatalogPage } from "@/pages/CatalogPage/CatalogPage";
import { DetailCatalogPage } from "@/pages/DetailCatalogPage/DetailCatalogPage";
import { DetailService } from "@/pages/DetailService/DetailService";
import { FeedBackPage } from "@/pages/FeedBackPage/FeedBackPage";
import { HomePage } from "@/pages/HomePage/HomePage";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage/ProfilePage";
import { ServicesPage } from "@/pages/ServicesPage/ServicesPage";
import { SignupPage } from "@/pages/SignupPage/SignupPage";
import type { RouteProps } from "react-router-dom";

export enum AppRoutes {
    MAIN = "main",
    CATALOG = "catalog",
    CATALOG_DETAIL = "catalog_detail",
    SERVICE_DETAIL = "service_detail",
    BASKET = "basket",
    NOT_FOUND = "not_found",
    FEEDBACK = "feedback",
    LOGIN = "login",
    SIGNUP = "signup",
    PROFILE = "profile",
    SERVICE = "service",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.CATALOG]: "/catalog",
    [AppRoutes.CATALOG_DETAIL]: "/catalog/:id",
    [AppRoutes.SERVICE_DETAIL]: "/service/:id",
    [AppRoutes.BASKET]: "/basket",
    [AppRoutes.FEEDBACK]: "/feedback",
    [AppRoutes.LOGIN]: "/login",
    [AppRoutes.SIGNUP]: "/signup",
    [AppRoutes.PROFILE]: "/profile",
    [AppRoutes.SERVICE]: "/service",
    [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <HomePage />,
    },
    [AppRoutes.CATALOG]: {
        path: RoutePath.catalog,
        element: <CatalogPage />,
    },
    [AppRoutes.CATALOG_DETAIL]: {
        path: RoutePath.catalog_detail,
        element: <DetailCatalogPage />,
    },
    [AppRoutes.SERVICE_DETAIL]: {
        path: RoutePath.service_detail,
        element: <DetailService />,
    },
    [AppRoutes.BASKET]: {
        path: RoutePath.basket,
        element: <BasketPage />,
    },
    [AppRoutes.FEEDBACK]: {
        path: RoutePath.feedback,
        element: <FeedBackPage />,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    [AppRoutes.SIGNUP]: {
        path: RoutePath.signup,
        element: <SignupPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
    },
    [AppRoutes.SERVICE]: {
        path: RoutePath.service,
        element: <ServicesPage />,
    },

    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
