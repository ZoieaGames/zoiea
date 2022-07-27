import Actor from '../actor.js';
import Image from './image.js';
export default class Plant extends Actor {
    static image = Image.image.Zombie1;
    type = 2;
    count = 0;
    index = 0;
    health = 10;
    constructor(x, y) {
        super(x + 24, y + 16, Plant.image[0]);
        this.o.x = 64;
        this.o.y = 32;
    }
    redraw() {
        this.zoiea.context.drawImage(this.image, this.x - 24, this.y - 16);
    }
    update() {
        if (this.offsetX !== undefined) return;
        this.x -= this.zoiea.step * .5;
        ++this.count % 4 || (this.image = Plant.image[++this.index % Plant.image.length]);
        if (this.count % 8) for (const zoiea of this.zoiea.zoieas) zoiea.type === 1 && this.in(zoiea)[0] && zoiea.ruin();
        this.x > this.zoiea.x + 128 || delete this.zoiea;
    }
    ruinUpdate() {
        if (++this.count % 4) return;
        ++this.index === this.images.length ? delete this.zoiea : (this.image = this.images[this.index]);
    }
    ruin() {
        if (--this.health) return;
        this.type = 0;
        this.index = 0;
        this.images = Image.image.ZombieDie1;
        this.update = this.ruinUpdate;
    }
    onDown(x, y) {
        this.offsetX = this.x - x;
        this.offsetY = this.y - y;
        this.zoiea.append(this);
    }
    onMove(x, y) {
        this.x = x + this.offsetX;
        this.y = y + this.offsetY;
    }
    onUp() {
        delete this.offsetX;
        delete this.offsetY;
    }
}