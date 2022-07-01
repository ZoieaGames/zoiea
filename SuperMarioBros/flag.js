import { Zoiea } from './zoiea.js';
import { flag1, pole1 } from './sprite.js';

class Flag extends Zoiea {
    constructor(x, y) {
        super(x + 12, y, pole1);
        this.flag = true;
        this.offset = 0;
    }
    fuck() {
        this.ghost = true;
        this.offset += 2;
        this.step = 61;
        this.update = this.update0;

    }
    update0() {
        if (--this.step) {
            this.offset += 2;
        } else {
            this.update = undefined;
        }
    }
    redraw(zoiea) {
        zoiea.context.drawImage(pole1, this.x, this.y);
        zoiea.context.drawImage(flag1, this.x - 12, this.y + 9 + this.offset);
    }
}

export { Flag }