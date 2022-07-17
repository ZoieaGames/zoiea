import Actor from '../actor.js';
import Cover from './cover.js';
import Image from './image.js';
export default class Prop extends Actor {
    static image = {
        1: Image.image.prop1,
        2: Image.image.prop2,
        3: Image.image.prop3,
        4: Image.image.prop4,
        5: Image.image.prop5,
        6: Image.image.prop6,
    };
    static random() {
        return (Math.random() * 23 >> 0) * 8;
    }
    count = 0;
    index = 0;
    constructor(zoiea, level) {
        super(zoiea.x + Prop.random() - 88, zoiea.y + Prop.random() - 184, Prop.image[level]);
        this.level = level;
        this.other = zoiea;
    }
    update() {
        ++this.count % 8 || (++this.index % 2 ? this.redraw = () => { } : delete this.redraw);
        for (const zoiea of this.zoiea.zoieas) {
            if (zoiea.camp !== 1 || !this.in(zoiea)[0]) continue;
            switch (this.level) {
                case 1: ++this.zoiea.live;
                    break;
                case 2: this.zoiea.append(new Cover(zoiea, 960));
                    break;
                case 3: this.other.make(1);
                    break;
                case 4: this.other.limit = 960;
                    break;
                case 5: for (const zoiea of this.other.others) zoiea.ruin();
                    break;
                case 6: zoiea.level < 4 && ++zoiea.level;
                    break;
            }
            this.ruin();
            break;
        }
    }
    ruin() {
        this.zoiea.media.play(3);
        delete this.zoiea;
    }
}