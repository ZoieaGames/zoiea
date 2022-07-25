import Graph from '../graph.js';
import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Bush extends Zoiea {
    static {
        const bush1 = Image.image.bush1, bush2 = Graph.crop(bush1, 0, 0, 16, 8), bush3 = Graph.crop(bush2, 8, 0, 8, 8),
            bush4 = Graph.crop(bush1, 16, 0, 8, 8);
        this.image = {
            1: Graph.grid([bush1, bush3]),
            2: Graph.grid([bush4, bush4, bush3, bush4]),
            3: Graph.grid([bush4, bush3, bush2]),
        };
    }
    constructor(x, y, level) {
        super(x, y, Bush.image[level]);
    }
}