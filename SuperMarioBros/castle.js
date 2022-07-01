import { Zoiea } from './zoiea.js';
import { castle1 } from './sprite.js';
import { Agaric } from './agaric.js';

class Castle extends Zoiea {
    constructor(x, y) {
        super(x + 48, y + 48, castle1);
        this.width = 32;
        this.height = 32;
    }
    fuck() {
        this.update = this.update0;
    }
    update0(zoiea) {
        zoiea.time.update = zoiea.time.update0;
        this.update = this.update1;
        zoiea.media.play(16, true);
    }
    update1(zoiea) {
        if (zoiea.time.time > 0) {
            --zoiea.time.time;
        } else {
            this.step = 8;
            this.update = this.update2;
            zoiea.media.stop(16);
        }
    }
    update2(zoiea) {
        if (--this.step === 0) {
            zoiea.insert(this, new Agaric(this.x - 16, this.y - 48, 2));
            this.update = undefined;
        }
    }
    redraw(zoiea) {
        zoiea.context.drawImage(this.image, this.x - 48, this.y - 48);
    }
}

export { Castle }