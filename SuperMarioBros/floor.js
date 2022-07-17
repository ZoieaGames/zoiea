import Actor from '../actor.js';
import Graph from '../graph.js';
import Image from './image.js';
export default class Floor extends Actor {
    static image = Graph.grid([Image.image.floor1], [Graph.crop(Image.image.floor1, 0, 0, 16, 8)]);
    type = 1;
    constructor(x, y) {
        super(x, y, Floor.image);
    }
}