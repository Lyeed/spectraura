import { useCallback, useEffect, useRef, type RefObject } from "react";
import audioVisualizer from "src/utils/AudioVisualizer";

export const useSyncRunner = (
    iframeRef: RefObject<HTMLIFrameElement | null>,
    fpsMax: number
) => {
    useEffect(() => {
        let cancelled = false;
        let request: number | null = null;

        const tick = () => {
            if (cancelled) {
                return;
            }

            if (!iframeRef.current || document.hidden) {
                request = requestAnimationFrame(tick);
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
                request = requestAnimationFrame(tick);
            }, 1000 / fpsMax);
        };

        request = requestAnimationFrame(tick);

        return () => {
            cancelled = true;
            if (request !== null) {
                cancelAnimationFrame(request);
            }
        };
    }, [fpsMax]);
};
