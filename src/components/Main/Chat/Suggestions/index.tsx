import {
    useCallback,
    useContext,
    useState,
    type JSX,
    type MouseEventHandler,
} from "react";
import AppContext from "src/contexts/AppContext";
import { useSendPrompt } from "src/utils/useSendPrompt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import styles from "./Suggestions.module.css";

const promptSuggestions = [
    "Display a circular spectrum with neon bars moving to the beat",
    "Render a continuous waveform ribbon across the canvas with a subtle neon trail effect",
    "Create a kaleidoscope-style visualization that mirrors the waveform into symmetrical fragments, synchronized with the tempo",
];

export const Suggestions = (): JSX.Element | null => {
    const sendPrompt = useSendPrompt();

    const { chatting } = useContext(AppContext);

    const [clickedSuggestions, setClickedSuggestions] = useState<string[]>([]);

    const [closed, setClosed] = useState(false);

    const handleClickSuggestion = useCallback<
        MouseEventHandler<HTMLButtonElement>
    >(
        (event) => {
            const text = event.currentTarget.textContent;

            if (!text) {
                return;
            }

            setClickedSuggestions((previous) => [...previous, text]);
            void sendPrompt(text, false);
        },
        [sendPrompt]
    );

    const handleClose = useCallback(() => {
        setClosed(true);
    }, []);

    return clickedSuggestions.length < promptSuggestions.length && !closed ? (
        <div className={styles.suggestions}>
            <div className={styles.suggestionsTitle}>
                Suggestions
                <button
                    type="button"
                    className="button small square secondary"
                    onClick={handleClose}
                >
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
            {promptSuggestions
                .filter(
                    (suggestion) => !clickedSuggestions.includes(suggestion)
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
    ) : null;
};
