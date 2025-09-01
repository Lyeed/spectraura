import { type JSX } from "react";
import styles from "./Main.module.css";
import { Player } from "./Player";
import { Rendering } from "./Rendering";
import { Chat } from "./Chat";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Main = (): JSX.Element => (
    <main className={styles.container}>
        <Header />
        <Chat />
        <Rendering />
        <Player />
        <Footer />
    </main>
);
