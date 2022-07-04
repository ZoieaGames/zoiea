import { Zoiea } from './zoiea.js';
import image from './image.js';

const brick0 = await createImageBitmap(image.brick1, 0, 0, 4, 4);
const brick1 = await createImageBitmap(image.brick1, 4, 0, 4, 4);

class Brick extends Zoiea {
    type = 3;
    constructor(x, y, type) {
        super(x, y, type ? brick1 : brick0);
    }
    bomb() {
        this.refuse();
    }
}

export { Brick }