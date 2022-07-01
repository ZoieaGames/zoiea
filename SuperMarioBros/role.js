import { Zoiea } from './zoiea.js';
import {
    role0, role1, role2, role3, role4, role5, role6, role7, role8,
    role10, role11, role12, role13, role14, role15, role16, role17, role18,
    role20, role21, role22, role23, role24, role25, role26, role27, role28,
    role30, role31, role32, role33, role34, role35, role36, role37, role38,
    role49, role59, role79, role89, role99, bitmap
} from './sprite.js';
import { Bomb } from './bomb.js';

const images = [{
    1: [role1, role2, role3, role4, role5, role0, role7, role8],
    '-1': [role11, role12, role13, role14, role15, role10, role17, role18]
}, {
    1: [role21, role22, role23, role24, role25, role20, role27, role28, role49],
    '-1': [role31, role32, role33, role34, role35, role30, role37, role38, role59]
}];

const change0 = (image, a, b, c, r, s, t, x, y, z) => {
    const canvas = new OffscreenCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const data = context.getImageData(0, 0, image.width, image.height);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
        if (d[i] === 181) {
            d[i] = a;
            d[i + 1] = b;
            d[i + 2] = c;
        } else if (d[i] === 108) {
            d[i] = r;
            d[i + 1] = s;
            d[i + 2] = t;
        } else if (d[i] === 235) {
            d[i] = x;
            d[i + 1] = y;
            d[i + 2] = z;
        }
    }
    context.putImageData(data, 0, 0);
    return canvas.transferToImageBitmap();
};

const change1 = (a, b, c, r, s, t, x, y, z) => {
    const image0 = {};
    for (const [key, value] of Object.entries(images[1])) {
        const value0 = [];
        for (const v of value) {
            value0.push(change0(v, a, b, c, r, s, t, x, y, z));
        }
        image0[key] = value0;
    }
    return image0;
}

const change = (a, b, c, r, s, t, x, y, z) => {
    const images0 = [];
    for (const image of images) {
        const image0 = {};
        for (const [key, value] of Object.entries(image)) {
            const value0 = [];
            for (const v of value) {
                value0.push(change0(v, a, b, c, r, s, t, x, y, z));
            }
            image0[key] = value0;
        }
        images0.push(image0);
    }
    return images0;
}

const images0 = [
    images,
    change(13, 148, 0, 235, 159, 35, 254, 254, 254),
    change(181, 50, 32, 235, 159, 35, 254, 254, 254),
    change(0, 0, 0, 153, 79, 0, 254, 205, 198),
];

images.push(change1(247, 217, 166, 181, 50, 32, 235, 159, 35));


images0[1].push(images0[1][1]);
images0[2].push(images0[2][1]);
images0[3].push(images0[3][1]);


const role29 = (() => {
    const canvas = new OffscreenCanvas(16, 32);
    const context = canvas.getContext('2d');
    context.drawImage(images[2][1][2], 0, 0, 16, 11, 0, 0, 16, 11);
    context.drawImage(bitmap, 32, 64, 16, 11, 0, 11, 16, 11);
    context.drawImage(images[2][1][2], 0, 22, 16, 10, 0, 22, 16, 10);
    return canvas.transferToImageBitmap();
})();

const role39 = (() => {
    const canvas = new OffscreenCanvas(16, 32);
    const context = canvas.getContext('2d');
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(role29, 0, 0);
    return canvas.transferToImageBitmap();
})();

const image = {
    1: [role89, role0, role89, role0, role89, role20, role0, role89, role20, role0],
    '-1': [role99, role10, role99, role10, role99, role30, role10, role99, role30, role10]
}

const fucks = [-8, +8, -8, +8, -8, -8, 16, -8, -8, 16];

const image0 = {
    1: [role26, role6],
    '-1': [role36, role16]
}

const fucks0 = [-16, 16];

