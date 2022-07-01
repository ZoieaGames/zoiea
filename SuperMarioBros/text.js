import { Zoiea } from './zoiea.js';

class Text extends Zoiea {
    fillStyle = '#fff';
    constructor(x, y, text, fontSize = 16, textAlign = 'left', textBaseline = 'top') {
        super(x, y);
        this.text = text;
        this.font = fontSize + 'px monospace';
        this.textAlign = textAlign;
        this.textBaseline = textBaseline;
    }
    redraw(zoiea) {
        zoiea.context.font = this.font;
        zoiea.context.textAlign = this.textAlign;
        zoiea.context.textBaseline = this.textBaseline;
        let x = this.x;
        let y = this.y;
        if (this.textAlign === 'center') {
            x = this.x + zoiea.w;
        } else if (this.textAlign === 'right') {
            x = this.x + zoiea.width;
        }
        if (this.textBaseline === 'middle') {
            y = this.y + zoiea.h;
        } else if (this.textBaseline === 'bottom') {
            y = this.y + zoiea.height;
        }
        zoiea.context.fillStyle = this.fillStyle;
        zoiea.context.fillText(this.text, x, y);
    }
}

export { Text }