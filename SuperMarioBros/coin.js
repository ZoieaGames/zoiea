import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Coin extends Zoiea {
    static image = [Image.image.coin2, Image.image.coin3, Image.image.coin4, Image.image.coin5];
    static offset = [
        0, 0, -5, -5, -4, -3, -4, -3, -3, -2, -2, -2, -2, -2, 0, -1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 3, 4, 5,
    ];
    count = 0;
    index = 0;
    constructor(zoiea) {
        super(zoiea.x + 5, zoiea.y - 20, Coin.image[0]);
    }
    update() {
        this.y += Coin.offset[this.count];
        ++this.count % 2 || (this.count === 32 ? delete this.zoiea : this.image = Coin.image[++this.index % 4]);
    }
}