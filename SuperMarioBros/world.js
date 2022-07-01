import { Zoiea } from './zoiea.js';

class World extends Zoiea {
    canvas = document.querySelector('canvas');
    context = this.canvas.getContext('2d', { alpha: false });
    scale = 4;
    id = 0;
    zoieas = [];
    ui = [];
    gap = 50 / 3;
    R = 0;
    L = 0;
    D = 0;
    U = 0;
    A = 0;
    B = 0;
    S = 0;
    s = 0;
    constructor() {
        super();
        (window.onresize = () => this.resize())();
        this.height = Math.ceil(this.canvas.height / this.scale);
        this.draws = this.draw();
    }
    resize() {
        this.canvas.width = Math.max(Math.min(window.innerWidth * this.canvas.height / window.innerHeight, 2520), 1440);
        this.width = Math.ceil(this.canvas.width / this.scale);
        this.context.imageSmoothingEnabled = false;
        this.context.scale(this.scale, this.scale);
    }
    redraw() {
        this.context.fillStyle = this.fillStyle;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
    reduce() { ++this.id }
    async draw() {
        if (this.drawing) return;
        this.drawing = true;
        do {
            this.context.translate(-this.x, -this.y);
            this.redraw();
            for (const zoiea of this.zoieas) zoiea.redraw(this);
            this.context.translate(this.x, this.y);
            for (const zoiea of this.ui) zoiea.redraw(this);
            await new Promise(resolve => requestAnimationFrame(resolve));
        } while (this.drawing);
    }
    async tick() {
        if (this.ticking) return;
        this.ticking = true;
        let end = performance.now();
        do {
            this.now = performance.now();
            ++this.step;
            this.update();
            for (const zoiea of this.zoieas) zoiea.update?.(this);
            for (const zoiea of this.ui) zoiea.update?.(this);
            await new Promise(resolve => setTimeout(resolve, (end += this.gap) - this.now));
        } while (this.ticking);
    }
    async play() {
        if (this.playing) return;
        this.playing = true;
        this.drawing = false;
        await this.draws;
        this.ticks = this.tick();
        do {
            this.context.translate(-this.x, -this.y);
            this.redraw();
            for (const zoiea of this.zoieas) {
                zoiea.reduce(this);
                zoiea.redraw(this);
            }
            this.context.translate(this.x, this.y);
            for (const zoiea of this.ui) {
                zoiea.reduce(this);
                zoiea.redraw(this);
            }
            await new Promise(resolve => requestAnimationFrame(resolve));
        } while (this.playing);
        this.ticking = false;
    }
    async stop() {
        if (!this.playing) return;
        this.playing = false;
        await this.ticks;
        this.draws = this.draw();
    }
    append(...zoiea) { this.insert(this.zoiea, ...zoiea) }
    insert(zoiea, ...other) { this.zoieas.splice(this.zoieas.indexOf(zoiea), 0, ...other) }
    remove(zoiea) { this.zoieas.splice(this.zoieas.indexOf(zoiea), 1) }
    replace(zoiea, other) {
        const index = this.zoieas.indexOf(other);
        this.zoieas.splice(this.zoieas.indexOf(zoiea), 1, other);
        this.zoieas.splice(index, 1, zoiea);
    }
    uiAppend(zoiea) {
        zoiea.reduce = zoiea.uiReduce;
        this.ui.push(zoiea);
    }
    uiRemove(zoiea) {
        this.ui.splice(this.ui.indexOf(zoiea), 1);
        delete zoiea.reduce;
    }
    onDown(event) {
        switch (event.code) {
            case 'ArrowRight':
                this.R = 1;
                break;
            case 'ArrowLeft':
                this.L = 1;
                break;
            case 'ArrowDown':
                this.D = 1;
                break;
            case 'ArrowUp':
                this.U = 1;
                break;
            case 'KeyX':
                this.A = 1;
                break;
            case 'KeyZ':
                this.B = 1;
                break;
            case 'Enter':
                this.S = 1;
                break;
            case 'Space':
                this.s = 1;
                break;
        }
    }
    onUp(event) {
        switch (event.code) {
            case 'ArrowRight':
                this.R = 0;
                break;
            case 'ArrowLeft':
                this.L = 0;
                break;
            case 'ArrowDown':
                this.D = 0;
                break;
            case 'ArrowUp':
                this.U = 0;
                break;
            case 'KeyX':
                this.A = 0;
                break;
            case 'KeyZ':
                this.B = 0;
                break;
            case 'Enter':
                this.S = 0;
                break;
            case 'Space':
                this.s = 0;
                break;
        }
    }
}

export { World }