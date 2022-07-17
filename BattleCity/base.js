import Actor from '../actor.js';
import Bomb from './bomb.js';
import Brick from './brick.js';
import Enemy from './enemy.js';
import Image from './image.js';
import Plate from './plate.js';
import Player from './player.js';
export default class Base extends Actor {
    static shuffle(array) {
        let i, j = array.length;
        while ([array[j], array[i]] = [array[i = Math.random() * j-- >> 0], array[j]], j);
        return array;
    }
    type = 1;
    zoieas = Base.shuffle([1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4]);
    bricks = [];
    others = new Set();
    count = 0;
    index = 0;
    constructor(x, y) {
        super(x, y, Image.image.base1);
        for (let i = 0; i < 10; this.zoieas[i++] *= -1);
        Base.shuffle(this.zoieas);
    }
    make(plate) {
        for (const zoiea of this.bricks) delete zoiea.zoiea;
        let x = this.x, y = this.y;
        if (plate) {
            this.bricks = [
                new Plate(x - 8, y - 8),
                new Plate(x, y - 8),
                new Plate(x + 8, y - 8),
                new Plate(x + 16, y - 8),
                new Plate(x - 8, y),
                new Plate(x + 16, y),
                new Plate(x - 8, y + 8),
                new Plate(x + 16, y + 8),
            ];
        } else {
            this.bricks = [];
            const brick = (x, y) => this.bricks.push(
                new Brick(x, y, 2), new Brick(x + 4, y, 1), new Brick(x, y + 4, 1), new Brick(x + 4, y + 4, 2),
            );
            brick(x - 8, y - 8);
            brick(x, y - 8);
            brick(x + 8, y - 8);
            brick(x + 16, y - 8);
            brick(x - 8, y);
            brick(x + 16, y);
            brick(x - 8, y + 8);
            brick(x + 16, y + 8);
        }
        for (const zoiea of this.bricks) this.zoiea.append(zoiea);
    }
    redraw() {
        super.redraw();
        this.zoiea.context.drawImage(Image.image.vehicle2, this.x + 120, this.y - 64);
        this.zoiea.context.fillStyle = '#000';
        this.zoiea.context.font = '8px monospace';
        this.zoiea.context.textAlign = 'left';
        this.zoiea.context.textBaseline = 'top';
        this.zoiea.context.fillText(this.zoiea.live, this.x + 130, this.y - 64);
        let k = 0;
        while (k < this.zoieas.length) this.zoiea.context.drawImage(
            Image.image.vehicle1, this.x + (k % 2) * 8 + 120, this.y + (k++ * .5 >> 0) * 8 - 184,
        );
    }
    update() {
        if (this.zoiea.finished) return;
        this.limit && --this.limit;
        if (!this.zoiea.zoiea) {
            if (!this.zoiea.live) return this.zoiea.over();
            --this.zoiea.live;
            this.zoiea.append(new Player(this, 1));
        }
        if (!this.others.size && !this.zoieas.length) return this.zoiea.over();
        if (this.count++ % 120 || this.others.size === 4 || !this.zoieas.length) return;
        const enemy = new Enemy(this, this.zoieas.pop());
        this.zoiea.append(enemy);
        this.others.add(enemy);
    }
    ruin() {
        this.type = 2;
        this.image = Image.image.base2;
        this.zoiea.append(new Bomb(this, 1));
        this.zoiea.media.play(1);
        this.zoiea.over();
    }
}