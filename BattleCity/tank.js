import Actor from '../actor.js';
import Bomb from './bomb.js';
import Image from './image.js';
export default class Tank extends Actor {
    static image = [
        Image.image.star1, Image.image.star2, Image.image.star3, Image.image.star4, Image.image.star3, Image.image.star2,
    ];
    count = 0;
    index = 0;
    direction = 2;
    offset = 0;
    v = { x: 0, y: 0 };
    constructor(x, y, images) {
        super(x, y, Tank.image[0]);
        this.o.y = this.o.x = 1;
        this.images = images;
    }
    update() {
        if (++this.count % 4) return;
        this.index === 12 ? this.update = this.nextUpdate : this.image = Tank.image[++this.index % 6];
    }
    nextUpdate() {
        this.type = 1;
        this.image = this.images[this.level][this.direction][this.index = this.offset];
        this.update = this.moveUpdate;
    }
    moveUpdate() {
        this.x += this.v.x * this.zoiea.step;
        this.y += this.v.y * this.zoiea.step;
        this.image = this.images[this.level][this.direction][++this.index % 2 + this.offset];
        let result;
        for (const zoiea of this.zoiea.zoieas)
            zoiea === this || !zoiea.type || zoiea.type === 4 || !(result = this.in(zoiea))[0] || this.bump(result);
    }
    bump(result) {
        switch (result[1]) {
            case 1: this.x -= result[0];
                break;
            case 2: this.y += result[0];
                break;
            case 3: this.x += result[0];
                break;
            case 4: this.y -= result[0];
                break;
        }
    }
    turn(direction) {
        this.v.y = this.v.x = 0;
        switch (this.direction = direction) {
            case 1: this.v.x = this.velocity;
                break;
            case 2: this.v.y = -this.velocity;
                break;
            case 3: this.v.x = -this.velocity;
                break;
            case 4: this.v.y = this.velocity;
                break;
        }
    }
    ruin() {
        this.type = 0;
        this.zoiea.append(new Bomb(this, 1));
        delete this.zoiea;
    }
}