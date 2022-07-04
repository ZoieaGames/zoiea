import { Zoiea } from './zoiea.js';
import { Bomb } from './bomb.js';
import image from './image.js';

class Base extends Zoiea {
    type = 1;
    constructor(x, y) {
        super(x, y, image.base1);
    }
    bomb() {
        this.image = image.base2;
        this.zoiea.append(new Bomb(this.x + this.w, this.y + this.h, 1));
        this.zoiea.over();
        this.type = 2;
        this.zoiea.media.play(1);
    }
}

export { Base }