import Graph from '../graph.js';
import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Hill extends Zoiea {
    static {
        const hill2 = Image.image.hill2, hill3 = Image.image.hill3, hill4 = Graph.flipX(hill2),
            hill5 = Graph.rect(8, 8, '#0d9400');
        this.image = {
            1: Graph.grid(
                [{ width: 16, height: 8 }, Image.image.hill1, { width: 16, height: 8 }],
                [{ width: 8, height: 8 }, hill2, hill5, hill3, hill4],
                [hill2, Graph.repeat(hill5, 4, 1), hill4],
            ),
        };
        this.image[2] = Graph.grid(
            [{ width: 16, height: 24 }, this.image[1], { width: 16, height: 24 }],
            [{ width: 8, height: 8 }, hill2, hill5, hill3, Graph.repeat(hill5, 2, 1), hill3, hill5, hill4],
            [hill2, Graph.repeat(hill5, 8, 1), hill4],
        );
    }
    constructor(x, y, level) {
        super(x, y, Hill.image[level]);
    }
}