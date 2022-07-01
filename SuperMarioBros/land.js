import { Zoiea } from './zoiea.js';
import { land } from './sprite.js';

class Land extends Zoiea {
    constructor(x, y, size) {
        super(x, y, land(size));
    }
}

export { Land }