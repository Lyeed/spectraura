import {
    type ChangeEventHandler,
    useCallback,
    useContext,
    useState,
    type FormEventHandler,
    type JSX,
    type MouseEventHandler,
} from "react";
import spectreUrl from "src/assets/animatedSpectr.svg";
import spectreAvatarUrl from "src/assets/spectrAvatar.webp";
import AppContext from "src/contexts/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import chatLoaderUrl from "src/assets/loading.svg";
import { useSendPrompt } from "src/utils/useSendPrompt";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import clsx from "clsx";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faMusic } from "@fortawesome/free-solid-svg-icons/faMusic";
import styles from "./Chat.module.css";

const promptSuggestions = [
    "Summon a circular spectrum with glowing neon bars pulsing to the beat.",
    "Create a flowing waveform ribbon across the canvas with a soft neon trail.",
    "Create a kaleidoscope-style visual that mirrors the waveform into symmetric shards, pulsing to the tempo.",
];

export const Chat = (): JSX.Element => {
    const sendPrompt = useSendPrompt();

    const { messages, setMessages, chatting, selected, setSelected } =
        useContext(AppContext);

    const [prompt, setPrompt] = useState("");

    const [clickedSuggestions, setClickedSuggestions] = useState<string[]>([]);

    const handleChangePrompt = useCallback<
        ChangeEventHandler<HTMLInputElement>
    >((event) => {
        setPrompt(event.currentTarget.value);
    }, []);

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

    const handleClickSuggestion = useCallback<
        MouseEventHandler<HTMLButtonElement>
    >(
        (event) => {
            const text = event.currentTarget.textContent;

            if (!text) {
                return;
            }

            setClickedSuggestions((previous) => [...previous, text]);
            setMessages((previous) => [
                {
                    id: self.crypto.randomUUID(),
                    type: "user",
                    value: text,
                },
                ...previous,
            ]);
            setPrompt("");
            void sendPrompt(text);
        },
        [sendPrompt, setMessages]
    );

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        (event) => {
            setMessages((previous) => [
                {
                    id: self.crypto.randomUUID(),
                    type: "user",
                    value: prompt,
                },
                ...previous,
            ]);
            setPrompt("");
            void sendPrompt(prompt);
            event.preventDefault();
        },
        [prompt, setMessages, sendPrompt]
    );

    return (
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
            <div className={styles.messages}>
                {chatting ? (
                    <img
                        className={styles.loader}
                        width="80"
                        src={chatLoaderUrl}
                    />
                ) : null}
                {messages.map((message) =>
                    message.type === "system" ? (
                        <div key={message.id} className={styles.messageSystem}>
                            {message.value}
                        </div>
                    ) : (
                        <div
                            key={message.id}
                            className={clsx(
                                styles.message,
                                message.type === "user" && styles.userMessage
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
                                {message.type === "user"
                                    ? "You"
                                    : "The Spectre"}
                                {message.id === selected ? (
                                    <span className={styles.currentBadge}>
                                        visualizing
                                    </span>
                                ) : null}
                            </span>
                            <span>{message.value}</span>
                            {message.type === "spectre" &&
                            message.code &&
                            selected !== message.id ? (
                                <button
                                    type="button"
                                    className={styles.versionButton}
                                    data-id={message.id}
                                    onClick={handleSelectVersion}
                                >
                                    Use this version
                                </button>
                            ) : null}
                        </div>
                    )
                )}
            </div>
            {clickedSuggestions.length < promptSuggestions.length && (
                <div className={styles.suggestions}>
                    <span className={styles.suggestionsTitle}>Suggestions</span>
                    {promptSuggestions
                        .filter(
                            (suggestion) =>
                                !clickedSuggestions.includes(suggestion)
                        )
                        .map((suggestion) => (
                            <button
                                key={suggestion}
                                disabled={chatting}
                                className={styles.suggestion}
                                type="button"
                                onClick={handleClickSuggestion}
                            >
                                {suggestion}
                            </button>
                        ))}
                </div>
            )}
            <form className={styles.promptContainer} onSubmit={handleSubmit}>
                <input
                    required
                    maxLength={86}
                    placeholder={
                        chatting
                            ? "The Spectre is thinking..."
                            : "Message the Spectre..."
                    }
                    className={styles.prompt}
                    value={prompt}
                    disabled={chatting}
                    onChange={handleChangePrompt}
                />
                <button
                    className={styles.promptSubmit}
                    type="submit"
                    disabled={chatting}
                >
                    <FontAwesomeIcon
                        icon={chatting ? faSpinner : faArrowRight}
                        spinPulse={chatting}
                    />
                </button>
            </form>
        </div>
    );
};
