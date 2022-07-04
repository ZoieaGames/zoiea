import { Tank } from './tank.js';
import { Bullet } from './bullet.js';
import { Cover } from './cover.js';
import { image, flipX, flipY, rotate } from './image.js';

const images = {
    1: { 1: [image.tank11, image.tank12] },
    2: { 1: [image.tank13, image.tank14] },
    3: { 1: [image.tank15, image.tank16] },
    4: { 1: [image.tank17, image.tank18] }
}
for (const image of Object.values(images)) {
    image[2] = [rotate(image[1][0]), rotate(image[1][1])];
}
for (const image of Object.values(images)) {
    image[3] = [flipY(image[1][0]), flipY(image[1][1])];
}
for (const image of Object.values(images)) {
    image[4] = [flipX(image[2][0]), flipX(image[2][1])];
}

class Player extends Tank {
    direction = 1;
    velocity = 1;
    camp = 1;
    bullet = 1;
    constructor(x, y, level) {
        super(x, y, images[level][1]);
        this.level = level;
    }
    get x() { return this._x }
    set x(value) {
        this._x = value;
        if (this.cover) this.cover.x = value - 1;
    }
    get y() { return this._y }
    set y(value) {
        this._y = value;
        if (this.cover) this.cover.y = value - 1;
    }
    nextUpdate() {
        this.zoiea.append(this.cover = new Cover(this.x - 1, this.y - 1, this, 180));
        this.update = this.moveUpdate;
    }
    moveUpdate() {
        if (!this.moving) {
            return;
        }
        this.image = this.images[this.index = (this.index + 1) % 2];
        this.go();
        this.collision();
    }
    imageUpdate() {
        this.images = images[this.level][this.direction];
        this.image = this.images[this.index];
        this.update = this.moveUpdate;
    }
    collision(result) {
        for (const zoiea of this.zoiea.zoieas) {
            if (zoiea === this || !zoiea.type || zoiea.type === 4) {
                continue;
            }
            if (result = this.collide(zoiea)) {
                if (result[1] === 0) {
                    continue;
                }
                switch (result[0]) {
                    case 1:
                        this.y += result[1];
                        break;
                    case 2:
                        this.x -= result[1];
                        break;
                    case 3:
                        this.y -= result[1];
                        break;
                    case 4:
                        this.x += result[1];
                        break;
                }
            }
        }
    }
    move(moving) {
        if (!moving) {
            this.moving = 0;
            return;
        }
        if (moving === this.moving) {
            return;
        }
        this.moving = moving;
        if (this.update === this.moveUpdate && moving !== this.direction) {
            this.direction = moving;
            this.update = this.imageUpdate;
        }
    }
    fire(firing) {
        if (!firing) {
            this.firing = 0;
            return;
        }
        if (this.firing) {
            return;
        }
        this.firing = firing;
        if (this.update === this.moveUpdate) {
            if (this.bullet) {
                --this.bullet;
                this.zoiea.append(new Bullet(this.x, this.y, this));
                this.zoiea.media.play(0)
            }
        }
    }
    refuse() {
        super.refuse();
        this.zoiea.zoiea = undefined;
    }
    bomb() {
        super.bomb();
        this.zoiea.media.play(1);
    }
}

export { Player }