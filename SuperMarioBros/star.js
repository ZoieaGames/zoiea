import { Zoiea } from './zoiea.js';
import { star0, star1, star2, star3 } from './sprite.js';

const images = [star0, star1, star2, star3];

class Star extends Zoiea {
    constructor(x, y) {
        super(x + 1, y + 5, star0);
        this.width -= 2;
        this.height -= 6;
        this.step = 1;
        this.z = y - this.height;
        this.state = 0;
        this.dung = true;
        this.invisible = true;
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
    update1(zoiea) {
        if (++this.step % 2 === 0) {
            this.state = (this.state + 1) % 4;
            this.image = images[this.state];
        }
        if (this.step < 5) {
            ++this.x;
        } else {
            this.sign = 1;
            zoiea.remove(this);
            zoiea.append(this);
            this.update = this.update2;
        }
    }
    update2(zoiea) {
        if (++this.step % 2 === 0) {
            this.state = (this.state + 1) % 4;
            this.image = images[this.state];
        }
        this.x += this.sign;
        if (this.jump === 1) {
            if (++this.tick < 28) {
                this.y -= (1 - Math.pow(this.tick / 27, 2)) * 2;
            } else {
                this.y = Math.round(this.y);
                this.tick = 0;
                this.jump = 2;
            }
        } else if (this.jump == 2) {
            if (++this.tick < 28) {
                this.c = Math.pow(this.tick / 27, 2) * 3;
                this.y += this.c;
            } else {
                this.y += this.c;
            }
        }
        this.falling = true;
        this.check(zoiea);
        if (this.falling && !this.jump) {
            this.tick = 0;
            this.jump = 2;
        }
    }
    update3() {
        this.refuse();
    }
    check(zoiea) {
        let result;
        for (const z of zoiea.zoieas) {
            if (z === this || z.ghost || z.invisible || z.shit) {
                continue;
            }
            if (result = this.collide(z)) {
                if (result[1] === 0) {
                    if (result[0] === 3) {
                        this.falling = false;
                    }
                    continue;
                }
                switch (result[0]) {
                    case 1:
                        this.x -= result[1];
                        this.sign *= -1;
                        break;
                    case 2:
                        this.x += result[1];
                        this.sign *= -1;
                        break;
                    case 3:
                        this.y -= result[1];
                        this.y -= 4;
                        this.tick = 0;
                        this.jump = 1;
                        zoiea.remove(this);
                        zoiea.append(this);
                        break;
                }
            }
        }
    }
}

export { Star }