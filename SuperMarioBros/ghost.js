import { Zoiea } from './zoiea.js';

class Ghost extends Zoiea {
    constructor(x, y, image) {
        super(x, y, image);
        this.invisible = true;
    }
    redraw() {

    }
}

export { Ghost }