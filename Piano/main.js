import Event from './event.js';
import Keyboard from './keyboard.js';
import Media from '../media.js';
import Stage from './stage.js';
import Text from '../text.js';
import World from '../world.js';
class Main extends World {
    Piano = new Media('Piano/mp3');
    constructor() {
        super();
        this.create(this.finished = new Text(8, 8, 'ZOIEA GAMES', 32));
        this.plays = super.play();
        Event.init(this);
    }
    resize() {
        this.canvas.height = Math.max(Math.min(window.innerHeight * this.canvas.width / window.innerWidth, 1440), 864);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.init();
    }
    init() {
        this.others.clear();
        this.create(this.keyboard = new Keyboard(this));
        this.keyboard.init();
    }
    async next() {
        this.stop();
        await this.plays;
        this.init();
        this.zoieas.length = 0;
        await Stage.next(this);
        this.create(new Text(8, 8, Stage.stage[this.index], 32));
        this.plays = super.play();
    }
    play() {
        if (this.finished) {
            this.finished = this.damage(this.finished);
            this.index = 0;
            return this.next();
        }
        if (this.paused) {
            this.paused = this.damage(this.paused);
            return this.plays = super.play();
        }
        this.create(this.paused = new Text(8, 8, 'PAUSED', 32));
        requestAnimationFrame(() => this.stop());
    }
    onLeft() {
        this.index = (this.index - 1 + Stage.stage.length) % Stage.stage.length;
        this.next();
    }
    onRight() {
        this.index = ++this.index % Stage.stage.length;
        this.next();
    }
}
new Main();