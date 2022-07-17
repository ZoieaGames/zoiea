import Actor from '../actor.js';
import Graph from '../graph.js';
import Image from './image.js';
export default class Flag extends Actor {
    static image = {
        1: Graph.grid([Image.image.flag3, Image.image.flag4], [{ width: 8, height: 8 }, Image.image.flag3]),
        2: Graph.grid([Image.image.flag2], [{ width: 3, height: 144 }, Graph.rect(2, 144, '#89d900')]),
    }
    type = 2;
    count = 63;
    offset = 0;
    constructor(x, y) {
        super(x + 12, y, Flag.image[2]);
    }
    redraw() {
        super.redraw();
        this.zoiea.context.drawImage(Flag.image[1], this.x - 12, this.y + this.offset + 9);
    }
    flagUpdate() {
        --this.count ? this.offset += 2 : delete this.update;
    }
    ruin() {
        this.type = 0;
        this.update = this.flagUpdate;
        this.zoiea.media.play(14);
    }
}