import Groph from '../graph.js';
import Zoiea from '../zoiea.js';
export default class Rect extends Zoiea {
    static image = Groph.rect(256, 270, '#9390fe');
    constructor(x, y, transparent) {
        super(x, y, Rect.image);
        transparent && (this.redraw = () => { });
    }
}