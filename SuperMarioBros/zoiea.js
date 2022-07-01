class Zoiea {
    static _id = 0;
    static get id() { return this._id }
    _id = ++Zoiea._id;
    constructor(x = 0, y = 0, image = { width: 0, height: 0 }) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
    get id() { return this._id }
    get w() { return this._w }
    get h() { return this._h }
    get width() { return this._width }
    set width(value) { this._w = (this._width = value) * .5 }
    get height() { return this._height }
    set height(value) { this._h = (this._height = value) * .5 }
    collide(zoiea) {
        const a = this.x + this.width - zoiea.x;
        if (a < 0) return;
        const b = zoiea.x + zoiea.width - this.x;
        if (b < 0) return;
        const c = this.y + this.height - zoiea.y;
        if (c < 0) return;
        const d = zoiea.y + zoiea.height - this.y;
        if (d < 0) return;
        const min = Math.min(a, b, c, d);
        return min === a ? [1, a] : min === b ? [2, b] : min === c ? [3, c] : [4, d];
    }
    redraw(zoiea) { zoiea.context.drawImage(this.image, this.x, this.y) }
    refuse() { this.refused = true }
    reduce(zoiea) {
        if (this.refused || this.x + this.width < zoiea.x - zoiea.w || this.y > zoiea.y + zoiea.height + zoiea.h) {
            zoiea.remove(this);
            zoiea.reduce();
        }
    }
    uiReduce(zoiea) {
        if (this.refused) {
            zoiea.uiRemove(this);
            zoiea.reduce();
        }
    }
}

export { Zoiea }