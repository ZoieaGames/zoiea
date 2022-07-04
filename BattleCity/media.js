class Media {
    loading = [];
    buffers = [];
    sources = [];
    constructor() { this.context = new AudioContext() }
    async load(id) {
        if (this.buffers[id]) return;
        return this.loading[id] = new Promise(async resolve => {
            if (this.loading[id]) return await this.loading[id];
            this.buffers[id] = await this.context.decodeAudioData(await (await fetch(id + '.mp3')).arrayBuffer());
            delete this.loading[id];
            resolve();
        });
    }
    play(id, loop) {
        return new Promise(async resolve => {
            if (!this.buffers[id]) await this.load(id);
            const source = this.sources[id] = this.context.createBufferSource();
            source.buffer = this.buffers[id];
            source.loop = loop;
            source.connect(this.context.destination);
            source.start();
            source.onended = () => resolve();
        });
    }
    stop(id) {
        if (!this.sources[id]) return;
        this.sources[id].stop();
        delete this.sources[id];
    }
}

export { Media }