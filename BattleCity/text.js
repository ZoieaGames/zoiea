import { Zoiea } from './zoiea.js';

class Text extends Zoiea {
    fillStyle = '#fff';
    constructor(x, y, text, fontSize = 8, textAlign = 'left', textBaseline = 'top') {
        super(x, y);
        this.text = text;
        this.font = fontSize + 'px monospace';
        this.textAlign = textAlign;
        this.textBaseline = textBaseline;
    }
    redraw() {
        this.zoiea.context.font = this.font;
        this.zoiea.context.textAlign = this.textAlign;
        this.zoiea.context.textBaseline = this.textBaseline;
        let x = this.x;
        let y = this.y;
        if (this.textAlign === 'center') {
            x = this.x + this.zoiea.w;
        } else if (this.textAlign === 'right') {
            x = this.x + this.zoiea.width;
        }
        if (this.textBaseline === 'middle') {
            y = this.y + this.zoiea.h;
        } else if (this.textBaseline === 'bottom') {
            y = this.y + this.zoiea.height;
        }
        this.zoiea.context.fillStyle = this.fillStyle;
        this.zoiea.context.fillText(this.text, x, y);
    }
}

export { Text }