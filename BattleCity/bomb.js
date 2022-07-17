import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Bomb extends Zoiea {
    static image = [
        Image.image.bomb1,
        Image.image.bomb2,
        Image.image.bomb3,
        Image.image.bomb4,
        Image.image.bomb5,
        Image.image.bomb4,
        Image.image.bomb3,
        Image.image.bomb2,
        Image.image.bomb1,
    ];
    static offset = [0, 0, 0, -8, 0, 0, 8, 0, 0];
    count = 0;
    index = 0;
    constructor(zoiea, bomb) {
        super(zoiea.x + zoiea.image.width * .5, zoiea.y + zoiea.image.height * .5, Bomb.image[0]);
        this.x -= this.image.width * .5;
        this.y -= this.image.height * .5;
        bomb && (this.update = this.bombUpdate);
    }
    update() {
        ++this.count % 4 || (this.index === 2 ? delete this.zoiea : this.image = Bomb.image[++this.index]);
    }
    bombUpdate() {
        if (++this.count % 4) return;
        if (this.index === 8) return delete this.zoiea;
        this.x += Bomb.offset[this.index];
        this.y += Bomb.offset[this.index];
        this.image = Bomb.image[++this.index];
    }
}