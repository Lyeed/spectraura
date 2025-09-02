import {
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
    type JSX,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons/faMaximize";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";
import clsx from "clsx";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { useCurrentCode } from "src/utils/useCurrentCode";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { useSyncRunner } from "src/utils/useSyncRunner";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import RenderingContext from "src/contexts/RenderingContext";
import AppContext from "src/contexts/AppContext";
import styles from "./Rendering.module.css";
import runnerHtml from "./runner.html?raw";
import templateHtml from "./template.html?raw";
import { CodeViewer } from "./CodeViewer";

export const Rendering = (): JSX.Element => {
    const { setMessages, selected } = useContext(AppContext);

    const { canSave, editingCode, setCanSave } = useContext(RenderingContext);

    const [displayCode, setDisplayCode] = useState(false);

    const lastCode = useCurrentCode();

    const iframeRef = useRef<HTMLIFrameElement>(null);

    const downloadUrl = useMemo(
        () =>
            URL.createObjectURL(
                new Blob([templateHtml.replace("/* %tick% */", lastCode)], {
                    type: "text/html;charset=utf-8",
                })
            ),
        [lastCode]
    );

    useSyncRunner(iframeRef);

    const handleSaveChanges = useCallback(() => {
        setDisplayCode(false);
        setCanSave(false);
        setMessages((previous) => {
            const returnValue = [...previous];

            if (selected) {
                const index = returnValue.findIndex((p) => p.id === selected);

                if (index !== -1) {
                    const data = returnValue[index];

                    if (data?.code) {
                        returnValue[index] = {
                            ...data,
                            code: editingCode,
                        };
                    }
                }
            }

            return returnValue;
        });
    }, [editingCode, selected, setMessages, setCanSave]);

    const handleShowVisualizer = useCallback(() => {
        setDisplayCode(false);
    }, []);

    const handleShowCode = useCallback(() => {
        setDisplayCode(true);
    }, []);

    const handleFullScreen = useCallback(() => {
        if (!iframeRef.current) {
            return;
        }

        void iframeRef.current.requestFullscreen();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <div className={styles.actionGroup}>
                    <button
                        className={clsx(
                            !displayCode && "toggled",
                            "button",
                            "medium"
                        )}
                        type="button"
                        onClick={handleShowVisualizer}
                    >
                        <FontAwesomeIcon icon={faChartSimple} />
                        Visualizer
                    </button>
                    <button
                        className={clsx(
                            displayCode && "toggled",
                            "button",
                            "medium"
                        )}
                        type="button"
                        onClick={handleShowCode}
                    >
                        <FontAwesomeIcon icon={faCode} />
                        JavaScript
                    </button>
                </div>
                <a
                    className={`${styles.actionRight} button medium`}
                    download="visualizer.html"
                    href={downloadUrl}
                >
                    <FontAwesomeIcon icon={faDownload} />
                    Download
                </a>
                {displayCode ? (
                    <button
                        className="button medium"
                        type="button"
                        disabled={!canSave}
                        onClick={handleSaveChanges}
                        title={canSave ? undefined : "Code must not have errors nor be identical"}
                    >
                        <FontAwesomeIcon icon={faSave} />
                        Save changes
                    </button>
                ) : (
                    <button
                        className="button medium"
                        type="button"
                        onClick={handleFullScreen}
                    >
                        <FontAwesomeIcon icon={faMaximize} />
                        Full screen
                    </button>
                )}
            </div>
            <div className={styles.content}>
                <iframe
                    ref={iframeRef}
                    allow="autoplay"
                    sandbox="allow-scripts"
                    referrerPolicy="no-referrer"
                    srcDoc={runnerHtml.replace("/* %tick% */", lastCode)}
                    className={styles.iframe}
                />
                {displayCode ? <CodeViewer /> : null}
            </div>
        </div>
    );
};
