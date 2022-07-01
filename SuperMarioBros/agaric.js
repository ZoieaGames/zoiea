import { Zoiea } from './zoiea.js';
import { agaric0, agaric1, flag2 } from './sprite.js';
import { Bomb } from './bomb.js';

class Agaric extends Zoiea {
    constructor(x, y, type = 0, sign = 1) {
        super(x + 1, y + 5, agaric0);
        this.width -= 2;
        this.height -= 6;
        this.step = 1;
        this.type = type;
        this.sign = sign;
        this.z = y - this.height;
        if (type === 1) {
            this.image = agaric1;
            this.up = 1;
        } else if (type === 2) {
            this.image = flag2;
            this.ghost = true;
        } else {
            this.bitch = true;
        }
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
    update0(zoiea) {
        if (++this.step % 4 === 0) {
            if (--this.y === this.z) {
                if (this.type === 2) {
                    zoiea.append(new Bomb(this.x - 16, this.y - 64));
                    zoiea.zoiea.over(zoiea);
                    this.update = undefined;
                } else {
                    this.step = 0;
                    this.update = this.update1;
                }
            }
        }
    }
    update1() {
        if (++this.step < 5) {
            ++this.x;
        } else {
            this.update = this.update2;
        }
    }
    update2(zoiea) {
        this.x += this.sign;
        if (this.jump === 1) {
            if (++this.tick < 12) {
                this.y -= (1 - Math.pow(this.tick / 11, 2)) * 4;
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
            if (z === this || z.ghost || z.invisible) {
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
                            this.y -= 4;
                            this.jump = 1;
                        }
                        break;
                }
            }
        }
    }
}

export { Agaric }