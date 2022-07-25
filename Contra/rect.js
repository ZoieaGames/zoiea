import Graph from '../graph.js';
import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Rect extends Zoiea {
    static image = { 1: Graph.rect(256, 88, '#155fda') };
    static {
        const image = Graph.crop(Image.image.tree2, 0, 30, 32, 2);
        this.image[2] = Graph.repeat(image, 5, 36);
        this.image[3] = Graph.repeat(image, 8, 36);
        this.image[4] = Graph.repeat(image, 8, 116);
        this.image[5] = Graph.draw(144, 168, Graph.repeat(image, 5, 84));
    }
    constructor(x, y, level) {
        super(x, y, level ? Rect.image[level] : { width: 0, height: 0 });
        level || (this.redraw = () => { });
    }
}