import { Zoiea } from './zoiea.js';
import image from './image.js';

class Plate extends Zoiea {
    type = 3;
    constructor(x, y) {
        super(x, y, image.plate1);
    }
    bomb(zoiea) {
        if (zoiea.level === 4) {
            this.refuse();
            return;
        }
        if (zoiea.camp === 1) {
            this.zoiea.media.play(3);
        }
    }
}

export { Plate }