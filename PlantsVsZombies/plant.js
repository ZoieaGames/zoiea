import Actor from '../actor.js';
import Bullet from './bullet.js';
import Image from './image.js';
export default class Plant extends Actor {
    static image = Image.image.Peashooter2;
    type = 1;
    health = 10;
    constructor(zoiea) {
        super(zoiea.x, zoiea.y, Plant.image[0]);
        this.count = zoiea.count;
        this.index = zoiea.index;
    }
    update() {
        ++this.count % 4 || (this.image = Plant.image[++this.index % Plant.image.length]);
        this.count % 120 || this.zoiea.append(new Bullet(this));
    }
    ruin() {
        if (--this.health) return;
        delete this.zoiea;
    }
}