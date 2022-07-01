import { Zoiea } from './zoiea.js';
import { ball0, ball1, ball2, ball3, ball20, ball21, ball22, ball23, bomb0, bomb1, bomb2 } from './sprite.js';

const images = {
    1: [ball0, ball1, ball2, ball3],
    '-1': [ball20, ball21, ball22, ball23]
};

const fucks = [bomb0, bomb1, bomb2];

class Bomb extends Zoiea {
    constructor(x, y, sign = 0) {
        super(x + 1, y + 1, ball0);
        this.width -= 2;
        this.height -= 2;
        this.state = 0;
        this.sign = sign;
        this.ghost = true;
        if (sign === 0) {
            this.update = this.update1;
        }
    }
    redraw(zoiea) {
        zoiea.context.drawImage(this.image, this.x - 1, this.y - 1);
    }
    reduce(zoiea) {
        if (this.refused || this.x + this.width < zoiea.x - zoiea.w || this.y > zoiea.y + zoiea.height + zoiea.h) {
            zoiea.remove(this);
            zoiea.reduce();
            ++zoiea.zoiea.bullet;
        }
    }
    update(zoiea) {
        if (zoiea.step % 4 === 0) {
            this.state = (this.state + 1) % 4;
            this.image = images[this.sign][this.state];
        }
        this.x += this.sign * 4;
        if (this.jump === 1) {
            if (++this.tick < 8) {
                this.y -= (1 - Math.pow(this.tick / 7, 2)) * 2.5;
            } else {
                this.y = Math.round(this.y);
                this.tick = 0;
                this.jump = 2;
            }
        } else if (this.jump == 2) {
            if (++this.tick < 8) {
                this.c = Math.pow(this.tick / 7, 2) * 2.5;
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
        if (++this.step % 2 === 0) {
            if (++this.state === 3) {
                this.refuse();
                this.update = undefined;
            } else {
                this.image = fucks[this.state];
            }
        }
    }
    update1(zoiea) {
        this.image = bomb0;
        this.state = 0;
        this.step = 0;
        this.update = this.update0;
        zoiea.media.play(9);
    }
    check(zoiea) {
        let result;
        for (const z of zoiea.zoieas) {
            if (z === this || z.ghost || z.invisible || z.level) {
                if (!z.shell) {
                    continue;
                }
            }
            if (result = this.collide(z)) {
                if (result[1] === 0) {
                    if (result[0] === 3) {
                        this.falling = false;
                    }
                    continue;
                }
                if (result[0] === 3) {
                    this.y -= result[1];
                    this.tick = 0;
                    this.jump = 1;
                    continue;
                }
                if (z.shit || z.shell) {
                    if (this.x < z.x) {
                        z.a = 1;
                    } else {
                        z.a = -1;
                    }
                    z.hell(zoiea);
                } else {
                    zoiea.media.play(9);
                }
                this.image = bomb0;
                this.x -= 4;
                this.y -= 4;
                this.state = 0;
                this.step = 0;
                this.update = this.update0;
                break;
            }
        }
    }
}

export { Bomb }