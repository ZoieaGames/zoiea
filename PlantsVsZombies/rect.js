import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Rect extends Zoiea {
    constructor(x, y) {
        super(x, y, Image.image.background1);
    }
}