import { Text } from './text.js';
import { Player } from './player.js';
import { Enemy } from './enemy.js';
import image from './image.js';

class Panel extends Text {
    vehicles = new Array(18).fill(1);
    actives = new Set();
    live = 3;
    tick = 0;
    index = 0;
    constructor(x, y) {
        super(x, y);
        this.vehicles.push(2,2);
        this.shuffle(this.vehicles);
    }
    update() {
        if (!this.zoiea.zoiea && this.live) {
            --this.live;
            this.zoiea.append(this.zoiea.zoiea = new Player(128, 225, 1));
        } else if (!this.live) {
            this.zoiea.over();
        } else if (this.tick++ % 120 === 0 && this.vehicles.length && this.actives.size < 4) {
            this.index = (this.index + 1) % 3;
            const enemy = new Enemy(64 + this.index * 96, 32, this.vehicles.pop());
            this.zoiea.append(enemy);
            this.actives.add(enemy);
        } else if (!this.actives.size) {
            this.zoiea.over();
        }
    }
    redraw() {
        this.zoiea.context.drawImage(image.vehicle2, this.x, this.y + 120);
        this.zoiea.context.fillStyle = '#000';
        this.zoiea.context.font = this.font;
        this.zoiea.context.textAlign = this.textAlign;
        this.zoiea.context.textBaseline = this.textBaseline;
        this.zoiea.context.fillText(this.live, this.x + 10, this.y + 120);
        if (this.vehicles.length) {
            for (let j = 0, k = this.vehicles.length; j < 10; ++j) {
                for (let i = 0, y = this.y + j * 8; i < 2; ++i) {
                    this.zoiea.context.drawImage(image.vehicle1, this.x + i * 8, y);
                    if (!--k) {
                        return;
                    }
                }
            }
        }
    }
    remove(zoiea) {
        this.actives.delete(zoiea);
    }
    shuffle(array) {
        let i, j = array.length;
        while (j) {
            i = Math.random() * j-- >> 0;
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

export { Panel }