import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Cover extends Zoiea {
    static image = [Image.image.cover1, Image.image.cover2];
    index = 0;
    constructor(zoiea, count) {
        super(zoiea.x, zoiea.y, Cover.image[0]);
        ((this.other = zoiea).cover = this).count = count;
    }
    update() {
        this.count ? --this.count % 2 || (this.image = Cover.image[++this.index % 2]) : this.other.cover = 0;
    }
}