import { Zoiea } from './zoiea.js';

class World extends Zoiea {
    canvas = document.querySelector('canvas');
    context = this.canvas.getContext('2d', { alpha: false });
    scale = 4;
    fillStyle = '#000';
    id = 0;
    zoieas = [];
    ui = [];
    gap = 50 / 3;
    U = 0;
    R = 0;
    D = 0;
    L = 0;
    A = 0;
    B = 0;
    S = 0;
    s = 0;
    constructor() {
        super();
        (window.onresize = () => this.resize())();
        this.height = Math.ceil(this.canvas.height / this.scale);
        this.draws = this.draw();
        document.onkeydown = event => this.onDown(event);
        document.onkeyup = event => this.onUp(event);
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
            for (const zoiea of this.zoieas) zoiea.redraw();
            this.context.translate(this.x, this.y);
            for (const zoiea of this.ui) zoiea.redraw();
            await new Promise(resolve => requestAnimationFrame(resolve));
        } while (this.drawing);
    }
    async tick() {
        if (this.ticking) return;
        this.ticking = true;
        let end = performance.now();
        let last = end;
        do {
            this.now = performance.now();
            this.step = (this.now - last) * 0.06;
            last = this.now;
            this.update?.();
            for (const zoiea of this.zoieas) zoiea.update?.();
            for (const zoiea of this.ui) zoiea.update?.();
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
                zoiea.redraw();
                zoiea.reduce();
            }
            this.context.translate(this.x, this.y);
            for (const zoiea of this.ui) {
                zoiea.redraw();
                zoiea.reduce();
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
    append(zoiea) {
        zoiea.zoiea = this;
        this.zoieas.push(zoiea);
        return true;
    }
    insert(zoiea, other) {
        other.zoiea = this;
        this.zoieas.splice(this.zoieas.indexOf(zoiea), 0, other);
    }
    remove(zoiea) {
        this.zoieas.splice(this.zoieas.indexOf(zoiea), 1);
        delete zoiea.zoiea;
    }
    replace(zoiea, other) {
        const index = this.zoieas.indexOf(other);
        this.zoieas.splice(this.zoieas.indexOf(zoiea), 1, other);
        this.zoieas.splice(index, 1, zoiea);
    }
    uiAppend(zoiea) {
        zoiea.zoiea = this;
        zoiea.reduce = zoiea.uiReduce;
        this.ui.push(zoiea);
    }
    uiRemove(zoiea) {
        this.ui.splice(this.ui.indexOf(zoiea), 1);
        delete zoiea.reduce;
        delete zoiea.zoiea;
    }
    onDown(event) {
        switch (event.code) {
            case 'ArrowUp':
                this.zoiea?.move(1);
                this.U = 1;
                break;
            case 'ArrowRight':
                this.zoiea?.move(2);
                this.R = 1;
                break;
            case 'ArrowDown':
                this.zoiea?.move(3);
                this.D = 1;
                break;
            case 'ArrowLeft':
                this.zoiea?.move(4);
                this.L = 1;
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
            case 'ArrowUp':
                if (this.zoiea?.moving === 1) this.zoiea.move(0);
                this.U = 0;
                break;
            case 'ArrowRight':
                if (this.zoiea?.moving === 2) this.zoiea.move(0);
                this.R = 0;
                break;
            case 'ArrowDown':
                if (this.zoiea?.moving === 3) this.zoiea.move(0);
                this.D = 0;
                break;
            case 'ArrowLeft':
                if (this.zoiea?.moving === 4) this.zoiea.move(0);
                this.L = 0;
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