import Zoiea from './zoiea.js';
export default class World extends Zoiea {
    canvas = document.querySelector('canvas');
    context = this.canvas.getContext('2d', { alpha: false });
    zoieas = [];
    others = new Set();
    height = Math.ceil(this.canvas.height * .25);
    constructor() {
        super(0, 0, {});
        (window.onresize = () => this.resize())();
    }
    resize() {
        this.canvas.width = Math.max(Math.min(window.innerWidth * this.canvas.height / window.innerHeight, 2520), 1440);
        this.context.imageSmoothingEnabled = false;
        this.context.scale(4, 4);
        this.width = Math.ceil(this.canvas.width * .25);
    }
    async play() {
        await (this.playing || (this.playing = this.draw()));
    }
    async draw() {
        if (this.drawing) return;
        this.drawing = this.tick();
        do {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.translate(-this.x, -this.y);
            for (const zoiea of this.zoieas) zoiea.redraw();
            this.context.translate(this.x, this.y);
            for (const zoiea of this.others) zoiea.redraw();
        } while (await new Promise(resolve => requestAnimationFrame(resolve)), this.drawing);
        delete this.playing;
    }
    async tick() {
        if (this.ticking) return;
        let last = this.ticking = performance.now(), end = last, gap = 50 / 3;
        do {
            this.step = ((this.now = performance.now()) - last) * .06;
            for (const zoiea of this.zoieas) {
                if (!zoiea.zoiea) continue;
                zoiea.update?.();
                zoiea.y < this.y + this.height && zoiea.x + zoiea.image.width > this.x || delete zoiea.zoiea;
            }
            for (let i = this.zoieas.length; i-- > 0; this.zoieas[i].zoiea || this.zoieas.splice(i, 1));
            for (const zoiea of this.others) zoiea.update?.();
        } while (await new Promise(resolve => setTimeout(resolve, (end += gap) - (last = this.now))), this.ticking);
        delete this.drawing;
    }
    stop() {
        this.playing && delete this.ticking;
    }
    append(zoiea) {
        zoiea.zoiea ? this.zoieas.splice(this.zoieas.indexOf(zoiea), 1) : zoiea.zoiea = this;
        this.zoieas.push(zoiea);
    }
    insert(zoiea, other = this.zoieas[0]) {
        zoiea.zoiea ? this.zoieas.splice(this.zoieas.indexOf(zoiea), 1) : zoiea.zoiea = this;
        this.zoieas.splice(this.zoieas.indexOf(other), 0, zoiea);
    }
    create(zoiea) {
        (zoiea.zoiea = this).others.add(zoiea);
    }
    damage(zoiea) {
        this.others.delete(zoiea);
    }
}