class Role extends Zoiea {
    index = 0;
    level = 0;
    sign = 1;
    images = images0[0][0][1];
    status = -1;
    a = 0;
    jumped = -1;
    bullet = 2;
    constructor(x, y) {
        super(x + 2, y + 3, y < 0 ? role1 : role0);
        this.width -= 4;
        this.height -= 3;
        this.ghost = true;
    }
    redraw(zoiea) {
        if (this.invisible) {
            return;
        }
        zoiea.context.drawImage(this.image, this.x - 2, this.y - 2);
    }
    go(zoiea, sign) {
        if (this.finished || !zoiea.playing) {
            return;
        }
        if (this.crouched && this.jumped === -1) {
            this.crouch(zoiea, false);
            return;
        }
        if (this.status === 3 && this.sign !== sign) {
            this.sign = sign;
            this.images = images0[this.index][this.level][sign];
            this.going = true;
            this.status = 4;
        } else if (!this.going) {
            this.sign = sign;
            this.images = images0[this.index][this.level][sign];
            this.going = true;
            if (this.status === -1) {
                this.status = 0;
            } else if (this.status === 2) {
                this.step = this.count * 8;
                this.last = 0;
            }
        }
    }
    jump(zoiea) {
        if (this.finished || !zoiea.playing) {
            return;
        }
        if (!this.jumping) {
            this.jumping = true;
            if (this.jumped === -1) {
                this.jumped = 0;
                zoiea.media.play(1);
            }
        }
    }
    crouch(zoiea, crouching) {
        if (this.finished || !zoiea.playing) {
            return;
        }
        if (crouching) {
            if (this.jumped === -1 && this.level) {
                if (!this.crouching) {
                    this.crouching = true;
                    this.image = this.images[this.state = 8];
                    this.y += 8;
                    this.height -= 8;
                    this.crouched = true;
                }
            }
        } else {
            if (this.crouching && this.jumped === -1) {
                this.crouching = false;
                this.image = this.images[this.state = 5];
                this.y -= 8;
                this.height += 8;
                this.crouched = false;
            }
        }
    }
    fire(zoiea) {
        if (this.finished || !zoiea.playing) {
            return;
        }
        if (!this.firing) {
            this.firing = true;
            if (this.level === 2 && this.bullet && !this.crouched) {
                this.image = this.sign === 1 ? role29 : role39;
                this.fired = 8;
                --this.bullet;
                zoiea.append(new Bomb(this.x + 2, this.y + 1, this.sign));
                zoiea.media.play(8);
            }
        }
    }
    update(zoiea) {
        switch (this.status) {
            case 0:
                this.status0();
                break;
            case 1:
                this.status1();
                break;
            case 2:
                this.status2();
                break;
            case 3:
                this.status3();
                break;
            case 4:
                this.status4();
                break;
            case 5:
                this.status5();
                break;
            case 6:
                this.status6();
                break;
            case 7:
                this.status7();
                break;
        }
        switch (this.jumped) {
            case 0:
                this.jump0();
                break;
            case 1:
                this.jump1();
                break;
            case 2:
                this.jump2();
                break;
            case 3:
                this.jump3(zoiea);
                break;
            case 4:
                this.jump4();
                break;
            case 5:
                this.jump5();
                break;
            case 6:
                this.jump6();
                break;
        }
        if (this.crouched && this.level) {
            this.image = this.images[this.state = 8];
        }
        this.check(zoiea);
    }

    update0() {
        this.image = this.images[this.state = 1];
        this.tick = 0;
        this.update = this.update1;
    }

    update1() {
        if (++this.tick === 6) {
            this.image = this.images[this.state = 5];
            this.tick = 0;
            this.fucking = 0;
            this.update = this.update2;
        }
    }

    update2() {
        if (this.tick++ % 4 === 0) {
            this.image = image[this.sign][this.fucking];
            this.y += fucks[this.fucking];
            if (++this.fucking === 9) {
                this.level = 1;
                this.images = images0[this.index][1][this.sign];
                this.height += 16;
                if (this.jumped !== -1) {
                    this.sign0 = this.sign;
                    this.state0 = 0;
                    this.images0 = this.images;
                    this.tick = 0;
                    this.jumped = 6;
                }
                delete this.update;
            }
        }
    }

    update3() {
        if (++this.tick === 8) {
            this.tick = 0;
            this.fucking = 0;
            this.update = this.update2;
        }
    }

    update4() {
        if (++this.tick === 16) {
            this.tick = 0;
            this.update = this.update5;
        }
    }

    update5() {
        if (++this.tick < 24) {
            this.y -= (1 - Math.pow(this.tick / 23, 2)) * 4;
        } else {
            this.y = Math.round(this.y);
            this.tick = 0;
            this.update = this.update6;
        }
    }

    update6() {
        if (++this.tick < 32) {
            this.c = Math.pow(this.tick / 31, 2) * 5;
            this.y += this.c;
        } else {
            this.y += this.c;
        }
    }

    update7() {
        this.invisible = ++this.step % 2;
        if (this.step === 16) {
            this.image = image0[this.sign][this.state = 0];
            this.sum = 0;
            this.update = this.update8;
        }
    }

    update8() {
        this.invisible = ++this.step % 2;
        if (this.step % 4 == 0) {
            this.state = (this.state + 1) % 2;
            this.image = image0[this.sign][this.state];
            this.y += fucks0[this.state];
            if (++this.sum === 9) {
                this.sum = 160;
                this.update = this.update9;
            }
        }
    }

