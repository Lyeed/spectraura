import { useEffect, useRef, type JSX } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import audioVisualizer from "src/utils/AudioVisualizer";
import styles from "./AudioPlayer.module.css";

export const AudioPlayer = ({
    source,
    onClearSource,
}: {
    readonly source: string;
    readonly onClearSource: () => void;
}): JSX.Element => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!audioRef.current) return;
        void audioRef.current.play();
        audioRef.current.volume = 0.5;
        void audioVisualizer.setAudioSource(audioRef.current);
    }, []);

    return (
        <>
            <audio
                ref={audioRef}
                controls
                id="audio"
                className={styles.audio}
                src={source}
            />
            <button
                type="button"
                className="button medium"
                onClick={onClearSource}
            >
                <FontAwesomeIcon icon={faTimes} />
                Clear
            </button>
        </>
    );
};
