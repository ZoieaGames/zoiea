import { Zoiea } from './zoiea.js';
import { Text } from './text.js';

const fucks = ['rgba(255,255,255,.5)', 'rgba(0,0,0,.5)'];

class Debug extends Text {
    constructor() {
        super(0, 0, '', 8);
        this.fillStyle = 'rgba(255,255,255,.5)';
        this.text = 'FPS:0';
        this.text0 = 'UPS:0';
        this.ups = 0;
        this.fps = 0;
        this.end = performance.now() + 1000;
    }
    update() {
        ++this.ups;

    }
    redraw(zoiea) {
        ++this.fps;
        if (performance.now() >= this.end) {
            this.end += 1000;
            this.text = 'FPS:' + this.fps;
            this.text0 = 'UPS:' + this.ups;
            this.fps = 0;
            this.ups = 0;
        }
        zoiea.context.font = this.font;
        zoiea.context.textAlign = this.textAlign;
        zoiea.context.textBaseline = this.textBaseline;
        zoiea.context.fillStyle = this.fillStyle;
        zoiea.context.fillText('-dubug-', 8, 32);
        zoiea.context.fillText(this.text, 8, 44);
        zoiea.context.fillText(this.text0, 8, 56);
        zoiea.context.fillText(`zealot:(${(zoiea.zoiea.x >> 0)},${zoiea.zoiea.y >> 0},${zoiea.zoiea.sign})`, 8, 68);
        zoiea.context.fillText(`object:(${zoiea.x >> 0},${zoiea.y >> 0},${zoiea.width},${zoiea.height})`, 8, 80);
        zoiea.context.fillText('import:' + Zoiea.id, 8, 92);
        zoiea.context.fillText('export:' + zoiea.id, 8, 104);
        zoiea.context.fillText('active:' + (zoiea.zoieas.length + zoiea.ui.length + 1), 8, 116);
        zoiea.context.fillText('gamepad:', 8, 128);
        zoiea.context.fillStyle = fucks[zoiea.L];
        zoiea.context.fillText('L', 8, 148);
        zoiea.context.fillStyle = fucks[zoiea.U];
        zoiea.context.fillText('U', 16, 140,);
        zoiea.context.fillStyle = fucks[zoiea.D];
        zoiea.context.fillText('D', 16, 156);
        zoiea.context.fillStyle = fucks[zoiea.R];
        zoiea.context.fillText('R', 24, 148);
        zoiea.context.fillStyle = fucks[zoiea.s];
        zoiea.context.fillText('s', 36, 156);
        zoiea.context.fillStyle = fucks[zoiea.S];
        zoiea.context.fillText('S', 44, 156);
        zoiea.context.fillStyle = fucks[zoiea.B];
        zoiea.context.fillText('B', 56, 156);
        zoiea.context.fillStyle = fucks[zoiea.A];
        zoiea.context.fillText('A', 64, 156);
        zoiea.context.fillStyle = this.fillStyle;
        zoiea.context.fillText('-dubug-', 8, 168);
    }
}

export { Debug }