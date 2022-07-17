import Graph from '../graph.js';
import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Bomb extends Zoiea {
    static image = [
        Graph.grid([{ width: 16, height: 4 }], [{ width: 4, height: 12 }, Image.image.bomb1]),
        Image.image.bomb2,
        Image.image.bomb3,
    ];
    count = 0;
    index = 0;
    constructor(zoiea) {
        super(zoiea.x - 4, zoiea.y - 4, Bomb.image[0]);
    }
    update() {
        ++this.count % 4 || (this.index === 2 ? delete this.zoiea : this.image = Bomb.image[++this.index]);
    }
}