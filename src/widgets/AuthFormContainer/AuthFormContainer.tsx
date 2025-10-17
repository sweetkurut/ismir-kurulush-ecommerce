import { useLocation, useNavigate } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage/LoginPage";

const AuthFormContainer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const activeTab = location.pathname === "/login" ? "login" : "register";

    const handleTabChange = (mode) => {
        if (mode === "login") {
            navigate("/login");
        } else if (mode === "register") {
            navigate("/signup");
        }
    };

    return <LoginPage activeTab={activeTab} onTabChange={handleTabChange} />;
};

export default AuthFormContainer;
