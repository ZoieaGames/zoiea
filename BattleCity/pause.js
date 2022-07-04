import { Text } from './text.js';

class Pause extends Text {
    min = performance.now() + 500;
    max = this.min + 500;
    constructor(text = 'PAUSED') {
        super(0, 0, text, 16, 'center', 'middle');
    }
    redraw() {
        super.redraw(this.zoiea);
        if (performance.now() < this.min) {
            this.zoiea.context.font = '8px monospace';
            this.zoiea.context.fillText('press Enter to continue', this.zoiea.w, this.zoiea.h + 16);
        } else if (performance.now() > this.max) {
            this.min += 1000;
            this.max += 1000;
        }
    }

}

export { Pause }