    update9() {
        this.invisible = --this.sum % 2;
        this.images = images0[this.index][0][this.sign];
        this.height -= 16;
        if (this.jumped === -1) {
            if (this.count) {
                this.jumped = 3;
                this.image = this.images[this.state = 0];
            } else {
                this.jumped = -1;
                this.status = -1;
                this.image = this.images[this.state = 5];
            }
        } else {
            this.images = this.images0;
            this.image = this.images[this.state = this.state0];
        }
        delete this.update;
    }

    update10() {
        if (--this.limit % 4 === 0) {
            this.index = (this.index + 1) % 4;
            this.images = images0[this.index][this.level][this.sign];
            this.image = this.images[this.state];
            if (!this.limit) {
                delete this.update;
            }
        }
    }

    update11(zoiea) {
        this.y += 2;
        if (++this.step % 4 === 0) {
            this.state = (this.state + 1) % 2;
            this.image = this.images[this.state + 6];
        }
        let result;
        for (const z of zoiea.zoieas) {
            if (z === this || z.ghost || z.ghosted) {
                continue;
            }
            if (result = this.collide(z)) {
                if (result[0] === 3) {
                    this.y -= result[1] + 1;
                    this.image = this.images[6];
                    this.update = this.update12;
                    return;
                }
            }
        }
    }
    update12() {
        if (++this.step === 72) {
            this.image = images0[this.index][this.level][-1][6];
            this.x += 12;
            this.update = this.update13;
        }
    }
    update13(zoiea) {
        if (++this.step === 80) {
            this.image = this.images[this.state = 0];
            this.jumped = -1;
            this.update = this.update14;
            zoiea.media.stop(0);
            zoiea.media.stop(19);
            zoiea.media.play(15, true);
        }
    }

    update14(zoiea) {
        this.x += 1.5;
        if (++this.step % 4 === 0) {
            this.state = (this.state + 1) % 3;
            this.image = this.images[this.state];
        }
        switch (this.jumped) {
            case 0:
                this.jump0();
                break;
            case 1:
                this.jump1();
                break;
            case 2:
                this.jump2();
                break;
            case 3:
                this.jump3(zoiea);
                break;
            case 4:
                this.jump4();
                break;
            case 5:
                this.jump5();
                break;
            case 6:
                this.jump6();
                break;
        }
        this.falling = true;
        this.check1(zoiea);
        if (this.falling && this.jumped === -1) {
            this.jumped = 4;
        }
    }

    fuck(z) {
        z.fuck();
        this.falling = false;
        this.state = 0;
        this.sign = 1;
        this.images = images0[this.index][this.level][this.sign];
        this.image = this.images[6];
        this.step = 3;
        this.x = z.x - 8;
        this.update = this.update11
    }

    reborn() {
        this.height -= 16 * (this.level ? 1 : 0);
        this.images = images0[this.index = 0][this.level = 0][this.sign = 1];
        this.image = this.images[this.state0 = this.state = 0];
        this.invincible = this.sum = 0;
        this.finished = this.invisible = this.crouching = this.crouched = false;
        this.jumped = this.status = -1;
        delete this.update;
    }

    check(zoiea) {
        if (this.sum) {
            this.invisible = --this.sum % 2;
        } else if (this.invincible) {
            if (--this.invincible % 2 === 0) {
                this.index = (this.index + 1) % 4;
                this.images = images0[this.index][this.level][this.jumped === -1 ? this.sign : this.sign0];
                this.image = this.images[this.state];
                if (!this.invincible) {
                    zoiea.media.stop(17);
                    zoiea.media.play(zoiea.time.time > 100 ? 0 : 19, true);
                }
            }
        }
        this.falling = true;
        this.check0(zoiea);
        if (this.falling && this.jumped === -1) {
            this.jumped = 4;
        }
        if (this.fired) {
            if (--this.fired) {
                this.image = this.sign === 1 ? role29 : role39;
            } else {
                this.image = this.images[this.state];
            }
        }
    }

