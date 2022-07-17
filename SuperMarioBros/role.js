import Actor from '../actor.js';
export default class Role extends Actor {
    a = { x: 0, y: 0 };
    v = { x: 0, y: 0 };
    constructor(x, y, image) {
        super(x, y, image);
    }
    update() {
        this.x += this.v.x * this.zoiea.step;
        if (this.a.y) {
            this.v.y += this.a.y * this.zoiea.step;
            if (this.v.y > 4) {
                this.v.y = 4;
                this.a.y = 0;
            }
        }
        this.y += this.v.y * this.zoiea.step;
        this.into?.();
    }
    into(result) {
        this.a.y = .35;
        for (const zoiea of this.zoiea.zoieas) {
            if (zoiea === this || !zoiea.type || !(result = this.in(zoiea))[1]) continue;
            result[0] ? this.bump(result, zoiea) : result[1] === 4 && (this.v.y = this.a.y = 0);
        }
    }
    bump(result, zoiea) {
        switch (result[1]) {
            case 1: this.x -= result[0];
                this.turn(zoiea);
                break;
            case 2: this.y += result[0];
                this.peak(zoiea);
                break;
            case 3: this.x += result[0];
                this.turn(zoiea);
                break;
            case 4: this.y -= result[0];
                this.land(zoiea);
                break;
        }
    }
    turn() {
        this.direction = 4 - this.direction;
        this.v.x *= -1;
    }
    peak() {
        this.v.y = 0;
    }
    land() {
        this.v.y = this.a.y = 0;
    }
}