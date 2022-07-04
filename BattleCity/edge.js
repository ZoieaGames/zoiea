import { Zoiea } from './zoiea.js';

class Edge extends Zoiea {
    type = 1;
    fillStyle = '#666';
    constructor(x, y, image) {
        super(x, y, image);
    }
    redraw() {
        this.zoiea.context.fillStyle = this.fillStyle;
        this.zoiea.context.fillRect(this.x, this.y, this.width, this.height);
    }
    bomb(zoiea) {
        if (zoiea.camp === 1) {
            this.zoiea.media.play(3);
        }
    }
}

export { Edge };