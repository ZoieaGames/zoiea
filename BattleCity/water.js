import Actor from '../actor.js';
import Image from './image.js';
export default class Water extends Actor {
    static image = [Image.image.water1, Image.image.water2];
    type = 2;
    count = 0;
    index = 0;
    constructor(x, y) {
        super(x, y, Water.image[0]);
    }
    update() {
        ++this.count % 32 || (this.image = Water.image[++this.index % 2]);
    }
}