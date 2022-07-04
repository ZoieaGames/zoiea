import { Zoiea } from './zoiea.js';
import image from './image.js';

const images = [
    image.bomb1, image.bomb2, image.bomb3, image.bomb4, image.bomb5, image.bomb4, image.bomb3, image.bomb2, image.bomb1
];

const fucks = [0, 0, 0, -8, 0, 0, 8, 0, 0];

class Bomb extends Zoiea {
    tick = 0;
    index = 0;
    constructor(x, y, type) {
        super(x - 8, y - 8, images[0]);
        if (type) {
            this.update = this.bombUpdate;
        }
    }
    update() {
        if (++this.tick % 4 === 0) {
            if (this.index === 2) {
                this.refuse();
                this.update = undefined;
                return;
            }
            this.image = images[++this.index];
        }
    }
    bombUpdate() {
        if (++this.tick % 4 === 0) {
            if (this.index === 8) {
                this.refuse();
                this.update = undefined;
                return;
            }
            this.image = images[++this.index];
            this.x += fucks[this.index];
            this.y += fucks[this.index];
        }
    }
}

export { Bomb }