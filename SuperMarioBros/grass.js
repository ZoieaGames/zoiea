import Graph from '../graph.js';
import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Grass extends Zoiea {
    static {
        const cloud = [Image.image.cloud1, Image.image.cloud2, Image.image.cloud3];
        for (let i = 0; i < cloud.length; cloud[i] = Graph.change(cloud[i++], 0, 254, 137, 217, 0, 100, 13, 148, 0));
        this.image = {
            1: Graph.grid([cloud[0], cloud[1], cloud[2]]),
            2: Graph.grid([cloud[0], Graph.repeat(cloud[1], 2, 1), cloud[2]]),
            3: Graph.grid([cloud[0], Graph.repeat(cloud[1], 3, 1), cloud[2]]),
        };
    }
    constructor(x, y, level) {
        super(x, y, Grass.image[level]);
    }
}