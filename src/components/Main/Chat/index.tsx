import { type JSX } from "react";
import spectreUrl from "src/assets/animatedSpectr.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons/faMusic";
import styles from "./Chat.module.css";
import { Form } from "./Form";
import { Suggestions } from "./Suggestions";
import { Messages } from "./Messages";

export const Chat = (): JSX.Element => (
    <div className={styles.container}>
        <p className={styles.header}>
            <img className={styles.logo} src={spectreUrl} height="96" />
            <span className={styles.title}>
                <b>
                    <FontAwesomeIcon icon={faMusic} /> The Spectre
                </b>
                <br />
                Chat with me to summon your visualizer, and together we’ll
                refine it into light.
            </span>
        </p>
        <Messages />
        <Suggestions />
        <Form />
    </div>
);
