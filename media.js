export default class Media {
    buffers = [];
    context = new AudioContext();
    sources = [];
    loading = [];
    constructor(id) {
        this.id = id;
    }
    async play(id, loop) {
        this.buffers[id] || await this.load(id);
        const source = this.sources[id] = this.context.createBufferSource();
        source.buffer = this.buffers[id];
        source.loop = loop;
        source.connect(this.context.destination);
        source.start();
        await new Promise(resolve => source.onended = () => resolve(delete this.sources[id]));
    }
    async load(id) {
        if (this.buffers[id]) return;
        if (!this.loading[id]) this.loading[id] = new Promise(async resolve => {
            const response = await fetch(`/${this.id}/${id}.mp3`);
            this.buffers[id] = await this.context.decodeAudioData(await response.arrayBuffer());
            resolve(delete this.loading[id]);
        });
        await this.loading[id];
    }
    stop(id) {
        if (!this.sources[id]) return;
        this.sources[id].stop();
        delete this.sources[id];
    }
}