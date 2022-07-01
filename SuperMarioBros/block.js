import { Zoiea } from './zoiea.js';
import { block0, block1, block2, plate1, brick1 } from './sprite.js';
import { Coin } from './coin.js';
import { Flower } from './flower.js';
import { Agaric } from './agaric.js';
import { Star } from './star.js';

const images = [block0, block0, block0, block1, block2, block1];
const fucks = [-2, -2, -1, 0, -1, 0, 0, 1, 1, 1, 1, 2, 2, -1];

class Block extends Zoiea {
    constructor(x, y, type) {
        super(x, y, block0);
        this.type = type;
        if (type === 2 || type === 3) {
            if (type === 3) {
                this.limit = 240;
            }
            this.image = brick1;
            this.update = undefined;
        }
        if (this.type === 4) {
            this.invisible = true;
            return;
        }
    }
    redraw(zoiea) {
        if (this.invisible) {
            return;
        }
        zoiea.context.drawImage(this.image, this.x, this.y);
    }
    fuck(zoiea) {
        this.y -= 1;
        this.fucking = 0;
        this.invisible = false;
        if (this.type !== 3 || this.limit === 0) {
            this.fuck = undefined;
            this.image = plate1;
        }
        this.update = this.update0;
        if (this.type === 0 || this.type === 3) {
            zoiea.append(new Coin(this.x + 5, this.y - 20));
            zoiea.media.play(5);
        } else if (this.type === 1 || this.type === 2 || this.type === 4) {
            zoiea.media.play(4);
        }
    }
    update(zoiea) {
        if (zoiea.step % 8 === 0) {
            this.image = images[zoiea.step % 48 * .125];
        }
    }
    update0(zoiea) {
        if (this.limit) {
            --this.limit;
        }
        this.y += fucks[this.fucking];
        if (++this.fucking === 14) {
            this.update = undefined;
            if (this.type === 1) {
                if (zoiea.zoiea.level) {
                    zoiea.insert(this, new Flower(this.x, this.y - 1));
                } else {
                    zoiea.insert(this, new Agaric(this.x, this.y - 1));
                }
            } else if (this.type === 2) {
                zoiea.insert(this, new Star(this.x, this.y));
            } else if (this.type === 3) {
                this.update = this.update1;
            } else if (this.type === 4) {
                zoiea.insert(this, new Agaric(this.x, this.y - 1, 1));
            }
        }
    }
    update1() {
        if (this.limit) {
            --this.limit;
        } else {
            this.update = undefined;
        }
    }
}

export { Block }