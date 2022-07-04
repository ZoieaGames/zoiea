import { Text } from './text.js';
import { Zoiea } from './zoiea.js';

const fucks = ['rgba(255,255,255,.5)', 'rgba(0,0,0,.5)'];

class Debug extends Text {
    ups = 0;
    fps = 0;
    text = 'FPS:0';
    text0 = 'UPS:0';
    fillStyle = fucks[0];
    end = performance.now() + 1000;
    constructor(x, y) {
        super(x, y);
    }
    update() {
        ++this.ups;

    }
    redraw() {
        ++this.fps;
        if (performance.now() >= this.end) {
            this.end += 1000;
            this.text = 'FPS:' + this.fps;
            this.text0 = 'UPS:' + this.ups;
            this.fps = 0;
            this.ups = 0;
        }
        this.zoiea.context.font = this.font;
        this.zoiea.context.textAlign = this.textAlign;
        this.zoiea.context.textBaseline = this.textBaseline;
        this.zoiea.context.fillStyle = this.fillStyle;
        this.zoiea.context.fillText('-dubug-', this.x + 8, 32);
        this.zoiea.context.fillText(this.text, this.x + 8, 44);
        this.zoiea.context.fillText(this.text0, this.x + 8, 56);
        this.zoiea.context.fillText(`zealot:(${(this.zoiea.zoiea?.x >> 0)},${this.zoiea.zoiea?.y >> 0})`, this.x + 8, 68);
        this.zoiea.context.fillText(`object:(${this.zoiea.width},${this.zoiea.height})`, this.x + 8, 80);
        this.zoiea.context.fillText('import:' + Zoiea.id, this.x + 8, 92);
        this.zoiea.context.fillText('export:' + this.zoiea.id, this.x + 8, 104);
        this.zoiea.context.fillText('active:' + (this.zoiea.zoieas.length + this.zoiea.ui.length + 1), this.x + 8, 116);
        this.zoiea.context.fillText('gamepad:', this.x + 8, 128);
        this.zoiea.context.fillStyle = fucks[this.zoiea.L];
        this.zoiea.context.fillText('L', this.x + 8, 148);
        this.zoiea.context.fillStyle = fucks[this.zoiea.U];
        this.zoiea.context.fillText('U', this.x + 16, 140,);
        this.zoiea.context.fillStyle = fucks[this.zoiea.D];
        this.zoiea.context.fillText('D', this.x + 16, 156);
        this.zoiea.context.fillStyle = fucks[this.zoiea.R];
        this.zoiea.context.fillText('R', this.x + 24, 148);
        this.zoiea.context.fillStyle = fucks[this.zoiea.s];
        this.zoiea.context.fillText('s', this.x + 36, 156);
        this.zoiea.context.fillStyle = fucks[this.zoiea.S];
        this.zoiea.context.fillText('S', this.x + 44, 156);
        this.zoiea.context.fillStyle = fucks[this.zoiea.B];
        this.zoiea.context.fillText('B', this.x + 56, 156);
        this.zoiea.context.fillStyle = fucks[this.zoiea.A];
        this.zoiea.context.fillText('A', this.x + 64, 156);
        this.zoiea.context.fillStyle = this.fillStyle;
        this.zoiea.context.fillText('-dubug-', this.x + 8, 168);
    }
}

export { Debug }