import { type JSX } from "react";
import styles from "./Main.module.css";
import { Player } from "./Player";
import { Rendering } from "./Rendering";
import { Chat } from "./Chat";

export const Main = (): JSX.Element => (
    <main className={styles.container}>
        <Chat />
        <Rendering />
        <Player />
    </main>
);
