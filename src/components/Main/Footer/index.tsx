import type { JSX } from "react";
import styles from "./Footer.module.css";

export const Footer = (): JSX.Element => (
    <footer className={styles.container}>
        <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Lyeed/spectraura"
            className={styles.link}
        >
            GitHub repository
        </a>
        <a
            target="_blank"
            rel="noreferrer"
            href="https://lyeed.github.io"
            className={styles.link}
        >
            @Lyeed
        </a>
    </footer>
);
