import Graph from '../graph.js';
import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Rock extends Zoiea {
    static {
        const rock1 = Image.image.rock1, rock2 = Image.image.rock2, rock3 = Graph.crop(rock2, 0, 0, 32, 8);
        this.image = {
            1: rock1,
            2: Graph.grid([rock1], [rock3]),
            3: Graph.grid([rock1], [rock2], [rock3]),
            4: Graph.grid([rock1], [rock2], [Graph.crop(rock2, 0, 0, 32, 24)]),
            5: Graph.grid([rock1], [rock2], [rock2], [rock3]),
            6: Graph.grid([rock1], [rock2], [rock2], [Graph.crop(rock2, 0, 0, 32, 24)]),
            7: Graph.grid([rock1], [Graph.repeat(rock2, 1, 3)], [rock3]),
            8: Graph.grid([rock1], [rock2]),
            9: Graph.grid([rock1], [rock2], [rock2]),
            'a': Graph.grid([rock1], [Graph.repeat(rock2, 1, 3)]),
            'b': Graph.grid([rock1], [Graph.repeat(rock2, 1, 4)]),
        };
    }
    constructor(x, y, level) {
        super(x, y, Rock.image[level]);
    }
}