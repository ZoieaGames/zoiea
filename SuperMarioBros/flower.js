import { Zoiea } from './zoiea.js';
import { flower0, flower1, flower2, flower3 } from './sprite.js';

const images = [flower0, flower1, flower2, flower3];

class Flower extends Zoiea {
    constructor(x, y) {
        super(x + 1, y + 5, flower0);
        this.width -= 2;
        this.height -= 6;
        this.step = 1;
        this.z = y - this.height;
        this.state = 0;
        this.invisible = true;
        this.bitch = true;
    }
    redraw(zoiea) {
        zoiea.context.drawImage(this.image, this.x - 1, this.y - 5);
    }
    fuck() {
        this.ghost = true;
        this.update = this.update3;
    }
    update() {
        if (++this.step % 4 === 0) {
            this.y -= 4;
            this.update = this.update0;
        }
    }
    update0() {
        if (++this.step % 2 === 0) {
            this.state = (this.state + 1) % 4;
            this.image = images[this.state];
        }
        if (this.step % 4 === 0) {
            if (--this.y === this.z) {
                this.update = this.update1;
            }
        }
    }
    update1() {
        if (++this.step % 2 === 0) {
            this.state = (this.state + 1) % 4;
            this.image = images[this.state];
        }
        if (this.step < 5) {
            ++this.x;
        } else {
            this.update = this.update2;
        }
    }
    update2() {
        if (++this.step % 2 === 0) {
            this.state = (this.state + 1) % 4;
            this.image = images[this.state];
        }
    }
    update3() {
        this.refuse();
    }
}

export { Flower }