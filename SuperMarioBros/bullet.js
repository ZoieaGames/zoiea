import Bomb from './bomb.js';
import Graph from '../graph.js';
import Image from './image.js';
import Role from './role.js';
export default class Bullet extends Role {
    static image = { 1: [Image.image.bullet1] };
    static {
        for (let i = 0; i < 3; this.image[1].push(Graph.rotate(this.image[1][i++])));
        this.image[3] = [];
        for (const image of this.image[1]) this.image[3].push(Graph.flipX(image));
    }
    count = 0;
    index = 0;
    constructor(zoiea) {
        super(zoiea.x, zoiea.y, Bullet.image[zoiea.direction][0]);
        this.o.y = this.o.x = 1;
        this.v.x = (2 - (this.direction = zoiea.direction)) * 4;
        this.other = zoiea;
    }
    into(result) {
        this.a.y = .3;
        ++this.count % 2 || (this.image = Bullet.image[this.direction][++this.index % 4]);
        for (const zoiea of this.zoiea.zoieas) {
            if (zoiea === this || zoiea === this.other || !zoiea.type || !(result = this.in(zoiea))[0]) continue;
            if (zoiea.camp === 2) zoiea.ruin(this);
            else if (result[1] === 4) {
                this.y -= result[0];
                this.v.y = -3;
                break;
            }
            this.zoiea.append(new Bomb(this));
            this.zoiea.media.play(10);
            this.ruin();
            return;
        }
        this.y < this.zoiea.y + this.zoiea.height && this.x + this.image.width > this.zoiea.x || this.ruin();
    }
    ruin() {
        ++this.other.bullet;
        delete this.zoiea;
    }
}