    check0(zoiea) {
        let result;
        for (const z of zoiea.zoieas) {
            if (z === this || z.ghost || z.ghosted) {
                continue;
            }
            if (result = this.collide(z)) {
                if (result[1] === 0) {
                    if (result[0] === 3) {
                        this.falling = false;
                    }
                    continue;
                }
                if (z.up) {
                    z.fuck(zoiea);
                    zoiea.time.time += 100;
                    zoiea.media.play(7);
                    continue;
                }
                if (z.bitch) {
                    z.fuck(zoiea);
                    if (this.level) {
                        if (this.level === 1) {
                            this.level = 2;
                            this.images = images0[this.index][this.level][this.sign];
                            this.image = this.images[this.state];
                            this.limit = 64;
                            this.update = this.update10;
                        } else {
                            zoiea.time.time += 100;
                        }
                    } else {
                        if (this.jumped === -1) {
                            this.tick = 0;
                            this.update = this.update3;
                        } else {
                            this.image = this.images[this.state = 0];
                            this.update = this.update0;
                        }
                    }
                    zoiea.media.play(6);
                    continue;
                }
                if (z.dung) {
                    z.fuck(zoiea);
                    this.invincible = 722;
                    this.index = 3;
                    this.images = images0[this.index][this.level][this.sign];
                    this.image = this.images[this.state];
                    zoiea.media.stop(0);
                    zoiea.media.stop(19);
                    zoiea.media.play(17, true);
                    continue;
                }
                if (z.shit) {
                    if (this.invincible) {
                        if (this.x < z.x) {
                            z.a = 1;
                        } else {
                            z.a = -1;
                        }
                        z.hell(zoiea);
                    } else if (!this.sum) {
                        if (result[0] === 3) {
                            this.tick = 0;
                            this.jumped = 6;
                            if (z.shell) {
                                z.fart(zoiea);
                            } else {
                                z.fuck(zoiea);
                            }
                            zoiea.media.play(2);
                        } else {
                            if (this.level) {
                                if (this.crouched) {
                                    this.crouch(zoiea, false);
                                }
                                this.level = 0;
                                this.image = this.images[this.state = 4];
                                this.step = 0;
                                this.update = this.update7;
                                zoiea.media.play(13);
                            } else {
                                this.over(zoiea);
                            }
                        }
                    }
                    continue;
                }
                if (z.flag) {
                    this.finished = true;
                    this.fuck(z);
                    zoiea.media.play(14);
                    return;
                }
                if (z.shell) {
                    if (this.x < z.x) {
                        z.sign = 1
                    } else {
                        z.sign = -1;
                    }
                    z.fart(zoiea);
                    zoiea.media.play(2);
                    continue;
                }
                switch (result[0]) {
                    case 1:
                        this.x -= result[1];
                        break;
                    case 2:
                        this.x += result[1];
                        break;
                    case 3:
                        this.y -= result[1];
                        this.falling = false;
                        this.images = images0[this.index][this.level][this.sign];
                        if (this.count) {
                            this.jumped = 3;
                            this.image = this.images[this.state = 0];
                        } else {
                            this.jumped = -1;
                            this.status = -1;
                            if (this.crouching) {
                                this.crouch(zoiea,false);
                            }
                            this.image = this.images[this.state = 5];
                        }
                        break;
                    case 4:
                        if (this.jumped === 1) {
                            this.y += result[1];
                            this.jumped = 2;
                            z.fuck?.(zoiea);
                            zoiea.media.play(11);
                        }
                        break;
                }
            }
        }
    }

