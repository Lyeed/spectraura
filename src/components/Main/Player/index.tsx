import {
    type MouseEventHandler,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ChangeEventHandler,
    type JSX,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import audioVisualizer from "src/utils/AudioVisualizer";
import AppContext from "src/contexts/AppContext";
import { faMousePointer } from "@fortawesome/free-solid-svg-icons/faMousePointer";
import styles from "./Player.module.css";

export const Player = (): JSX.Element => {
    const { setReady, setMessages } = useContext(AppContext);

    const audioRef = useRef<HTMLAudioElement>(null);

    const [objectUrl, setObjectUrl] = useState<null | string>(null);

    const handleFileChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            const file = event.target.files?.[0];

            if (!file) {
                return;
            }

            setObjectUrl(URL.createObjectURL(file));
        },
        []
    );

    const handleFileDelete = useCallback(() => {
        if (objectUrl === null) {
            return;
        }

        setObjectUrl(null);
        setMessages((previous) => [
            {
                id: self.crypto.randomUUID(),
                type: "system",
                value: "A file has been removed from the track",
            },
            ...previous,
        ]);
    }, [setMessages, objectUrl]);

    const handleLoadSong = useCallback<MouseEventHandler<HTMLButtonElement>>(
        (event) => {
            const { song } = event.currentTarget.dataset;

            if (!song) {
                return;
            }

            setObjectUrl(song);
            setMessages((previous) => [
                {
                    id: self.crypto.randomUUID(),
                    type: "system",
                    value: "A file has added to the track",
                },
                ...previous,
            ]);
        },
        [setMessages]
    );

    useEffect(() => {
        if (!objectUrl || !audioRef.current) {
            setReady(false);
            return;
        }

        audioRef.current.volume = 0.5;
        setReady(true);
        void audioVisualizer.setSource(audioRef.current);
    }, [objectUrl]);

    return (
        <div className={styles.container}>
            {objectUrl ? (
                <>
                    <audio
                        ref={audioRef}
                        controls
                        id="audio"
                        className={styles.audio}
                        src={objectUrl}
                    />
                    <button
                        type="button"
                        className={styles.delete}
                        onClick={handleFileDelete}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </>
            ) : (
                <>
                    <input
                        className={styles.file}
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                    />
                    <span className={styles.pickText}>
                        <FontAwesomeIcon icon={faMousePointer} />
                        or pick one
                    </span>
                    <button
                        data-song="/lofi-study.mp3"
                        type="button"
                        className={styles.availableSong}
                        onClick={handleLoadSong}
                    >
                        🎧 Lofi study
                    </button>
                    <button
                        data-song="/phonk.mp3"
                        type="button"
                        className={styles.availableSong}
                        onClick={handleLoadSong}
                    >
                        🔥 Phonk
                    </button>
                    <button
                        data-song="/rap-beat.mp3"
                        type="button"
                        className={styles.availableSong}
                        onClick={handleLoadSong}
                    >
                        🎤 Rap beat
                    </button>
                </>
            )}
        </div>
    );
};
