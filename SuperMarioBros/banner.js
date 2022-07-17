import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Banner extends Zoiea {
    count = 0;
    constructor(zoiea) {
        super(zoiea.x - 8, zoiea.y, Image.image.flag1);
        this.offset = this.y - 16;
        this.update = this.riseUpdate;
    }
    riseUpdate() {
        if (++this.count % 4 || --this.y !== this.offset) return;
        this.zoiea.append(this);
        delete this.update;
    }
}