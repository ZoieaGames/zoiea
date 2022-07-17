import Actor from '../actor.js';
import Agaric from './agaric.js';
import Coin from './coin.js';
import Flower from './flower.js';
import Graph from '../graph.js';
import Image from './image.js';
import Star from './star.js';
export default class Plate extends Actor {
    static image = {
        1: Graph.draw(16, 16, Graph.change(Image.image.plate2, 0, 153, 235, 159, 35), Image.image.plate1),
        2: Graph.draw(16, 16, Image.image.plate2, Image.image.plate1),
        3: Graph.draw(16, 16, Graph.change(Image.image.plate2, 0, 153, 87, 29, 0), Image.image.plate1),
    };
    static images = [this.image[1], this.image[1], this.image[1], this.image[2], this.image[3], this.image[2]];
    static offset = [-1, -2, -2, -1, 0, -1, 0, 0, 1, 1, 1, 1, 2, 2, -1];
    type = 1;
    count = 0;
    index = 0;
    constructor(x, y, level) {
        super(x, y, +level === 3 || +level === 4 ? Image.image.brick1 : Plate.image[1]);
        switch (this.level = +level) {
            case 1: case 2: this.update = this.varyUpdate;
                break;
            case 4: this.limit = 120;
                break;
            case 5: this.redraw = () => { };
                break;
        }
    }
    varyUpdate() {
        ++this.count % 8 || (this.image = Plate.images[++this.index % 6]);
    }
    swayUpdate() {
        if (this.index !== 15) return this.y += Plate.offset[this.index++];
        delete this.update;
        switch (this.level) {
            case 2: this.zoiea.insert(this.other.level === 1 ? new Agaric(this, 1) : new Flower(this), this);
                break;
            case 3: this.zoiea.insert(new Star(this), this);
                break;
            case 4: this.update = this.coinUpdate;
                break;
            case 5: this.zoiea.insert(new Agaric(this, 2), this);
                break;
        }
    }
    coinUpdate() {
        --this.limit || delete this.update;
    }
    ruin(zoiea) {
        this.other = zoiea;
        this.index = 0;
        this.update = this.swayUpdate;
        if (this.level === 1 || this.level === 4) {
            this.zoiea.append(new Coin(this));
            this.zoiea.media.play(6);
        } else this.zoiea.media.play(5);
        if (this.level === 4 && this.limit) return;
        this.image = Image.image.plate2;
        this.level === 5 && delete this.redraw;
        this.ruin = undefined;
    }
}