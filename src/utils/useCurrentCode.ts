import { useMemo } from "react";
import { useCurrentMessage } from "./useCurrentMessage";

const fn = `const tick = (freq, time, canvasContext) => {
    const w = canvasElement.clientWidth;
    const h = canvasElement.clientHeight;
    canvasContext.clearRect(0, 0, w, h);
    canvasContext.lineWidth = 2.2;

    const gradient = canvasContext.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "#a78bfa");
    gradient.addColorStop(0.5, "#60a5fa");
    gradient.addColorStop(1, "#22d3ee");

    canvasContext.strokeStyle = gradient;
    canvasContext.shadowBlur = 18;
    canvasContext.shadowColor = "#60a5fa";

    const amp = 1.2;
    const mid = h / 2;

    canvasContext.beginPath();
    for (let i = 0; i < time.length; i++) {
        const x = (i / (time.length - 1)) * w;
        const v = ((time?.[i] ?? 0) - 128) / 128;
        const y = mid + v * mid * 0.9 * amp;

        if (i === 0) canvasContext.moveTo(x, y);
        else canvasContext.lineTo(x, y);
    }

    canvasContext.stroke();
};`;

export const useCurrentCode = () => {
    const currentMessage = useCurrentMessage();

    return useMemo(() => currentMessage?.code ?? fn, [currentMessage]);
};
