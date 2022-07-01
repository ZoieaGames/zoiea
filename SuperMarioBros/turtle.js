import { Zoiea } from './zoiea.js';
import { turtle0, turtle1, turtle2, turtle3, turtle20, turtle21 } from './sprite.js';


const images = {
    1: [turtle20, turtle21],
    '-1': [turtle0, turtle1]
};

class Turtle extends Zoiea {
    constructor(x, y) {
        super(x + 1, y + 11, images[-1][0]);
        this.width -= 2;
        this.height -= 11;
        this.sign = -1;
        this.state = 0;
        this.shit = true;
    }
    redraw(zoiea) {
        zoiea.context.drawImage(this.image, this.x - 1, this.y - 10);
    }
    fuck() {
        this.shit = false;
        this.shell = true;
        this.update = this.update0;
    }
    fart() {
        if (this.shit) {
            this.shit = false;
            this.update = undefined;
        } else {
            this.ghost = true;
            this.x += this.sign * 3;
            this.update = this.update1;
        }
    }
    hell(zoiea) {
        this.ghost = true;
        this.shell = false;
        this.image = turtle3;
        this.tick = 0;
        this.jump = 1;
        this.update = this.update2;
        zoiea.media.play(12);
    }
    update(zoiea) {
        if (zoiea.step % 8 === 0) {
            this.state = (this.state + 1) % 2;
            this.image = images[this.sign][this.state];
        }
        this.x += this.sign * .5;
        if (this.jump == 2) {
            if (++this.tick < 12) {
                this.c = Math.pow(this.tick / 11, 2) * 4;
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
        this.image = turtle2;
        this.y += 8;
        this.height -= 8;
        this.update = undefined;
    }
    update1(zoiea) {
        this.x += this.sign * 3;
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
                if (this.shell && (this.ghost || this.shit) && z.shit) {
                    if (this.x < z.x) {
                        z.a = 1;
                    } else {
                        z.a = -1;
                    }
                    z.hell(zoiea);
                    continue;
                }
                switch (result[0]) {
                    case 1:
                        this.ghost = false;
                        this.shit = true;
                        this.x -= result[1];
                        this.sign *= -1;
                        zoiea.media.play(2);
                        break;
                    case 2:
                        this.ghost = false;
                        this.shit = true;
                        this.x += result[1];
                        this.sign *= -1;
                        zoiea.media.play(2);
                        break;
                    case 3:
                        this.falling = false;
                        this.y -= result[1];
                        if (this.jump) {
                            this.jump = 0;
                        } else {
                            this.a = 1;
                            this.hell();
                        }
                        break;
                }
            }
        }
    }
}

export { Turtle };