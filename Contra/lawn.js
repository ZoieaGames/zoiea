import Actor from '../actor.js';
import Image from './image.js';
export default class Lawn extends Actor {
    type = 1;
    constructor(x, y) {
        super(x, y, Image.image.lawn1);
        this.o.y = 4;
    }
}