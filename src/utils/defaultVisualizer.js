/**
 * @param {Readonly<Uint8Array>} freq - Frequency data array (0–255 values) representing the FFT spectrum of the current audio frame.
 * @param {Readonly<Uint8Array>} time - Time-domain data array (0–255 values) representing the raw waveform of the current audio frame.
 * @param {CanvasRenderingContext2D} canvasContext - 2D canvas context where the visualization is drawn.
 * @param {Record<string, unknown>} object - Internal state, persistent between tick() calls. Can be freely used.
 * @param {{
 *   readonly width: number,
 *   readonly height: number,
 *   readonly deltaTime: number,
 *   readonly currentTime: number,
 *   readonly sampleRate: number
 * }} metadata
 */
function tick(freq, time, canvasContext, object, metadata) {
    canvasContext.clearRect(0, 0, metadata.width, metadata.height);

    canvasContext.lineWidth = 2;

    const halfHeight = metadata.height / 2;
    const maxFreqValue = 255;
    const amplitudeScale = 0.7;

    let previousX = 0;
    let previousY = halfHeight;

    for (let i = 0; i < freq.length; i++) {
        const x = (i / freq.length) * metadata.width;

        const normalizedFreq = freq[i] / maxFreqValue;

        const deviation =
            normalizedFreq * ((metadata.height * amplitudeScale) / 2);

        const y = halfHeight + (i % 2 === 0 ? -deviation : deviation);

        canvasContext.beginPath();
        canvasContext.moveTo(previousX, previousY);
        canvasContext.lineTo(x, y);

        const hue = Math.floor(normalizedFreq * 360);
        canvasContext.strokeStyle = `hsl(${hue}, 100%, 50%)`;

        canvasContext.stroke();

        previousX = x;
        previousY = y;
    }
}
