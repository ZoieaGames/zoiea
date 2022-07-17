import Graph from '../graph.js';
import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Cloud extends Zoiea {
    static {
        const cloud1 = Image.image.cloud1, cloud2 = Image.image.cloud2, cloud3 = Image.image.cloud3,
            cloud4 = Image.image.cloud4, cloud5 = Image.image.cloud5, cloud6 = Image.image.cloud6;
        this.image = {
            1: Graph.grid([cloud1, cloud2, cloud3], [cloud4, cloud5, cloud6]),
            2: Graph.grid([cloud1, Graph.repeat(cloud2, 2, 1), cloud3], [cloud4, Graph.repeat(cloud5, 2, 1), cloud6]),
            3: Graph.grid([cloud1, Graph.repeat(cloud2, 3, 1), cloud3], [cloud4, Graph.repeat(cloud5, 3, 1), cloud6]),
        };
    }
    constructor(x, y, level) {
        super(x, y, Cloud.image[level]);
    }
}