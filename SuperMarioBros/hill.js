import { Zoiea } from './zoiea.js';
import { hill1, hill2 } from './sprite.js';

class Hill extends Zoiea {
    constructor(x, y, size) {
        super(x, y, size === 2 ? hill2 : hill1);
        this.ghost = true;
    }
}

export { Hill }