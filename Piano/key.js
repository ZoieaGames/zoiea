import Graph from '../graph.js';
import Line from './line.js';
import Zoiea from '../zoiea.js';
export default class Key extends Zoiea {
    static image = [];
    static offset = [0, 20, 36, 64, 72, 108, 128, 144, 168, 180, 208, 216, 0, 180];
    static key = {};
    static {
        const color = '#fff', rect1 = Graph.rect(32, 64, color), rect2 = Graph.rect(16, 96, color),
            change = image => image.push(Graph.change(image[0], 0, 255, 153, 153, 153));
        this.image.push([Graph.flipY(Graph.grid([rect1], [rect2]))]);
        change(this.image[0]);
        this.image[1] = [Graph.rect(20, 92, '#000'), Graph.rect(20, 92, '#666')];
        this.image[2] = [Graph.flipY(Graph.grid([rect1], [{ width: 8, height: 96 }, rect2]))];
        change(this.image[2]);
        this.image[3] = this.image[1];
        this.image[4] = [Graph.flipX(this.image[0][0])];
        change(this.image[4]);
        this.image[5] = this.image[0];
        this.image[6] = this.image[1];
        this.image[7] = [Graph.flipY(Graph.grid([rect1], [{ width: 8, height: 96 }, Graph.rect(12, 96, color)]))];
        change(this.image[7]);
        this.image[8] = this.image[1];
        this.image[9] = [Graph.flipX(this.image[7][0])];
        change(this.image[9]);
        this.image[10] = this.image[1];
        this.image[11] = this.image[4];
        this.image[12] = [Graph.rect(32, 160, color)];
        change(this.image[12]);
        this.image[13] = [Graph.flipY(Graph.grid([rect1], [Graph.rect(24, 96, color)]))];
        change(this.image[13]);
    }
    constructor(zoiea, note, index) {
        super(zoiea.x + (note / 12 >> 0) * 252 + Key.offset[index] - 406, zoiea.y + 24, Key.image[index][0]);
        (Key.key[note] = this).index = index;
        zoiea.zoiea.create(this.other = new Line(this, zoiea, index));
    }
    play() {
        this.image = Key.image[this.index][1];
        this.other.play();
    }
    stop() {
        this.image = Key.image[this.index][0];
        this.other.stop();
    }
}