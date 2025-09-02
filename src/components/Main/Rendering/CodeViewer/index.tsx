import { useCallback, useContext, useEffect, useState, type JSX } from "react";
import { useCurrentCode } from "src/utils/useCurrentCode";
import Editor, { type OnValidate } from "@monaco-editor/react";
import RenderingContext from "src/contexts/RenderingContext";
import styles from "./CodeViewer.module.css";

export const CodeViewer = (): JSX.Element => {
    const { setCanSave, setEditingCode, editingCode } =
        useContext(RenderingContext);

    const [messages, setMessages] = useState<
        { message: string; severity: number }[]
    >([]);

    const lastCode = useCurrentCode();

    const handleModifyCode = useCallback(
        (value: string | undefined) => {
            setCanSave(false);
            setEditingCode(value ?? "");
        },
        [setCanSave, setEditingCode]
    );

    const handleValidate: OnValidate = useCallback(
        (markers) => {
            console.log(markers);
            setMessages(
                markers.map((marker) => ({
                    message: `Line ${marker.startLineNumber}: ${marker.message}`,
                    severity: marker.severity,
                }))
            );
            setCanSave(
                editingCode !== lastCode &&
                    !markers.some(({ severity }) => severity > 2)
            );
        },
        [setCanSave, lastCode, editingCode]
    );

    useEffect(() => {
        setMessages([]);
        setEditingCode(lastCode);
    }, [lastCode]);

    return (
        <div className={styles.codeWidget}>
            <div className={styles.editorContainer}>
                <Editor
                    theme="vs-dark"
                    width="100%"
                    height="100%"
                    defaultLanguage="javascript"
                    value={editingCode}
                    onChange={handleModifyCode}
                    onValidate={handleValidate}
                />
            </div>
            <span className={styles.consoleTitle}>Console</span>
            <div className={styles.messages}>
                {messages.map(({ message, severity }) => (
                    <span
                        key={message}
                        className={`${styles.message} ${severity > 2 ? styles.error : styles.warning}`}
                    >
                        {message}
                    </span>
                ))}
            </div>
        </div>
    );
};
