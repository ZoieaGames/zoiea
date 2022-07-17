import Media from '../media.js';
import Player from './player.js';
import Stage from './stage.js';
import Text from '../text.js';
import World from '../world.js';
class Main extends World {
    media = new Media('SuperMarioBros');
    length = Stage.stage.length;
    index = 0;
    live = 3;
    offset = 0;
    constructor() {
        super();
        this.init();
        this.create(this.finished = new Text(8, 8, 'ZOIEA GAMES'));
        super.play();
        this.stop();
        document.onkeyup = document.onkeydown = event => this.on(event);
    }
    init() {
        this.zoieas.length = 0;
        Stage.next(this);
        ++this.index;
        Stage.next(this);
        ++this.index;
        this.append(new Player(this));
        this.others.add(this);
    }
    redraw() {
        this.context.fillStyle = '#fff';
        this.context.font = '8px monospace';
        this.context.textAlign = 'left';
        this.context.textBaseline = 'top';
        this.context.fillText(this.live, 1, 0);
    }
    update() {
        if (!this.zoiea || this.zoiea.x < this.x + this.width * .5 || this.x + this.width >= this.length * 256) return;
        this.x += 2;
        if (this.x + this.width < this.index * 256) return;
        if (this.index === this.length) return;
        Stage.next(this);
        ++this.index;
    }
    over() {
        if (this.finished) return;
        this.create(this.finished = new Text(8, 8, 'GAME OVER'));
        ++this.live;
        delete this.zoiea;
        this.media.stop(0);
        this.media.stop(1);
        this.media.stop(16);
    }
    play() {
        if (this.finished) {
            this.finished = this.damage(this.finished);
            this.x = this.index = 0;
            this.init();
            this.playing || super.play();
            return this.media.play(0).then(() => this.finished || this.paused || this.media.play(1, true));
        }
        if (this.paused) {
            this.paused = this.damage(this.paused);
            super.play();
            return this.media.play(1, true);
        }
        this.create(this.paused = new Text(8, 8, 'PAUSED'));
        requestAnimationFrame(() => this.stop());
        this.media.stop(0);
        this.media.stop(1);
        this.media.stop(16);
    }
    on(event) {
        if (event.code === 'Enter' && event.type === 'keyup') return this.play();
        if (!this.zoiea) return;
        switch (event.code) {
            case 'ArrowRight': this.zoiea.move(event.type === 'keyup' ? -1 : 1);
                break;
            case 'ArrowUp': this.zoiea.move(event.type === 'keyup' ? -2 : 2);
                break;
            case 'ArrowLeft': this.zoiea.move(event.type === 'keyup' ? -3 : 3);
                break;
            case 'ArrowDown': this.zoiea.move(event.type === 'keyup' ? -4 : 4);
                break;
            case 'KeyX': this.zoiea.action(event.type !== 'keyup');
                break;
            case 'KeyZ': this.zoiea.motion(event.type !== 'keyup');
                break;
        }
    }
}
new Main();