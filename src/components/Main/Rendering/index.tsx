import { useCallback, useEffect, useRef, useState, type JSX } from "react";
import audioVisualizer from "src/utils/AudioVisualizer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons/faMaximize";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";
import clsx from "clsx";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css";
import { useCurrentCode } from "src/utils/useCurrentCode";
import styles from "./Rendering.module.css";
import runnerHtml from "./runner.html?raw";

hljs.registerLanguage("javascript", javascript);

export const Rendering = (): JSX.Element => {
    const [displayCode, setDisplayCode] = useState(false);

    const lastCode = useCurrentCode();

    const codeRef = useRef<HTMLPreElement>(null);

    const requestRef = useRef<number>(null);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    const tick = useCallback(() => {
        audioVisualizer.analyserNode.getByteFrequencyData(
            audioVisualizer.dataFreq
        );
        audioVisualizer.analyserNode.getByteTimeDomainData(
            audioVisualizer.dataTime
        );

        iframeRef.current?.contentWindow?.postMessage(
            {
                type: "frame",
                freq: audioVisualizer.dataFreq,
                time: audioVisualizer.dataTime,
            },
            "*"
        );
        requestRef.current = requestAnimationFrame(tick);
    }, []);

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

    useEffect(() => {
        if (!codeRef.current) {
            return;
        }

        const code = hljs.highlight(
            `// function tick(freq: Uint8Array, time: Uint8Array, canvasContext: CanvasRenderingContext2D): void;\n${lastCode}`,
            {
                language: "javascript",
            }
        );

        codeRef.current.innerHTML = code.value;
    }, [displayCode, lastCode]);

    useEffect(() => {
        if (!iframeRef.current) {
            return;
        }

        requestRef.current = requestAnimationFrame(tick);

        return () => {
            if (typeof requestRef.current === "number") {
                cancelAnimationFrame(requestRef.current);
                requestRef.current = null;
            }
        };
    }, [tick]);

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <div className={styles.actionGroup}>
                    <button
                        className={clsx(
                            styles.actionButton,
                            !displayCode && styles.actionToggle
                        )}
                        type="button"
                        onClick={handleShowVisualizer}
                    >
                        <FontAwesomeIcon icon={faChartSimple} />
                        Visualizer
                    </button>
                    <button
                        className={clsx(
                            styles.actionButton,
                            displayCode && styles.actionToggle
                        )}
                        type="button"
                        onClick={handleShowCode}
                    >
                        <FontAwesomeIcon icon={faCode} />
                        JavaScript
                    </button>
                </div>
                {!displayCode && (
                    <button
                        className={clsx(
                            styles.actionButton,
                            styles.actionRight
                        )}
                        type="button"
                        onClick={handleFullScreen}
                    >
                        <FontAwesomeIcon icon={faMaximize} />
                        Full screen
                    </button>
                )}
            </div>
            <iframe
                ref={iframeRef}
                allow="autoplay"
                sandbox="allow-scripts"
                referrerPolicy="no-referrer"
                srcDoc={runnerHtml.replace("/* %tick% */", lastCode)}
                className={styles.iframe}
            />
            {displayCode ? (
                <div className={styles.codeWidget}>
                    <pre>
                        <code ref={codeRef} className="language-javascript" />
                    </pre>
                </div>
            ) : null}
        </div>
    );
};
