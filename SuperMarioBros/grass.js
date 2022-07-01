import { Zoiea } from './zoiea.js';
import { grass } from './sprite.js';

class Grass extends Zoiea {
    constructor(x, y, size) {
        super(x, y, grass(size));
        this.ghost = true;
    }
}

export { Grass }