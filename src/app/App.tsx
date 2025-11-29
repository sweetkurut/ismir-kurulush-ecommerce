import "./styles/index.scss";
import { Suspense } from "react";
import { AppRouter } from "./providers/router";
import { Header } from "@/widgets/Header/Header";
import { Footer } from "@/widgets/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <Suspense fallback="">
            <div className={"app"}>
                <Header />
                <main className="content-page">
                    <ToastContainer position="top-right" autoClose={3000} />
                    <AppRouter />
                </main>
                <Footer />
            </div>
        </Suspense>
    );
};

export default App;
