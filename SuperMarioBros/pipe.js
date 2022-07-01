import { Zoiea } from './zoiea.js';
import { pipe } from './sprite.js';

class Pipe extends Zoiea {
    constructor(x, y, size) {
        super(x, y, pipe(size));
    }
}

export { Pipe }