    check1(zoiea) {
        let result;
        for (const z of zoiea.zoieas) {
            if (z === this || z.ghost || z.ghosted) {
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
                        z.fuck?.();
                        this.x -= result[1];
                        this.invisible = true;
                        this.update = undefined;
                        break;
                    case 3:
                        this.y -= result[1];
                        this.falling = false;
                        this.jumped = 3;
                        break;
                }
            }
        }
    }

    over(zoiea) {
        this.image = role79;
        this.y -= 1;
        this.tick = 0;
        this.update = this.update4;
        zoiea.media.stop(0);
        zoiea.media.stop(19);
        zoiea.media.stop(17);
        zoiea.media.stop(15);
        zoiea.media.play(3);
        this.played = true;
    }

    jump6() {
        this.images = this.images0;
        this.image = this.images[this.state = this.state0];
        if (++this.tick < 8) {
            this.y -= (1 - Math.pow(this.tick / 7, 2)) * 2.5;
        } else {
            this.y = Math.round(this.y);
            this.tick = 0;
            this.jumped = 5;
        }
    }

    jump5() {
        this.images = this.images0;
        this.image = this.images[this.state = this.state0];
        if (++this.tick < 8) {
            this.c = Math.pow(this.tick / 7, 2) * 4;
            this.y += this.c;
        } else {
            this.y += this.c;
        }
    }

    jump4() {
        this.sign0 = this.sign;
        this.state0 = this.state;
        this.images0 = this.images;
        this.jumped = 5;
        this.tick = 0;
    }

    jump3(zoiea) {
        this.jumped = -1;
        if (this.crouching) {
            this.crouch(zoiea, false);
        }
        if (this.count < 4) {
            this.status = 2;
            this.step = this.count * 8;
            this.last = 0;
        } else {
            this.status = 3;
        }
        this.image = this.images[this.state = 1];
    }

    jump2() {
        this.images = this.images0;
        this.image = this.images[this.state = this.state0];
        if (++this.tick < 12) {
            this.c = Math.pow(this.tick / 11, 2) * (1.5 + this.limit / 8);
            this.y += this.c;
        } else {
            this.y += this.c;
        }
    }

    jump1() {
        this.images = this.images0;
        this.image = this.images[this.state = this.state0];
        if (++this.tick > 2 && this.jumping && this.limit < 24) {
            this.limit += 2.5;
        }
        if (this.tick < this.limit) {
            this.y -= (1 - Math.pow(this.tick / (this.limit - 1), 2)) * (1.5 + this.limit / 8 + this.a / 4);
        } else {
            this.y = Math.round(this.y);
            this.jumped = 2;
            this.tick = 0;
        }
    }

    jump0() {
        this.sign0 = this.sign;
        this.state0 = 4;
        this.images0 = this.images;
        this.image = this.images[this.state = this.state0];
        this.jumped = 1;
        this.tick = 0;
        this.limit = 12;
        this.y -= 4;
    }

    status7() {
        if (++this.step % 8 !== 0 && !this.going) {
            this.x -= this.sign * (1 - Math.pow(this.step / this.duration, 2)) * this.a;
        } else {
            this.x = Math.round(this.x);
            if (this.going) {
                this.status = 2;
                this.step = this.count * 8;
                this.last = 0;
            } else {
                this.status = -1;
                this.image = this.images[this.state = 5];
            }
        }
    }

    status6() {
        this.status = 7;
        this.image = this.images[this.state = 1];
        this.step = 8;
        this.last = 0;
        this.count = 2;
        this.duration = 32;
        this.b = .5;
    }

    status5() {
        if (++this.step % (this.count * 2) !== 0) {
            this.x -= this.sign * (1 - Math.pow(this.step / this.duration, 2)) * this.a;
        } else {
            this.status = 6;
            this.image = this.images[this.state = 0];
        }
    }

    status4() {
        this.status = 5;
        this.image = this.images[this.state = 3];
        this.step = 0;
        this.duration = 24;
    }

    status3() {
        if (this.going || this.jumped === 1 || this.jumped === 2) {
            if (++this.step % 4 === 0) {
                this.state = (this.state + 1) % 3;
                this.image = this.images[this.state];
                if (this.count !== 6) {
                    ++this.count;
                }
            }
        } else {
            if (++this.step % 4 === 0) {
                this.state = (this.state + 1) % 3;
                this.image = this.images[this.state];
                if (--this.count === 2) {
                    this.status = 2;
                    this.step = this.count * 8;
                    this.last = 0;
                }
            }
        }
        this.x += this.sign * 1.5;
        this.last = this.step;
    }

    status2() {
        if (this.going || this.jumped === 1 || this.jumped === 2) {
            if (++this.step % 8 === 0) {
                this.state = (this.state + 1) % 3;
                this.image = this.images[this.state];
                if (++this.count === 4) {
                    this.status = 3;
                }
                this.duration = this.count * 8 + 16;
            }
            this.b = this.a = Math.pow(this.step / 32, 2) * 1.5;
            this.x += this.sign * this.a;
            this.last = this.step;
        } else {
            if (this.count) {
                if (++this.step % 8 === 0) {
                    this.state = (this.state + 1) % 3;
                    this.image = this.images[this.state];
                    --this.count;
                }
                this.a = (1 - Math.pow((this.step - this.last) / this.duration, 2)) * this.b;
                this.x += this.sign * this.a;
            } else {
                this.status = 1;
            }
        }
    }

    status1() {
        if (this.going || this.jumped === 1 || this.jumped === 2) {
            this.status = 2;
            this.image = this.images[this.state = 1];
            this.step = 0;
            this.last = 0;
            this.count = 0;
            this.duration = 0;
            this.a = 0;
        } else {
            if (this.duration && ++this.step % 4 !== 0) {
                this.a = (1 - Math.pow((this.step - this.last) / this.duration, 2)) * this.b;
                this.x += this.sign * this.a;
            } else {
                if (this.state === 1) {
                    this.image = this.images[this.state = 2];
                } else {
                    this.x = Math.round(this.x);
                    this.status = -1;
                    this.image = this.images[this.state = 5];
                }
            }
        }
    }
    status0() {
        this.status = 1;
        this.image = this.images[this.state = 0];
    }
}

export { Role }