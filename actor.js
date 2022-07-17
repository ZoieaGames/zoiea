import Zoiea from './zoiea.js';
export default class Actor extends Zoiea {
    o = { x: 0, y: 0 };
    constructor(x, y, image) {
        super(x, y, image);
    }
    in(zoiea) {
        const right = this.x + this.image.width - this.o.x - zoiea.x - zoiea.o.x;
        if (right < 0) return [0, 0];
        const up = zoiea.y + zoiea.image.height - zoiea.o.y - this.y - this.o.y;
        if (up < 0) return [0, 0];
        const left = zoiea.x + zoiea.image.width - zoiea.o.x - this.x - this.o.x;
        if (left < 0) return [0, 0];
        const down = this.y + this.image.height - this.o.y - zoiea.y - zoiea.o.y;
        if (down < 0) return [0, 0];
        const min = Math.min(right, up, left, down);
        return [min, min === right ? 1 : min === up ? 2 : min === left ? 3 : 4];
    }
}