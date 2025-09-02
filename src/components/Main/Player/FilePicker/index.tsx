import {
    type MouseEventHandler,
    useCallback,
    type ChangeEventHandler,
    type JSX,
    useRef,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { faDesktop } from "@fortawesome/free-solid-svg-icons/faDesktop";
import styles from "./FilePicker.module.css";
import Lofi from "/lofi-study.mp3?url";
import Phonk from "/phonk.mp3?url";
import RapBeat from "/rap-beat.mp3?url";

export const FilePicker = ({
    onPickSource,
}: {
    readonly onPickSource: (file: File | MediaStream | string) => void;
}): JSX.Element => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            const file = event.target.files?.[0];

            if (!file) return;
            onPickSource(file);
        },
        [onPickSource]
    );

    const handleLoadAvailableSong = useCallback<
        MouseEventHandler<HTMLButtonElement>
    >(
        (event) => {
            const { song } = event.currentTarget.dataset;

            if (!song) return;
            onPickSource(song);
        },
        [onPickSource]
    );

    const handleShowFileExplorer = useCallback(() => {
        if (!fileInputRef.current) return;
        fileInputRef.current.click();
    }, []);

    const handleSelectStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
        });

        onPickSource(stream);
    }, [onPickSource]);

    return (
        <>
            <input
                ref={fileInputRef}
                className={styles.fileInput}
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
            />
            <button
                className={`button medium ${styles.uploadFileButton}`}
                type="button"
                title="Select an audio file from your device"
                onClick={handleShowFileExplorer}
            >
                <FontAwesomeIcon icon={faUpload} />
                File
            </button>
            <span className={styles.pickText}>or</span>
            <button
                className={`button medium ${styles.uploadFileButton}`}
                type="button"
                title="Select an application emitting audio"
                onClick={handleSelectStream}
            >
                <FontAwesomeIcon icon={faDesktop} />
                Stream
            </button>
            <span className={styles.pickText}>or pick a sample</span>
            <button
                data-song={Lofi}
                type="button"
                className={styles.availableSong}
                onClick={handleLoadAvailableSong}
            >
                🎧 Lofi study
            </button>
            <button
                data-song={Phonk}
                type="button"
                className={styles.availableSong}
                onClick={handleLoadAvailableSong}
            >
                🔥 Phonk
            </button>
            <button
                data-song={RapBeat}
                type="button"
                className={styles.availableSong}
                onClick={handleLoadAvailableSong}
            >
                🎤 Rap beat
            </button>
        </>
    );
};
