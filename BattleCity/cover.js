import { Zoiea } from './zoiea.js';
import image from './image.js';

const images = [image.cover1, image.cover2];

class Cover extends Zoiea {
    index = 0;
    constructor(x, y, zoiea, tick) {
        super(x, y, images[0]);
        this.tank = zoiea;
        this.tick = tick;
    }
    update() {
        if (this.tick) {
            if (--this.tick % 2 == 0) {
                this.image = images[this.index = (this.index + 1) % 2];
            }
            return;
        }
        this.refuse();
        this.tank.cover = undefined;
    }
}
export { Cover }