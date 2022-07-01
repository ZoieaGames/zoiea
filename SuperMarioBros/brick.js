import { Zoiea } from './zoiea.js';
import { brick1, debris0, debris1 } from './sprite.js';

const images = [debris0, debris1];
const fucks = [-2, -2, -1, 0, -1, 0, 0, 1, 1, 1, 1, 2, 2, -1];

class Brick extends Zoiea {
    constructor(x, y) {
        super(x, y, brick1);
    }
    redraw0(zoiea) {
        const image = images[this.state];
        zoiea.context.drawImage(image, this.x - this.step, this.y - this.step);
        zoiea.context.drawImage(image, this.x + 8 + this.step, this.y - this.step);
        zoiea.context.drawImage(image, this.x - this.step, this.y + 8 + this.step);
        zoiea.context.drawImage(image, this.x + 8 + this.step, this.y + 8 + this.step);
    }
    fuck(zoiea) {
        if (zoiea.zoiea.level) {
            this.y -= 4;
            this.step = 0;
            this.state = 0;
            this.update = this.update3;
            this.redraw = this.redraw0;
            zoiea.media.play(10);
        } else {
            this.y -= 1;
            this.funcking = 0;
            this.update = this.update0;
        }
    }
    update0() {
        this.y += fucks[this.funcking];
        if (++this.funcking === 14) {
            this.update = undefined;
        }
    }
    update1() {
        if (++this.step % 8 === 0) {
            this.state = (this.state + 1) % 2;
        }
        if (++this.tick < 16) {
            this.y -= (1 - Math.pow(this.tick / 15, 2)) * 4;
        } else {
            this.y = Math.round(this.y);
            this.tick = 0;
            this.update = this.update2;
        }
    }
    update2() {
        if (++this.step % 8 === 0) {
            this.state = (this.state + 1) % 2;
        }
        if (++this.tick < 32) {
            this.c = Math.pow(this.tick / 31, 2) * 8;
            this.y += this.c;
        } else {
            this.y += this.c;
        }
    }
    update3() {
        this.update = this.update4;
    }
    update4(zoiea) {
        this.ghost = true;
        this.tick = 0;
        this.update = this.update1;
        zoiea.remove(this);
        zoiea.append(this);
    }
}

export { Brick }