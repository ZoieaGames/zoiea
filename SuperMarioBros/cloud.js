import { Zoiea } from './zoiea.js';
import { cloud } from './sprite.js';

class Cloud extends Zoiea {
    constructor(x, y, size) {
        super(x, y, cloud(size));
        this.ghost = true;
    }
}

export { Cloud };