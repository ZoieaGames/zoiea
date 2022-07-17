import Graph from '../graph.js';
import Image from './image.js';
import Role from './role.js';
export default class Star extends Role {
    static image = [Image.image.star1];
    static {
        this.image.push(Graph.change(this.image[0], 0, 13, 181, 50, 32));
        this.image.push(Graph.change(this.image[0], 0, 235, 153, 79, 0, 13, 0, 0, 0));
        this.image.push(Graph.change(this.image[1], 0, 235, 108, 110, 0));
    }
    count = 0;
    index = 0;
    constructor(zoiea) {
        super(zoiea.x, zoiea.y, Star.image[0]);
        this.o.y = this.o.x = 1;
        this.v.x = 2;
        this.offset = this.y - 15;
        this.update = this.riseUpdate;
    }
    update() {
        this.vary();
        super.update();
    }
    riseUpdate() {
        this.vary();
        if (++this.count % 4 || --this.y !== this.offset) return;
        this.zoiea.append(this);
        delete this.update;
    }
    vary() {
        ++this.count % 2 || (this.image = Star.image[++this.index % 4]);
    }
    bump(result, zoiea) {
        if (zoiea.camp !== 1) return super.bump(result, zoiea);
        zoiea.shield();
        this.ruin();
    }
    land() {
        this.y -= 4;
        this.v.y = -5;
    }
    ruin() {
        delete this.zoiea;
    }
}