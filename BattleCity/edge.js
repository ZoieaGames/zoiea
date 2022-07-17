import Actor from '../actor.js';
import Graph from '../graph.js';
export default class Edge extends Actor {
    static image = {
        1: Graph.rect(32, 208, '#666'),
        2: Graph.rect(256, 32, '#666'),
        3: Graph.rect(16, 208, '#666'),
        4: Graph.rect(256, 30, '#666'),
    };
    type = 1;
    constructor(x, y, direction) {
        super(x, y, Edge.image[direction]);
    }
    ruin(zoiea) {
        zoiea.camp === 1 && this.zoiea.media.play(3);
    }
}