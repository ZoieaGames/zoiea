import { Zoiea } from './zoiea.js';
import { villian0, villian1, villian2, villian3, villian4 } from './sprite.js';

const images = [villian0, villian1];

class Villian extends Zoiea {
    constructor(x, y, sign) {
        super(x + 1, y + 6, villian0);
        this.width -= 2;
        this.height -= 6;
        this.sign = sign - 1;
        this.state = 0;
        this.shit = true;
    }
    redraw(zoiea) {
        zoiea.context.drawImage(this.image, this.x - 1, this.y - 5);
    }
    fuck() {
        this.ghosted = true;
        this.shit = false;
        this.update = this.update0;
    }
    hell(zoiea) {
        this.ghost = true;
        this.image = this.a === 1 ? villian3 : villian4;
        this.tick = 0;
        this.jump = 1;
        this.update = this.update2;
        zoiea.media.play(12);
    }
    update(zoiea) {
        if (zoiea.step % 8 === 0) {
            this.state = (this.state + 1) % 2;
            this.image = images[this.state];
        }
        this.x += this.sign * .5;
        if (this.jump == 2) {
            if (++this.tick < 8) {
                this.c = Math.pow(this.tick / 7, 2) * 4;
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
    update0() {
        this.image = villian2;
        this.y += 9;
        this.step = 0;
        this.update = this.update1;
    }
    update1() {
        if (++this.step === 32) {
            this.refuse();
        }
    }
    update2() {
        this.x += this.a;
        if (this.jump === 1) {
            if (++this.tick < 8) {
                this.y -= (1 - Math.pow(this.tick / 7, 2)) * 4;
            } else {
                this.y = Math.round(this.y);
                this.tick = 0;
                this.jump = 2;
            }
        } else if (this.jump == 2) {
            if (++this.tick < 8) {
                this.c = Math.pow(this.tick / 7, 2) * 4;
                this.y += this.c;
            } else {
                this.y += this.c;
            }
        }
    }
    check(zoiea) {
        let result;
        for (const z of zoiea.zoieas) {
            if (z === this || z.ghost || z.invisible) {
                continue;
            }
            if (z.shell && z.shit) {
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
                        this.falling = false;
                        this.y -= result[1];
                        if (this.jump) {
                            this.jump = 0;
                        } else {
                            this.a = 1;
                            this.hell(zoiea);
                        }
                        break;
                }
            }
        }
    }
}

export { Villian };