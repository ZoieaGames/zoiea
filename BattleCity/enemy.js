import Bullet from './bullet.js';
import Graph from '../graph.js';
import Image from './image.js';
import Prop from './prop.js';
import Tank from './tank.js';
export default class Enemy extends Tank {
    static image = {
        1: { 2: [Image.image.tank1, Image.image.tank2] },
        2: { 2: [Image.image.tank3, Image.image.tank4] },
        3: { 2: [Image.image.tank5, Image.image.tank6] },
        4: { 2: [Image.image.tank7, Image.image.tank8] },
    };
    static {
        for (const image of Object.values(this.image)) {
            image[2].forEach(i => image[2].push(Graph.change(i, 1, 174, 181, 50, 32, 64, 92, 0, 126)));
            image[1] = [];
            for (const i of image[2]) image[1].push(Graph.rotate(i));
            image[3] = [];
            for (const i of image[1]) image[3].push(Graph.flipX(i));
            image[4] = [];
            for (const i of image[2]) image[4].push(Graph.flipY(i));
        }
    }
    static random(size, base) {
        return Math.random() * size + base >> 0;
    }
    velocity = .5;
    bullet = 1;
    factor = Enemy.random(480, 240);
    camp = 2;
    constructor(zoiea, level) {
        super(zoiea.x - 96 + (++zoiea.index % 3) * 96, zoiea.y - 192, Enemy.image);
        this.other = zoiea;
        if (level < 0) {
            this.level = -level;
            this.offset = 2;
        } else this.level = level;
        if (level === 2) this.velocity = 1;
        else if (level > 2) this.bullet = 2;
        this.turn(Enemy.random(4, 1));
    }
    moveUpdate() {
        if (this.other.limit) return;
        if (!(++this.count % 60) && this.bullet) {
            --this.bullet;
            this.zoiea.append(new Bullet(this));
        }
        if (!(this.count % this.factor)) {
            this.factor = Enemy.random(120, 60);
            this.turn(Enemy.random(4, 1));
        }
        super.moveUpdate();
    }
    bump(result) {
        super.bump(result);
        this.turn(result[1] === 1 ? 4 : Enemy.random(4, 1));
    }
    ruin() {
        this.offset && this.zoiea.append(new Prop(this.other, Math.ceil(Math.random() * 6)));
        this.other.others.delete(this);
        this.zoiea.media.play(2);
        super.ruin();
    }
}