import Event from './event.js';
import Media from '../media.js';
import Stage from './stage.js';
import Text from '../text.js';
import World from '../world.js';
class Main extends World {
    PlantsVsZombies = new Media('PlantsVsZombies/audio');
    offset = 0;
    constructor() {
        super();
        this.init();
        this.create(this.finished = new Text(8, 8, 'ZOIEA GAMES', 16));
        super.play();
        this.stop();
        Event.init(this);
    }
    resize() {
        this.canvas.width = Math.max(Math.min(window.innerWidth * this.canvas.height / window.innerHeight, 2520), 1440);
        this.context.imageSmoothingEnabled = false;
        this.context.scale(1.8, 1.8);
        this.width = Math.ceil(this.canvas.width / 1.8);
        this.height = Math.ceil(this.canvas.height / 1.8);
        const height = window.getComputedStyle(this.canvas).height;
        this.ratio = this.height / height.substring(0, height.length - 2);
    }
    init() {
        this.zoieas.length = 0;
        Stage.next(this);
    }
    play() {
        if (this.finished) {
            this.finished = this.damage(this.finished);
            this.init();
            this.playing || super.play();
            return this.PlantsVsZombies.play('awooga').then(() => this.PlantsVsZombies.play('Mountains', true));
        }
        if (this.paused) {
            this.paused = this.damage(this.paused);
            super.play();
            return this.PlantsVsZombies.play('Mountains', true);
        }
        this.create(this.paused = new Text(8, 8, 'PAUSED', 16));
        requestAnimationFrame(() => this.stop());
        this.PlantsVsZombies.stop('awooga');
        this.PlantsVsZombies.stop('Mountains');
    }
}
new Main();