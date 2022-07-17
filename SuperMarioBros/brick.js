import Actor from '../actor.js';
import Debris from './debris.js';
import Image from './image.js';
export default class Brick extends Actor {
    static offset = [-1, -2, -2, -1, 0, -1, 0, 0, 1, 1, 1, 1, 2, 2, -1];
    type = 1;
    constructor(x, y) {
        super(x, y, Image.image.brick1);
    }
    swayUpdate() {
        this.index === 15 ? delete this.update : this.y += Brick.offset[this.index++];
    }
    ruin(zoiea) {
        if (zoiea.level === 1) {
            this.index = 0;
            return this.update = this.swayUpdate;
        }
        this.type = 0;
        this.zoiea.append(new Debris(this));
        this.zoiea.media.play(15);
        delete this.zoiea;
    }
}