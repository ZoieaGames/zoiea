import { Zoiea } from './zoiea.js';
import { coin0, coin1, coin2, coin3 } from './sprite.js';

const images = [coin1, coin2, coin3, coin0];
const fucks = [
    0, 0, -5, -5, -4, -3, -4, -3, -3, -2, -2, -2, -2, -2, 0, -1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 3, 4, 5
];

class Coin extends Zoiea {
    constructor(x, y) {
        super(x, y, coin1);
        this.step = 1;
        this.state = 1;
        this.count = 0;
        this.ghost = true;
    }
    update() {
        if (++this.step % 2 === 0) {
            this.image = images[this.state];
            if (++this.state === 4) {
                this.state = 0;
                if (++this.count === 4) {
                    this.update = this.update0;
                }
            }
        }
        this.y += fucks[this.step];
    }
    update0() {
        this.refuse();
    }
}

export { Coin };