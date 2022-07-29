import Borad from './board.js';
import Graph from '../graph.js';
import Key from './key.js';
import Zoiea from '../zoiea.js';
export default class Keyboard extends Zoiea {
    static image = Graph.grid([Graph.rect(1920, 4, '#0f0')], [Graph.rect(1920, 204, '#cfc')]);
    count = 0;
    index = 0;
    constructor(zoiea) {
        super(zoiea.x, zoiea.y + zoiea.height - 208, Keyboard.image);
    }
    update() {
        (this.count = ++this.count % 8) || (this.index = ++this.index % 8);
    }
    init() {
        this.zoiea.create(new Borad(this));
        let note = 21;
        this.zoiea.create(new Key(this, note++, 13));
        while (this.zoiea.create(new Key(this, note, note % 12)), ++note < 108);
        this.zoiea.create(new Key(this, note, 12));
    }
}