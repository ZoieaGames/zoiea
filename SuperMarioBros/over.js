import { Text } from './text.js';

class Over extends Text {
    constructor(text = 'GAME OVER') {
        super(0, 0, text, 32, 'center', 'middle');
        this.min = performance.now() + 500;
        this.max = this.min + 500;
    }
    redraw(zoiea) {
        super.redraw(zoiea);
        if (performance.now() < this.min) {
            zoiea.context.font = '16px monospace';
            zoiea.context.fillText('press Enter to continue', zoiea.w, zoiea.h + 32);
        } else if (performance.now() > this.max) {
            this.min += 1000;
            this.max += 1000;
        }
    }

}

export { Over }