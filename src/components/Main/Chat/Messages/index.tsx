import {
    useCallback,
    useContext,
    type JSX,
    type MouseEventHandler,
} from "react";
import spectreAvatarUrl from "src/assets/spectrAvatar.webp";
import AppContext from "src/contexts/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import chatLoaderUrl from "src/assets/loading.svg";
import clsx from "clsx";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons/faRotateLeft";
import styles from "./Messages.module.css";

export const Messages = (): JSX.Element => {
    const { messages, chatting, selected, setSelected } =
        useContext(AppContext);

    const handleSelectVersion = useCallback<
        MouseEventHandler<HTMLButtonElement>
    >(
        (event) => {
            const { id } = event.currentTarget.dataset;

            if (!id) {
                return;
            }

            setSelected(id);
        },
        [setSelected]
    );

    return (
        <ul className={styles.messages}>
            {chatting ? (
                <img className={styles.loader} width="80" src={chatLoaderUrl} />
            ) : null}
            {messages.map((message) =>
                message.type === "system" ? (
                    <li key={message.id} className={styles.messageSystem}>
                        {message.value}
                    </li>
                ) : (
                    <li
                        key={message.id}
                        className={clsx(
                            styles.message,
                            message.type === "user" && styles.userMessage,
                            message.code && message.type !== "user"
                                ? styles.messageCode
                                : false
                        )}
                    >
                        {message.type === "spectre" ? (
                            <img
                                width="48"
                                className={styles.avatar}
                                src={spectreAvatarUrl}
                            />
                        ) : (
                            <div className={styles.userAvatar}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        )}
                        <span className={styles.messageOwner}>
                            {message.type === "user" ? "You" : "The Spectre"}
                            {message.id === selected ? (
                                <span className={styles.currentBadge}>
                                    current visualization
                                </span>
                            ) : null}
                        </span>
                        <pre className={styles.messageContent}>
                            {message.value}
                        </pre>
                        {message.type === "spectre" &&
                        message.code &&
                        selected !== message.id ? (
                            <button
                                type="button"
                                className={styles.versionButton}
                                data-id={message.id}
                                onClick={handleSelectVersion}
                            >
                                <FontAwesomeIcon icon={faRotateLeft} />
                                Load visualization
                            </button>
                        ) : null}
                    </li>
                )
            )}
        </ul>
    );
};
