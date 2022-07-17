import Actor from '../actor.js';
import Bomb from './bomb.js';
import Graph from '../graph.js';
import Image from './image.js';
export default class Bullet extends Actor {
    static image = { 2: Image.image.bullet1 };
    static {
        this.image[1] = Graph.rotate(this.image[2]);
        this.image[3] = Graph.flipX(this.image[1]);
        this.image[4] = Graph.flipY(this.image[2]);
    }
    type = 4;
    velocity = 2;
    v = { x: 0, y: 0 };
    constructor(zoiea) {
        super(zoiea.x + 4, zoiea.y + 4, Bullet.image[zoiea.direction]);
        this.o.y = this.o.x = 2;
        this.other = zoiea;
        zoiea.level === 3 && (this.velocity = 3);
        switch (this.direction = zoiea.direction) {
            case 1: this.v.x = this.velocity;
                break;
            case 2: this.v.y = -this.velocity;
                break;
            case 3: this.v.x = -this.velocity;
                break;
            case 4: this.v.y = this.velocity;
                break;
        }
    }
    update() {
        this.x += this.v.x * this.zoiea.step;
        this.y += this.v.y * this.zoiea.step;
        for (const zoiea of this.zoiea.zoieas) {
            if (zoiea === this || zoiea === this.other || !zoiea.type || zoiea.type === 2 || !this.in(zoiea)[0])
                continue;
            if (zoiea.camp !== this.other.camp && !zoiea.cover) {
                zoiea.type === 4 || this.zoiea?.append(new Bomb(this));
                if (zoiea.type === 3) switch (this.direction) {
                    case 1: case 3: this.o.y -= 4.5;
                        this.into();
                        this.o.y += 4.5;
                        break;
                    case 2: case 4: this.o.x -= 4.5;
                        this.into();
                        this.o.x += 4.5;
                        break;
                } else zoiea.ruin?.(this.other);
            }
            this.ruin();
            break;
        }
    }
    into() {
        for (const zoiea of this.zoiea.zoieas) zoiea.type === 3 && this.in(zoiea)[0] && zoiea.ruin(this.other);
    }
    ruin() {
        this.type = 0;
        ++this.other.bullet;
        delete this.zoiea;
    }
}