import { Zoiea } from './zoiea.js';
import { Bomb } from './bomb.js';
import image from './image.js';

const images = [image.star1, image.star2, image.star3, image.star4, image.star3, image.star2];

class Tank extends Zoiea {
    index = 0;
    tick = 0;
    count = 0;
    constructor(x, y, images) {
        super(x + 1, y + 1, image.star1);
        this.width -= 2;
        this.height -= 2;
        this.images = images;
    }
    redraw() {
        this.zoiea.context.drawImage(this.image, this.x - 1, this.y - 1);
    }
    update() {
        if (++this.tick % 4 === 0) {
            this.image = images[this.index = (this.index + 1) % images.length];
            if (this.index) {
                return;
            }
            if (this.count) {
                this.update = this.tankUpdate;
                return;
            }
            ++this.count;
        }
    }
    tankUpdate() {
        this.type = 1;
        this.image = this.images[this.index = 0];
        this.update = this.nextUpdate;
    }
    nextUpdate() { }
    bomb() {
        this.zoiea.append(new Bomb(this.x + this.w, this.y + this.h, 1));
        this.refuse();
    }
    go() {
        switch (this.direction) {
            case 1:
                this.y -= this.velocity * this.zoiea.step;
                break;
            case 2:
                this.x += this.velocity * this.zoiea.step;
                break;
            case 3:
                this.y += this.velocity * this.zoiea.step;
                break;
            case 4:
                this.x -= this.velocity * this.zoiea.step;
                break;
        }
    }
}

export { Tank }