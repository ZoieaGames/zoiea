import { Zoiea } from './zoiea.js';
import { stone } from './sprite.js';

class Stone extends Zoiea {
    constructor(x, y, rols, rows) {
        super(x, y, stone(rols, rows));
    }
}

export { Stone };