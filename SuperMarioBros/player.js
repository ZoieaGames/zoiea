import Bullet from './bullet.js';
import Graph from '../graph.js';
import Image from './image.js';
import Role from './role.js';
export default class Player extends Role {
    static image = {
        0: {
            1: [
                Image.image.role20, Image.image.role21, Image.image.role22, Image.image.role23, Image.image.role24,
                Image.image.role21, Image.image.role21, Image.image.role21, Image.image.role21, Image.image.role21,
            ],
        },
        1: {
            1: [
                Image.image.role2, Image.image.role3, Image.image.role4, Image.image.role5, Image.image.role6,
                Image.image.role1, Image.image.role7, Image.image.role8, Image.image.role9, Image.image.role25,
            ],
        },
        2: {
            1: [
                Image.image.role12, Image.image.role13, Image.image.role14, Image.image.role15, Image.image.role16,
                Image.image.role11, Image.image.role17, Image.image.role18, Image.image.role19, Image.image.role26,
            ],
        },
        3: { 1: [] },
    };
    static {
        for (const image of this.image[2][1])
            this.image[3][1].push(Graph.change(image, 0, 181, 247, 217, 166, 108, 181, 50, 32, 235, 235, 159, 35));
        this.image[1][1].forEach((image, index) => {
            this.image[1][1].push(Graph.change(image, 0, 181, 247, 217, 166, 108, 181, 50, 32, 235, 235, 159, 35));
            this.image[0][1].push(this.image[0][1][index]);
            this.image[2][1].push(this.image[3][1][index]);
            this.image[3][1].push(this.image[2][1][index]);
        });
        for (const image of Object.values(this.image)) {
            image[3] = [];
            for (const i of Object.values(image[1])) image[3].push(Graph.flipX(i));
        }
    }
    type = 1;
    camp = 1;
    count = 0;
    index = 0;
    level = 1;
    direction = 1;
    last = 1;
    bullet = 2;
    constructor(zoiea) {
        super(zoiea.x + 40, zoiea.y + 231, Player.image[1][1][5]);
        (zoiea.zoiea = this).o.y = this.o.x = 1;
    }
    update() {
        ++this.count;
        this.crouching || this.a.y || this.count % 4 || this.v.x && this.change(++this.index % 3);
        if (this.actioning && this.v.y < -2) this.v.y -= .27 * this.zoiea.step;
        if (this.a.x) {
            this.v.x += this.a.x * this.zoiea.step;
            switch (this.a.x) {
                case .05: if (this.v.x > 2) {
                    this.v.x = 2;
                    this.a.x = 0;
                } else if (this.v.x < 0) this.crouching || this.a.y || this.change(3);
                    break;
                case -.05: if (this.v.x < -2) {
                    this.v.x = -2;
                    this.a.x = 0;
                } else if (this.v.x > 0) this.crouching || this.a.y || this.change(3);
                    break;
                case .04: if (this.v.x > 0) {
                    this.a.x = this.v.x = 0;
                    this.crouching || this.change(5);
                } else this.crouching || this.a.y || this.change(3);
                    break;
                case -.04: if (this.v.x < 0) {
                    this.a.x = this.v.x = 0;
                    this.crouching || this.change(5);
                } else this.crouching || this.a.y || this.change(3);
                    break;
                case .03: if (this.v.x > 0) {
                    this.a.x = this.v.x = 0;
                    this.crouching || this.change(5);
                }
                    break;
                case -.03: if (this.v.x < 0) {
                    this.a.x = this.v.x = 0;
                    this.crouching || this.change(5);
                }
                    break;
            }
        }
        this.fire && (this.image = Player.image[--this.fire ? 0 : this.level][this.last][this.index]);
        if (this.limit && this.count % 2) {
            if (this.offset) {
                if (!--this.limit) {
                    delete this.offset;
                    this.zoiea.media.stop(16);
                    this.zoiea.media.play(1, true);
                }
                this.image = Player.image[this.level][this.last][this.limit % 2 ? this.index + this.offset : this.index];
            } else --this.limit % 2 ? this.redraw = () => { } : delete this.redraw;
        }
        super.update();
        if (this.y < this.zoiea.y + this.zoiea.height && this.x + this.image.width > this.zoiea.x) return;
        --this.zoiea.live;
        this.zoiea.over();
        delete this.zoiea.zoiea;
        delete this.zoiea;
    }
    upUpdate() {
        if (++this.count !== 8) return;
        this.type = 1;
        this.y -= 8;
        this.level = 2;
        this.change(this.index);
        delete this.update;
    }
    downUpdate() {
        if (++this.count !== 8) return;
        this.y += 16;
        this.level = 1;
        this.image = Player.image[this.level][this.direction][8];
        this.count = 0;
        this.update = this.nextUpdate;
    }
    nextUpdate() {
        if (++this.count !== 8) return;
        this.type = 1;
        this.change(this.index);
        delete this.update;
    }
    overUpdate(result) {
        this.y += 2;
        ++this.count % 4 || this.change(++this.index % 2 + 6);
        for (const zoiea of this.zoiea.zoieas) {
            if (zoiea === this || !zoiea.type || (result = this.in(zoiea))[1] !== 4) continue;
            this.x += 12;
            this.y -= result[0];
            this.a.x = .05;
            this.image = Player.image[this.level][3][7];
            this.zoiea.append(this);
            delete this.update;
            break;
        }
    }
    up() {
        this.zoiea.media.play(7);
        if (this.level !== 1) {
            this.level = 3;
            return this.change(this.index);
        }
        this.type = 0;
        this.y -= 8;
        this.image = Player.image[this.level][this.direction][9];
        this.count = 0;
        this.update = this.upUpdate;
    }
    down() {
        this.a.y = 0;
        this.crouch(-1);
        this.type = 0;
        this.limit = 80;
        this.image = Player.image[this.level][this.direction][8];
        this.count = 0;
        this.update = this.downUpdate;
        this.zoiea.media.play(13);
    }
    over(zoiea) {
        zoiea.ruin(this);
        if (!this.type) return this.redraw = () => { };
        this.x = zoiea.x - 8;
        this.v.y = this.a.y = this.v.x = 0;
        this.crouch(-1);
        this.type = 0;
        this.image = Player.image[this.level][this.direction = 1][6];
        this.update = this.overUpdate;
    }
    turn(zoiea) {
        if (zoiea.type === 2) return this.over(zoiea);
        if (!zoiea.camp) return;
        this.offset ? zoiea.ruin(this) : zoiea.level === 2 ? zoiea.kick(this) : this.limit || this.ruin();
    }
    peak(zoiea) {
        if (zoiea.camp) return this.offset ? zoiea.ruin(this) : this.limit || this.ruin();
        if (this.v.y > 0) return;
        zoiea.ruin?.(this);
        this.v.y = 0;
        this.zoiea.media.play(11);
    }
    land(zoiea) {
        if (zoiea.camp && this.v.y > 0) {
            zoiea.kick?.(this);
            return this.v.y = -2.5;
        }
        super.land();
        this.crouching ? this.crouch(-1) : this.change(5);
    }
    change(index) {
        this.image = Player.image[this.level][this.last = this.direction][this.index = index];
    }
    shield() {
        this.limit = 360;
        this.offset = 10;
        delete this.redraw;
        this.zoiea.media.stop(1);
        this.zoiea.media.play(16, true);
    }
    ruin() {
        if (this.level !== 1) return this.down();
        this.type = 0;
        this.y -= 4;
        this.v.x = this.a.x = 0;
        this.a.y = .35;
        this.v.y = -6;
        this.image = Image.image.role10;
        this.zoiea.append(this);
        this.into = undefined;
        this.zoiea.media.stop(1);
        this.zoiea.media.play(4);
    }
    move(moving) {
        if (moving === 4 || moving === -4) return this.crouch(moving);
        if (moving < 0 || moving === 2) {
            if (-moving === this.moving && this.type) {
                if (this.v.x && (moving + 2) === Math.sign(this.v.x)) this.a.x = -(moving + 2) * .03;
                else if (this.v.x) this.a.x = (moving + 2) * .04;
                delete this.moving;
            }
            return;
        }
        if (moving === this.moving || !this.type || this.crouching && !this.a.y) return;
        this.a.x = (2 - (this.direction = this.moving = moving)) * .05;
    }
    crouch(crouching) {
        if (crouching < 0) {
            if (this.crouching && !this.a.y && this.type) {
                this.y -= 8;
                this.change(5);
                delete this.crouching;
            }
            return;
        }
        if (this.crouching || this.a.y || !this.type || this.level === 1) return;
        this.crouching = crouching;
        this.y += 8;
        this.change(9);
    }
    action(actioning) {
        if (!actioning) return delete this.actioning;
        if (this.actioning || this.a.y || !this.type) return;
        this.actioning = actioning;
        this.v.y = -4;
        this.a.y = .35;
        this.crouching || this.change(4);
        this.zoiea.media.play(2);
    }
    motion(motioning) {
        if (!motioning) return delete this.motioning;
        if (this.motioning || this.crouching || !this.bullet || this.level !== 3 || !this.type) return;
        this.motioning = motioning;
        --this.bullet;
        this.zoiea.insert(new Bullet(this), this);
        this.fire = 8;
        this.zoiea.media.play(9);
    }
}