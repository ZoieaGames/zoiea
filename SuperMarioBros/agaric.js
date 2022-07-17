import Graph from '../graph.js';
import Image from './image.js';
import Role from './role.js';
export default class Agaric extends Role {
    static image = { 1: Image.image.agaric1, 2: Graph.change(Image.image.agaric1, 0, 181, 13, 148, 0) };
    count = 0;
    constructor(zoiea, level) {
        super(zoiea.x, zoiea.y, Agaric.image[level]);
        this.o.y = this.o.x = 1;
        this.v.x = .75;
        this.offset = this.y - 15;
        this.level = level;
        this.update = this.riseUpdate;
    }
    riseUpdate() {
        if (++this.count % 4 || --this.y !== this.offset) return;
        this.zoiea.append(this);
        delete this.update;
    }
    bump(result, zoiea) {
        if (zoiea.camp !== 1) return super.bump(result, zoiea);
        if (this.level === 1) zoiea.up();
        else {
            ++this.zoiea.live;
            this.zoiea.media.play(8);
        }
        this.ruin();
    }
    ruin() {
        delete this.zoiea;
    }
}