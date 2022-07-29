import Graph from '../graph.js';
import Zoiea from '../zoiea.js';
export default class Board extends Zoiea {
    static image = Graph.grid([Graph.rect(1876, 4, '#f0f')], [Graph.rect(1876, 164, '#000')]);
    constructor(zoiea) {
        super(zoiea.x + 22, zoiea.y + 20, Board.image);
    }
}