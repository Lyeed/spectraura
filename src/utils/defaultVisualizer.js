function tick(freq, time, canvasContext, obj, metadata) {
  const { width, height, deltaTime } = metadata;
  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = Math.min(width, height) * 0.15;
  const maxBarLength = Math.min(width, height) * 0.35;
  const numBars = freq.length;
  const angleStep = (2 * Math.PI) / numBars;

  if (obj.rotation === undefined) {
    obj.rotation = 0;
  }
  if (obj.smoothedFreq === undefined || obj.smoothedFreq.length !== numBars) {
    obj.smoothedFreq = new Float32Array(numBars).fill(0);
  }
  if (obj.pulseRadius === undefined) {
    obj.pulseRadius = 0;
  }
  if (obj.pulseColorHue === undefined) {
    obj.pulseColorHue = 0;
  }

  canvasContext.globalCompositeOperation = 'lighter';
  canvasContext.clearRect(0, 0, width, height);

  let totalFreqAmplitude = 0;
  for (let i = 0; i < numBars; i++) {
    totalFreqAmplitude += freq[i];
  }
  const avgFreqAmplitude = totalFreqAmplitude / numBars / 255;

  let totalTimeAmplitude = 0;
  for (let i = 0; i < time.length; i++) {
    totalTimeAmplitude += Math.abs(time[i] - 128);
  }
  const avgTimeAmplitude = (totalTimeAmplitude / time.length) / 128;

  obj.rotation += 0.005 * (deltaTime / 16) + avgFreqAmplitude * 0.0005;

  const targetPulseRadius = baseRadius * 0.5 + avgTimeAmplitude * (baseRadius * 0.4);
  obj.pulseRadius = obj.pulseRadius * 0.9 + targetPulseRadius * 0.1;

  const targetPulseHue = (metadata.currentTime * 0.05);
  obj.pulseColorHue = obj.pulseColorHue * 0.9 + targetPulseHue * 0.1;

  const pulseSaturation = 100;
  const pulseLightness = 50 + avgTimeAmplitude * 30;

  canvasContext.shadowBlur = 20;
  canvasContext.shadowColor = `hsl(${obj.pulseColorHue % 360}, ${pulseSaturation}%, ${pulseLightness - 20}%)`;
  canvasContext.fillStyle = `hsl(${obj.pulseColorHue % 360}, ${pulseSaturation}%, ${pulseLightness}%)`;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, obj.pulseRadius, 0, 2 * Math.PI);
  canvasContext.fill();
  canvasContext.closePath();

  canvasContext.shadowBlur = 12;

  for (let i = 0; i < numBars; i++) {
    const rawAmplitude = freq[i] / 255;

    obj.smoothedFreq[i] = obj.smoothedFreq[i] * 0.85 + rawAmplitude * 0.15;
    const amplitude = obj.smoothedFreq[i];

    const barLength = amplitude * maxBarLength;
    const currentAngle = i * angleStep + obj.rotation;

    const startX = centerX + Math.cos(currentAngle) * baseRadius;
    const startY = centerY + Math.sin(currentAngle) * baseRadius;

    const endX = centerX + Math.cos(currentAngle) * (baseRadius + barLength);
    const endY = centerY + Math.sin(currentAngle) * (baseRadius + barLength);

    const hue = (i / numBars) * 360 + obj.rotation * (180 / Math.PI);
    const saturation = 100;
    const lightness = 50 + (amplitude * 40);

    canvasContext.shadowColor = `hsl(${hue % 360}, ${saturation}%, ${lightness - 20}%)`;
    canvasContext.strokeStyle = `hsl(${hue % 360}, ${saturation}%, ${lightness}%)`;

    canvasContext.lineWidth = 2 + amplitude * 4;

    canvasContext.beginPath();
    canvasContext.moveTo(startX, startY);
    canvasContext.lineTo(endX, endY);
    canvasContext.stroke();
  }

  canvasContext.shadowBlur = 0;
  canvasContext.globalCompositeOperation = 'source-over';
}
