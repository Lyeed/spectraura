import {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type JSX,
} from "react";
import AppContext from "src/contexts/AppContext";
import { FilePicker } from "./FilePicker";
import { AudioPlayer } from "./AudioPlayer";
import styles from "./Player.module.css";
import { AudioStream } from "./AudioStream";

const possibleBegin = [
    "The song is bound to me now… Speak, and I shall weave its aura into light.",
    "I hear its rhythm pulsing. Guide me, and we will shape the spectrum together.",
    "Your track breathes within the void. Tell me how you wish to see it, and I will obey.",
];

export const Player = (): JSX.Element => {
    const speakTimeoutRef = useRef<number | null>(null);

    const { setMessages, setLocalChatting } = useContext(AppContext);

    const [source, setSource] = useState<null | string | MediaStream>(null);

    const handleClearSource = useCallback(() => {
        if (source === null) {
            return;
        }

        if (source instanceof MediaStream) {
            const tracks = source.getTracks();

            for (const track of tracks) {
                track.stop();
            }
        }

        setSource(null);
        setMessages((previous) => [
            {
                id: self.crypto.randomUUID(),
                type: "system",
                value: "Audio source has been removed from the track",
            },
            ...previous,
        ]);
    }, [setMessages, source]);

    const handlePickSource = useCallback(
        (file: string | File | MediaStream) => {
            let fileName = "A unknown source";

            if (typeof file === "string") {
                fileName = file.startsWith("/") ? file.slice(1) : file;
            } else if (file instanceof MediaStream) {
                fileName = "A stream";
            } else {
                fileName = file.name;
            }

            setSource(
                file instanceof MediaStream
                    ? file
                    : file instanceof File
                      ? URL.createObjectURL(file)
                      : file
            );
            setLocalChatting(true);
            setMessages((previous) => [
                {
                    id: self.crypto.randomUUID(),
                    type: "system",
                    value: `${fileName} has added to the track`,
                },
                ...previous,
            ]);

            if (speakTimeoutRef.current) {
                window.clearTimeout(speakTimeoutRef.current);
            }

            speakTimeoutRef.current = window.setTimeout(() => {
                setMessages((previous) => [
                    {
                        id: self.crypto.randomUUID(),
                        type: "spectre",
                        code: "",
                        value: possibleBegin[
                            Math.floor(Math.random() * possibleBegin.length)
                        ]!,
                    },
                    ...previous,
                ]);
                setLocalChatting(false);
                speakTimeoutRef.current = null;
            }, 2000);
        },
        [setLocalChatting, setMessages]
    );

    useEffect(() => {
        const drop = (event: DragEvent) => {
            event.preventDefault();

            if (event.dataTransfer?.items) {
                let file: File | null = null;

                for (const item of event.dataTransfer.items) {
                    if (item.kind === "file" && item.type.startsWith("audio")) {
                        file = item.getAsFile();
                        break;
                    }
                }

                if (!file) return;

                handlePickSource(file);
            }
        };

        const dragover = (event: DragEvent) => {
            event.preventDefault();
        };

        document.addEventListener("drop", drop);
        document.addEventListener("dragover", dragover);
        return () => {
            document.removeEventListener("drop", drop);
            document.removeEventListener("dragover", dragover);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {source === null ? (
                    <FilePicker onPickSource={handlePickSource} />
                ) : source instanceof MediaStream ? (
                    <AudioStream
                        source={source}
                        onClearSource={handleClearSource}
                    />
                ) : (
                    <AudioPlayer
                        source={source}
                        onClearSource={handleClearSource}
                    />
                )}
            </div>
            <span className={styles.title}>Audio source</span>
        </div>
    );
};
