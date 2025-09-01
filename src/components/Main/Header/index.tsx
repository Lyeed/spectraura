import logoPath from "src/assets/logo.webp";
import type { JSX } from "react";
import styles from "./Header.module.css";

export const Header = (): JSX.Element => (
    <header className={styles.container}>
        <img width={72} height={72} src={logoPath} />
        <h1 className={styles.title}>
            Spectr<b>aura</b>
            <br />
            <small>AI-powered sound visualizations</small>
        </h1>
    </header>
);
