import "./styles/index.scss";
import { Suspense } from "react";
import { AppRouter } from "./providers/router";
import { Header } from "@/widgets/Header/Header";
import { Footer } from "@/widgets/Footer/Footer";

const App = () => {
    return (
        <Suspense fallback="">
            <div className={"app"}>
                <Header />
                <main className="content-page">
                    <AppRouter />
                </main>
                <Footer />
            </div>
        </Suspense>
    );
};

export default App;
