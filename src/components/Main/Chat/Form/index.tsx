import {
    type ChangeEventHandler,
    useCallback,
    useContext,
    useState,
    type FormEventHandler,
    type JSX,
} from "react";
import AppContext from "src/contexts/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { useSendPrompt } from "src/utils/useSendPrompt";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import styles from "./Form.module.css";

export const Form = (): JSX.Element => {
    const [includeCode, setIncludeCode] = useState(false);

    const sendPrompt = useSendPrompt();

    const { chatting } = useContext(AppContext);

    const [prompt, setPrompt] = useState("");

    const handleChangePrompt = useCallback<
        ChangeEventHandler<HTMLInputElement>
    >((event) => {
        setPrompt(event.currentTarget.value);
    }, []);

    const handleIncludeCodeChange = useCallback<
        ChangeEventHandler<HTMLInputElement>
    >((event) => {
        setIncludeCode(event.currentTarget.checked);
    }, []);

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        (event) => {
            setPrompt("");
            void sendPrompt(prompt, includeCode);
            event.preventDefault();
        },
        [prompt, sendPrompt, includeCode]
    );

    return (
        <form className={styles.promptContainer} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <input
                    required
                    maxLength={120}
                    placeholder={
                        chatting
                            ? "The Spectre is thinking..."
                            : "Message the Spectre..."
                    }
                    className={`${styles.prompt} input`}
                    value={prompt}
                    disabled={chatting}
                    onChange={handleChangePrompt}
                />
                <button
                    className={`${styles.submitButton} button large square`}
                    type="submit"
                    disabled={chatting}
                >
                    <FontAwesomeIcon
                        icon={chatting ? faSpinner : faArrowRight}
                        spinPulse={chatting}
                    />
                </button>
            </div>
            <label className={styles.includeCodeLabel}>
                <input
                    type="checkbox"
                    className="toggle"
                    checked={includeCode}
                    onChange={handleIncludeCodeChange}
                />
                <span>Include current visualization</span>
            </label>
        </form>
    );
};
