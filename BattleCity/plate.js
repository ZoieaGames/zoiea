import Actor from '../actor.js';
import Image from './image.js';
export default class Plate extends Actor {
    type = 3;
    constructor(x, y) {
        super(x, y, Image.image.plate1);
    }
    ruin(zoiea) {
        if (zoiea.level !== 4) return zoiea.camp === 1 && this.zoiea.media.play(3);
        this.type = 0;
        delete this.zoiea;
    }
}