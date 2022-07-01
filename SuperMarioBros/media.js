class Media {
    loading = [];
    buffers = [];
    sources = [];
    constructor() { this.context = new AudioContext() }
    async load(id) {
        if (this.loading[id]) return;
        this.loading[id] = 1;
        if (this.buffers[id]) return;
        this.buffers[id] = await this.context.decodeAudioData(await (await fetch(id + '.mp3')).arrayBuffer());
        delete this.loading[id];
    }
    play(id, loop) {
        if (!this.buffers[id]) { return void this.load(id).then(() => this.play(id, loop)) }
        const source = this.sources[id] = this.context.createBufferSource();
        source.buffer = this.buffers[id];
        source.loop = loop;
        source.connect(this.context.destination);
        source.start();
    }
    stop(id) {
        if (!this.sources[id]) return;
        this.sources[id].stop();
        delete this.sources[id];
    }
}

export { Media }