import { Zoiea } from './zoiea.js';
import { Bomb } from './bomb.js';
import { image, flipX, flipY, rotate } from './image.js'

const images = { 1: image.bullet1 }
images[2] = rotate(images[1]);
images[3] = flipY(images[1]);
images[4] = flipX(images[2]);

class Bullet extends Zoiea {
    type = 4;
    velocity = 2;
    copy = { width: 9, height: 9, collide: this.collide };
    constructor(x, y, zoiea, direction = zoiea.direction) {
        super(x, y, images[direction]);
        this.tank = zoiea;
        this.direction = direction;
        this.camp = zoiea.camp;
        if (this.camp === 2 && zoiea.level === 3) {
            this.velocity = 4;
        }
        switch (direction) {
            case 1:
                this.y -= 4;
                this.width += 5;
                this.copy.height = this.height -= 4;
                this.redraw = this.redraw1;
                break;
            case 2:
                this.x += 12;
                this.copy.width = this.width -= 4;
                this.height += 5;
                this.redraw = this.redraw2;
                break;
            case 3:
                this.y += 12;
                this.width += 5;
                this.copy.height = this.height -= 4;
                this.redraw = this.redraw1;
                break;
            case 4:
                this.x -= 4;
                this.copy.width = this.width -= 4;
                this.height += 5;
                this.redraw = this.redraw2;
                break;
        }
    }
    update() {
        this.collision();
        this.update = this.moveUpdate;
    }
    moveUpdate() {
        this.go();
        this.collision();
    }
    redraw1() {
        this.zoiea.context.drawImage(this.image, this.x + 3, this.y - 2);
    }
    redraw2() {
        this.zoiea.context.drawImage(this.image, this.x - 2, this.y + 3);
    }
    go() {
        switch (this.direction) {
            case 1:
                this.y -= this.velocity * this.zoiea.step;
                break;
            case 2:
                this.x += this.velocity * this.zoiea.step;
                break;
            case 3:
                this.y += this.velocity * this.zoiea.step;
                break;
            case 4:
                this.x -= this.velocity * this.zoiea.step;
                break;
        }
    }
    fuck(result) {
        let x = this.x;
        let y = this.y;
        switch (result[0]) {
            case 1:
                y += result[1];
                break;
            case 2:
                x -= result[1] + 12;
                break;
            case 3:
                y -= result[1] + 12;
                break;
            case 4:
                x += result[1];
                break;
        }
        for (let direction = 1; direction < 5; ++direction) {
            const bullet = new Bullet(x, y, { level: 4, direction, camp: 1 });
            if (bullet.direction === 1 || bullet.direction === 3) {
                bullet.copy.x = bullet.x + 2;
                bullet.copy.y = bullet.y;
            } else if (bullet.direction === 2 || bullet.direction === 4) {
                bullet.copy.x = bullet.x;
                bullet.copy.y = bullet.y + 2;
            }
            for (const zoiea of this.zoiea.zoieas) {
                if (zoiea == bullet || zoiea === bullet.tank || !zoiea.type || zoiea.type === 2) {
                    continue;
                }
                if (result = zoiea.type === 3 ? bullet.collide(zoiea) : bullet.copy.collide(zoiea)) {
                    if (result[1] === 0) {
                        continue;
                    }
                    bullet.camp = 3;
                    break;
                }
            }
            this.zoiea.append(bullet);
        }
    }
    collision(result) {
        if (this.direction === 1 || this.direction === 3) {
            this.copy.x = this.x + 2;
            this.copy.y = this.y;
        } else if (this.direction === 2 || this.direction === 4) {
            this.copy.x = this.x;
            this.copy.y = this.y + 2;
        }
        for (const zoiea of this.zoiea.zoieas) {
            if (zoiea === this || zoiea === this.tank || !zoiea.type || zoiea.type === 2) {
                continue;
            }
            if (result = zoiea.type === 3 ? this.collide(zoiea) : this.copy.collide(zoiea)) {
                if (result[1] === 0) {
                    continue;
                }
                if (zoiea.type !== 4 && zoiea.camp !== this.camp && !zoiea.cover) {
                    zoiea.bomb?.(this.tank);
                    this.zoiea.append(new Bomb(this.x + this.w, this.y + this.h));
                }
                if (!this.refused) {
                    this.refuse();
                    this.update = undefined;
                }
            }
        }
    }
    refuse() {
        super.refuse();
        ++this.tank.bullet;
    }

}

export { Bullet }