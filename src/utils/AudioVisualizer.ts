class AudioVisualizer {
    audioCtx: AudioContext;
    analyserNode: AnalyserNode;
    srcNode: AudioNode | null = null;
    dataTime: Uint8Array<ArrayBuffer>;
    dataFreq: Uint8Array<ArrayBuffer>;

    constructor() {
        this.audioCtx = new AudioContext();

        this.analyserNode = this.audioCtx.createAnalyser();
        this.analyserNode.smoothingTimeConstant = 0.95; // Can be customized
        this.analyserNode.fftSize = 512; // Can be customized

        this.dataTime = new Uint8Array(this.analyserNode.fftSize);
        this.dataFreq = new Uint8Array(this.analyserNode.frequencyBinCount);
    }

    async setSource(audioElement: HTMLAudioElement) {
        if (this.audioCtx.state === "suspended") {
            await this.audioCtx.resume();
        }

        if (this.srcNode) {
            this.srcNode.disconnect();
        }

        this.srcNode = this.audioCtx.createMediaElementSource(audioElement);
        this.srcNode.connect(this.analyserNode);

        this.analyserNode.connect(this.audioCtx.destination);
    }
}

const audioVisualizer = new AudioVisualizer();

export default audioVisualizer;
