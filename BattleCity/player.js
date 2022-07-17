import Bullet from './bullet.js';
import Cover from './cover.js';
import Graph from '../graph.js';
import Image from './image.js';
import Tank from './tank.js';
export default class Player extends Tank {
    static image = {
        1: { 2: [Image.image.tank11, Image.image.tank12] },
        2: { 2: [Image.image.tank13, Image.image.tank14] },
        3: { 2: [Image.image.tank15, Image.image.tank16] },
        4: { 2: [Image.image.tank17, Image.image.tank18] },
    };
    static {
        for (const image of Object.values(this.image)) {
            image[2].forEach(i => image[2].push(Graph.change(i, 0, 229, 180, 243, 205, 235, 0, 144, 50, 108, 0, 82, 0)));
            image[1] = [];
            for (const i of image[2]) image[1].push(Graph.rotate(i));
            image[3] = [];
            for (const i of image[1]) image[3].push(Graph.flipX(i));
            image[4] = [];
            for (const i of image[2]) image[4].push(Graph.flipY(i));
        }
    }
    velocity = 1;
    bullet = 1;
    camp = 1;
    constructor(zoiea, level) {
        super(zoiea.x - 32, zoiea.y, Player.image);
        if (((zoiea.zoiea.zoiea = this).level = level) === 1) this.velocity = .75;
        else if (level > 2) this.bullet = 2;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.cover && (this.cover.x = value);
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this.cover && (this.cover.y = value);
    }
    get cover() {
        return this._other;
    }
    set cover(value) {
        this._other && delete this._other.zoiea;
        this._other = value;
    }
    nextUpdate() {
        this.zoiea.append(new Cover(this, 180));
        super.nextUpdate();
    }
    moveUpdate() {
        !this.v.x && !this.v.y || super.moveUpdate();
    }
    ruin() {
        delete this.zoiea.zoiea;
        this.zoiea.media.play(1);
        super.ruin();
    }
    move(moving) {
        if (moving > 0) return moving === this.moving || !this.type || this.turn(this.moving = moving);
        if (-moving !== this.moving) return;
        this.v.y = this.v.x = 0;
        delete this.moving;
    }
    action(actioning) {
        if (!actioning) return delete this.actioning;
        if (this.actioning || !this.bullet || !this.type) return;
        this.actioning = actioning;
        --this.bullet;
        this.zoiea.append(new Bullet(this));
        this.zoiea.media.play(0);
    }
}