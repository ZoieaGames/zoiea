import Actor from '../actor.js';
import Image from './image.js';
export default class Rock extends Actor {
    type = 1;
    constructor(x, y) {
        super(x, y, Image.image.rock1);
    }
}