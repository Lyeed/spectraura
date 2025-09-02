import {
    type MouseEventHandler,
    useCallback,
    type ChangeEventHandler,
    type JSX,
    useRef,
    useMemo,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { faDesktop } from "@fortawesome/free-solid-svg-icons/faDesktop";
import styles from "./FilePicker.module.css";
import Lofi from "/lofi-study.mp3?url"; // eslint-disable-line import-x/no-absolute-path
import Phonk from "/phonk.mp3?url"; // eslint-disable-line import-x/no-absolute-path
import RapBeat from "/rap-beat.mp3?url"; // eslint-disable-line import-x/no-absolute-path

export const FilePicker = ({
    onPickSource,
}: {
    readonly onPickSource: (file: File | MediaStream | string) => void;
}): JSX.Element => {
    const disabledStream = useMemo(
        () =>
            /(Mobi|Android|iPhone|iPad|iPod|FxiOS|Firefox|Version\/\d+.*Safari)/i.test(
                navigator.userAgent
            ),
        []
    );

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
                className={`${styles.action} button medium`}
                type="button"
                title="Select an audio file from your device"
                onClick={handleShowFileExplorer}
            >
                <FontAwesomeIcon icon={faUpload} />
                <span>File</span>
            </button>
            {!disabledStream && (
                <button
                    className={`${styles.action} button medium`}
                    type="button"
                    title="Select an application emitting audio"
                    onClick={handleSelectStream}
                >
                    <FontAwesomeIcon icon={faDesktop} />
                    <span>Stream</span>
                </button>
            )}
            <span className={styles.pickText}>or pick a sample</span>
            <div className={styles.samples}>
                <button
                    data-song={Lofi}
                    type="button"
                    className={styles.availableSong}
                    onClick={handleLoadAvailableSong}
                >
                    🎧
                    <span>Lofi</span>
                </button>
                <button
                    data-song={Phonk}
                    type="button"
                    className={styles.availableSong}
                    onClick={handleLoadAvailableSong}
                >
                    🔥
                    <span>Phonk</span>
                </button>
                <button
                    data-song={RapBeat}
                    type="button"
                    className={styles.availableSong}
                    onClick={handleLoadAvailableSong}
                >
                    🎤
                    <span>Rap beat</span>
                </button>
            </div>
        </>
    );
};
