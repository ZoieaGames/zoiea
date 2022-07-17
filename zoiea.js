export default class Zoiea {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
    }
    redraw() {
        this.zoiea.context.drawImage(this.image, this.x, this.y);
    }
}