import Zoiea from './zoiea.js';
export default class Text extends Zoiea {
    style = '#fff';
    constructor(x, y, text, size = 8, align = 'left', baseline = 'top') {
        super(x, y, {});
        this.text = text;
        this.font = size + 'px monospace';
        this.align = align;
        this.baseline = baseline;
    }
    redraw() {
        this.zoiea.context.fillStyle = this.style;
        this.zoiea.context.font = this.font;
        this.zoiea.context.textAlign = this.align;
        this.zoiea.context.textBaseline = this.baseline;
        const x = this.align === 'center' ? this.zoiea.width * .5 : this.align === 'right' ? this.zoiea.width : 0,
            y = this.baseline === 'middle' ? this.zoiea.height * .5 : this.baseline === 'bottom' ? this.zoiea.height : 0;
        this.zoiea.context.fillText(this.text, this.x + x, this.y + y);
    }
}