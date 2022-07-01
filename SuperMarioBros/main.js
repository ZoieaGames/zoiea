import { World } from './world.js';
import { Ghost } from './ghost.js';
import { Role } from './role.js';
import { Map } from './map.js';
import { Time } from './time.js';
import { Debug } from './debug.js';
import { Over } from './over.js';
import { Event } from './event.js';
import { Media } from './media.js';

class Main extends World {
    fillStyle = '#9390fe';
    constructor() {
        super();
        this.ghost = true;
        this.init();
        this.uiAppend(this.pause = new Over('ZOIEA GAMES'));
        this.media = new Media();
        this.media.load(0);
    }
    init() {
        this.y = this.x = this.index = 0;
        this.ghost = new Ghost(-16, 0, { width: 16, height: this.height });
        this.zoiea = new Role(40, this.height - 40);
        this.zoieas = [this.ghost, this.zoiea];
        let size = Math.ceil(this.width * .125);
        do {
            if (Map.map[this.index]) {
                this.grow();
            }
        } while (++this.index <= size);
        this.time = new Time();
        this.ui = [];
        this.uiAppend(this.time);
        this.uiAppend(new Debug(this));
        this.step = 0;
        Event.init(this);
    }
    grow() {
        const zoieas = Map.get(this);
        this.insert(this.ghost, ...zoieas[0]);
        this.append(...zoieas[1]);
    }
    update() {
        if (this.zoiea.x > 3840) {
            this.zoiea.finished = true;
            this.zoiea.x = 3840;
            this.time.time = 0;
            this.zoiea.over(this);
            return;
        }
        if (this.zoiea.y > this.height) {
            this.zoiea.x = this.x + 40;
            this.zoiea.y = -48;
            this.zoiea.finished = true;
            this.uiAppend(this.over = new Over(this.time.time > 0 ? 'WASTED' : 'GAME OVER'));
            this.stop();
            this.media.stop(0);
            this.media.stop(19);
            this.media.stop(17);
            if (this.zoiea.played) {
                this.zoiea.played = false;
            } else {
                this.media.play(3);
            }
            return;
        }
        if (this.zoiea.x > this.x + this.w * .5) {
            this.x += 1.5;
            this.ghost.x += 1.5;
        }
        if (this.x + this.width > this.index * 8 && Map.map[++this.index]) {
            this.grow();
        }
    }
    async reborn() {
        if (this.time.time > 0) {
            this.over.refuse();
            this.over = undefined;
            this.time.time -= 10;
            this.zoiea.reborn();
        } else {
            this.over = undefined;
            this.id += this.zoieas.length + this.ui.length;
            this.init();
        }
        this.play();
        this.media.play(this.time.time > 100 ? 0 : 19, true)
    }
    enter() {
        if (this.zoiea.finished) {
            return;
        }
        if (this.playing) {
            this.uiAppend(this.pause = new Over('PAUSED'));
            this.stop();
            this.media.stop(0);
            this.media.stop(19);
            this.media.stop(17);
        } else {
            this.pause.refuse();
            this.pause = undefined;
            this.play();
            this.media.play(this.time.time > 100 ? 0 : 19, true);
        }
    }
    onDown(event) {
        super.onDown(event);
        switch (event.code) {
            case 'ArrowRight':
                this.zoiea.go(this, 1);
                break;
            case 'ArrowLeft':
                this.zoiea.go(this, -1);
                break;
            case 'ArrowDown':
                this.zoiea.crouch(this, true);
                break;
            case 'ArrowUp':
                this.zoiea.fly?.(this, true);
                break;
            case 'KeyX':
                this.zoiea.jump(this);
                break;
            case 'KeyZ':
                this.zoiea.fire(this);
                break;
        }
    }
    onUp(event) {
        super.onUp(event);
        switch (event.code) {
            case 'ArrowRight':
                if (this.L) {
                    this.zoiea.go(this, -1);
                } else {
                    this.zoiea.going = false;
                }
                break;
            case 'ArrowLeft':
                if (this.R) {
                    this.zoiea.go(this, 1);
                } else {
                    this.zoiea.going = false;
                }
                break;
            case 'ArrowDown':
                this.zoiea.crouch(this, false);
                break;
            case 'ArrowUp':
                this.zoiea.fly?.(this, false);
            case 'KeyX':
                this.zoiea.jumping = false;
                break;
            case 'KeyZ':
                this.zoiea.firing = false;
                break;
            case 'Enter':
                if (this.over) {
                    this.reborn();
                } else {
                    this.enter();
                }
                break;
        }
    }
}

new Main();