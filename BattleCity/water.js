import { Zoiea } from './zoiea.js';
import image from './image.js';

const images = [image.water1, image.water2];

class Water extends Zoiea {
    type = 2;
    index = 0;
    tick = 0;
    constructor(x, y) {
        super(x, y, images[0]);
    }
    update() {
        if (++this.tick % 32 == 0) {
            this.image = images[this.index = (this.index + 1) % 2];
        }
    }
}
export { Water }