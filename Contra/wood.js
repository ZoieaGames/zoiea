import Graph from '../graph.js';
import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Wood extends Zoiea {
    static {
        const wood1 = Image.image.wood1, wood2 = Image.image.wood2, wood3 = Graph.crop(wood1, 8, 0, 8, 16),
            wood4 = Graph.crop(wood1, 16, 0, 8, 16), wood5 = Graph.crop(wood1, 8, 16, 8, 8),
            wood6 = Graph.crop(wood1, 16, 16, 8, 8);
        this.image = {
            1: Graph.grid([wood1, Graph.grid([wood3], [wood6])]),
            2: Graph.grid(
                [wood4, wood3, wood4, Graph.grid([Graph.crop(wood3, 0, 0, 8, 8)], [Graph.crop(wood2, 0, 8, 8, 8)])],
                [wood6, wood5, wood6, Graph.crop(wood1, 0, 16, 8, 8)],
            ),
            3: Graph.grid([wood4, wood3, wood4, wood2], [wood6, wood5, wood6]),
        };
    }
    constructor(x, y, level) {
        super(x, y, Wood.image[level]);
    }
}