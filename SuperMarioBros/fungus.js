import Graph from '../graph.js';
import Image from './image.js';
import Role from './role.js';
export default class Fungus extends Role {
    static image = [Image.image.fungus1];
    static {
        this.image.push(Graph.flipX(this.image[0]));
        this.image.push(Graph.flipY(this.image[0]));
        this.image.push(Graph.flipY(this.image[1]));
    }
    type = 1;
    count = 0;
    index = 0;
    level = 1;
    camp = 2;
    constructor(x, y, direction) {
        super(x, y + 1, Fungus.image[0]);
        this.o.y = this.o.x = 1;
        this.v.x = (2 - (this.direction = direction)) * .5;
    }
    update() {
        this.a.y || ++this.count % 8 || (this.image = Fungus.image[++this.index % 2]);
        super.update();
    }
    ruinUpdate() {
        --this.count || delete this.zoiea;
    }
    turn(zoiea) {
        zoiea.camp === 1 && (this.x += this.v.x) || super.turn();
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
        this.image = Fungus.image[zoiea.direction === 1 ? 2 : 3];
        this.zoiea.append(this);
        this.into = undefined;
        this.zoiea.media.play(12);
    }
    kick() {
        this.type = 0;
        this.y += 9;
        this.image = Image.image.fungus2;
        this.count = 32;
        this.update = this.ruinUpdate;
        this.zoiea.media.play(3);
    }
}