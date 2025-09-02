import { useCallback, useEffect, useRef, type RefObject } from "react";
import audioVisualizer from "src/utils/AudioVisualizer";

export const useSyncRunner = (
    iframeRef: RefObject<HTMLIFrameElement | null>
) => {
    const requestRef = useRef<number>(null);

    const tick = useCallback(() => {
        if (!iframeRef.current || document.hidden) {
            requestRef.current = requestAnimationFrame(tick);
            return;
        }

        audioVisualizer.analyserNode.getByteFrequencyData(
            audioVisualizer.dataFreq
        );
        audioVisualizer.analyserNode.getByteTimeDomainData(
            audioVisualizer.dataTime
        );

        const freqBuffer = audioVisualizer.dataFreq.buffer.slice(); // eslint-disable-line unicorn/prefer-spread
        const timeBuffer = audioVisualizer.dataTime.buffer.slice(); // eslint-disable-line unicorn/prefer-spread

        iframeRef.current.contentWindow?.postMessage(
            {
                type: "frame",
                freq: freqBuffer,
                time: timeBuffer,
                sampleRate: audioVisualizer.analyserNode.context.sampleRate,
            },
            "*",
            [freqBuffer, timeBuffer]
        );

        setTimeout(() => {
            requestAnimationFrame(tick);
        }, 1000 / 45);
    }, []);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(tick);

        return () => {
            if (typeof requestRef.current === "number") {
                cancelAnimationFrame(requestRef.current);
                requestRef.current = null;
            }
        };
    }, [tick]);
};
