import Graph from '../graph.js';
import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Debris extends Zoiea {
    static image = [Image.image.debris1, Graph.flipX(Image.image.debris1)];
    a = { y: .25 };
    v = { y: -4 };
    count = 0;
    index = 0;
    constructor(zoiea) {
        super(zoiea.x, zoiea.y, { width: 16 });
    }
    redraw() {
        const offset = this.image.width - 8;
        this.zoiea.context.drawImage(Debris.image[this.index], this.x, this.y);
        this.zoiea.context.drawImage(Debris.image[this.index], this.x + offset, this.y);
        this.zoiea.context.drawImage(Debris.image[this.index], this.x, this.y + offset);
        this.zoiea.context.drawImage(Debris.image[this.index], this.x + offset, this.y + offset);
    }
    update() {
        --this.x;
        this.y += (this.v.y += this.a.y * this.zoiea.step) * this.zoiea.step;
        this.image.width += 2;
        ++this.count % 8 || (this.index = ++this.index % 2);
    }
}