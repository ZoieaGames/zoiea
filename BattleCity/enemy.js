import { Tank } from './tank.js';
import { Bullet } from './bullet.js';
import { image, flipX, flipY, rotate } from './image.js';

const images = {
    1: { 1: [image.tank1, image.tank2] },
    2: { 1: [image.tank3, image.tank4] },
    3: { 1: [image.tank5, image.tank6] },
    4: { 1: [image.tank7, image.tank8] }
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

const random = (size, base) => {
    return Math.random() * size + base >> 0;
}

class Enemy extends Tank {
    direction = 3;
    velocity = .5;
    camp = 2;
    tick = 0;
    bullet = 1;
    factor = random(480, 240);
    constructor(x, y, level) {
        super(x, y, images[level][3]);
        this.level = level;
        if (level === 2) {
            this.velocity = 1;
        } else if (level > 2) {
            this.bullet = 2;
        }
    }
    nextUpdate() {
        if (++this.tick % 60 === 0 && this.bullet) {
            --this.bullet;
            this.zoiea.append(new Bullet(this.x, this.y, this));
        }
        if (this.tick % this.factor === 0) {
            this.tick = random(120, 60);
            this.direction = random(4, 1);
            this.update = this.imageUpdate;
            return;
        }
        this.image = this.images[this.index = (this.index + 1) % 2];
        this.go();
        this.collision();
    }
    imageUpdate() {
        this.images = images[this.level][this.direction];
        this.image = this.images[this.index];
        this.update = this.nextUpdate;
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
                        this.direction = random(4, 1);
                        break;
                    case 2:
                        this.x -= result[1];
                        this.direction = 3;
                        break;
                    case 3:
                        this.y -= result[1];
                        this.direction = random(4, 1);
                        break;
                    case 4:
                        this.x += result[1];
                        this.direction = random(4, 1);
                        break;
                }
                this.update = this.imageUpdate;
            }
        }
    }
    refuse() {
        super.refuse();
        this.zoiea.panel.remove(this);
    }
    bomb() {
        super.bomb();
        this.zoiea.media.play(2);
    }
}

export { Enemy }