import Actor from '../actor.js';
import Image from './image.js';
export default class Bullet extends Actor {
    constructor(zoiea) {
        super(zoiea.x + 16, zoiea.y, Image.image.PeaBullet1[0]);
    }
    update() {
        this.x += this.zoiea.step * 4;
        for (const zoiea of this.zoiea.zoieas) if (zoiea.type === 2 && this.in(zoiea)[0]) {
            zoiea.ruin()
            return this.ruin();
        }
        this.x < this.zoiea.x + 960 || delete this.zoiea;
    }
    ruinUpdate() {
        --this.count || delete this.zoiea;
    }
    ruin() {
        this.image = Image.image.PeaBulletHit1[0];
        this.count = 8;
        this.update = this.ruinUpdate;
        this.zoiea.PlantsVsZombies.play('splat');
    }
}