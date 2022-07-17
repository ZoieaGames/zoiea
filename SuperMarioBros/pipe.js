import Actor from '../actor.js';
import Graph from '../graph.js';
import Image from './image.js';
export default class Pipe extends Actor {
    static image = { 1: Graph.grid([Image.image.pipe2], [Image.image.pipe3]) };
    static {
        this.image[2] = Graph.grid([this.image[1]], [Image.image.pipe3]);
        this.image[3] = Graph.grid([this.image[2]], [Image.image.pipe3]);
        this.image[4] = Graph.draw(
            64,
            64,
            Graph.grid([{ width: 32, height: 32 }, this.image[3]], [Graph.flipX(Graph.rotate(this.image[1]))]),
            Graph.grid([{ width: 40, height: 32 }], [{ width: 32, height: 32 }, Image.image.pipe1]),
        );
    }
    type = 1;
    constructor(x, y, level) {
        super(x, y, Pipe.image[level]);
    }
}