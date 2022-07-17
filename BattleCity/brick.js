import Actor from '../actor.js';
import Graph from '../graph.js';
import Image from './image.js';
export default class Brick extends Actor {
    static image = { 1: Graph.crop(Image.image.brick1, 4, 0, 4, 4), 2: Graph.crop(Image.image.brick1, 0, 0, 4, 4) };
    type = 3;
    constructor(x, y, direction) {
        super(x, y, Brick.image[direction]);
    }
    ruin() {
        this.type = 0;
        delete this.zoiea;
    }
}