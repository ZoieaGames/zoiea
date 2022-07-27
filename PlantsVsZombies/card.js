import Actor from '../actor.js';
import Graph from '../graph.js';
import Image from './image.js';
import Plant from './plant.js';
export default class Card extends Actor {
    static image = { 1: Graph.crop(Image.image.Peashooter1, 0, 0, 100, 60), 2: Image.image.Peashooter2[0] };
    count = 0;
    index = 0;
    constructor(x, y) {
        super(x, y, Card.image[1]);
    }
    update() {
        ++this.count % 4 || ++this.index;
    }
    onDown(x, y) {
        this.onMove(x, y);
        this.image = Card.image[2];
        this.zoiea.append(this);
    }
    onMove(x, y) {
        this.x = x - Card.image[2].width * .5;
        this.y = y - Card.image[2].height * .5;
    }
    onUp() {
        this.zoiea.append(new Plant(this));
        this.y = this.zoiea.height;
    }
}