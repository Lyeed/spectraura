import { useEffect, type JSX } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import audioVisualizer from "src/utils/AudioVisualizer";

export const AudioStream = ({
    source,
    onClearSource,
}: {
    readonly source: MediaStream;
    readonly onClearSource: () => void;
}): JSX.Element => {
    useEffect(() => {
        void audioVisualizer.setAudioSource(source);
    }, [source]);

    return (
        <button type="button" className="button medium" onClick={onClearSource}>
            <FontAwesomeIcon icon={faTimes} />
            Stop stream
        </button>
    );
};
