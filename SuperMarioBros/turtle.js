import Graph from '../graph.js';
import Image from './image.js';
import Role from './role.js';
export default class Turtle extends Role {
    static image = { 0: [Image.image.turtle1], 1: [Image.image.turtle2, Image.image.turtle3] };
    static {
        this.image[0].push(Graph.flipY(this.image[0][0]));
        this.image[3] = [Graph.flipX(this.image[1][0]), Graph.flipX(this.image[1][1])];
    }
    type = 1;
    camp = 2;
    count = 0;
    index = 0;
    level = 1;
    constructor(x, y, direction) {
        super(x, y + 1, Turtle.image[direction][0]);
        this.o.y = this.o.x = 1;
        this.v.x = (2 - (this.direction = direction)) * .5;
    }
    update() {
        this.a.y || ++this.count % 8 || (this.image = Turtle.image[this.direction][++this.index % 2]);
        super.update();
    }
    turn(zoiea) {
        this.level === 3 && zoiea.camp ? zoiea.ruin(this) : zoiea.camp === 1 && (this.x += this.v.x) || super.turn();
    }
    land(zoiea) {
        zoiea.camp === 1 && ++this.y || (this.v.y ? super.land() : this.ruin({ direction: 1 }));
    }
    ruin(zoiea) {
        this.type = 0;
        this.y -= 4;
        this.v.x = 2 - zoiea.direction;
        this.a.y = .35;
        this.v.y = -4;
        this.image = Turtle.image[0][1];
        this.zoiea.append(this);
        this.into = undefined;
        this.zoiea.media.play(12);
    }
    kick(zoiea) {
        switch (this.level) {
            case 2: this.level = 3;
                this.v.x = (2 - (this.direction = zoiea.x < this.x + 8 ? 1 : 3)) * 3;
                this.zoiea.media.play(12);
                break;
            case 1: this.y += 8;
                this.image = Turtle.image[0][0];
                this.update = super.update;
            case 3: this.level = 2;
                this.v.x = 0;
                this.zoiea.media.play(3);
                break;
        }
    }
}