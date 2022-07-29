import Graph from '../graph.js';
import Zoiea from '../zoiea.js';
export default class Line extends Zoiea {
    static {
        const line1 = [null], line2 = [null];
        for (const style of ['#f0f', '#f00', '#ff0', '#fff', '#0ff', '#00f', '#000']) {
            line1.push(Graph.rect(32, 4, style));
            line2.push(Graph.rect(20, 4, style));
        }
        this.image = [line1, line2, line1, line2, line1, line1, line2, line1, line2, line1, line2, line1, line1, line1];
    }
    count = 0;
    index = 0;
    constructor(zoiea, other, index) {
        super(zoiea.x, other.y, Line.image[index][0]);
        this.other = other;
        this.index = index;
    }
    redraw() {
        this.image && super.redraw();
    }
    playUpdate() {
        this.other.count || (this.image = Line.image[this.index][this.other.index]);
    }
    play() {
        this.update = this.playUpdate;
    }
    stop() {
        this.image = null;
        delete this.update;
    }
}