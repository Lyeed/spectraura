import { type JSX } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";

export const App = (): JSX.Element => (
    <>
        <Header />
        <Main />
        <Footer />
    </>
);
