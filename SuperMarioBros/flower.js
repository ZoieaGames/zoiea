import Actor from '../actor.js';
import Graph from '../graph.js';
import Image from './image.js';
export default class Flower extends Actor {
    static image = [
        Image.image.flower1,
        Graph.change(Image.image.flower1, 0, 254, 254, 205, 198, 235, 153, 79, 0, 181, 0, 0, 0),
        Graph.change(Image.image.flower1, 0, 254, 235, 159, 35, 235, 108, 110, 0),
        Graph.change(Image.image.flower1, 0, 181, 13, 148, 0),
    ];
    count = 0;
    index = 0;
    constructor(zoiea) {
        super(zoiea.x, zoiea.y, Flower.image[0]);
        this.o.y = this.o.x = 1;
        this.offset = this.y - 15;
        this.update = this.riseUpdate;
    }
    riseUpdate() {
        this.vary();
        if (++this.count % 4 || --this.y !== this.offset) return;
        this.zoiea.append(this);
        this.update = this.varyUpdate;
    }
    varyUpdate() {
        this.vary();
        for (const zoiea of this.zoiea.zoieas) {
            if (zoiea.camp !== 1 || !this.in(zoiea)[0]) continue;
            zoiea.up();
            this.ruin();
            break;
        }
    }
    vary() {
        ++this.count % 2 || (this.image = Flower.image[++this.index % 4]);
    }
    ruin() {
        delete this.zoiea;
    }
}