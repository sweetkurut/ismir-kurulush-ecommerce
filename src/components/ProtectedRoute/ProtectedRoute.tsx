import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { verifyAuthWithDelay } from "@/utils/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export const ProtectedRoute = ({ children, fallback = <div>Проверка авторизации...</div> }: ProtectedRouteProps) => {
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { login } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const hasAuth = await verifyAuthWithDelay();
                setIsAuthenticated(hasAuth || !!login?.access);
            } catch (error) {
                console.error(error, "ошибка, иди нахуй");

                setIsAuthenticated(false);
            } finally {
                setIsChecking(false);
            }
        };

        checkAuth();
    }, [login]);

    if (isChecking) {
        return <>{fallback}</>;
    }

    if (!isAuthenticated) {
        return <div>Требуется авторизация</div>;
    }

    return <>{children}</>;
};
