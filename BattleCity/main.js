import Media from '../media.js';
import Stage from './stage.js';
import Text from '../text.js';
import World from '../world.js';
class Main extends World {
    media = new Media('BattleCity');
    live = 3;
    index = 0;
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
    }
    over() {
        if (this.finished) return;
        this.create(this.finished = new Text(8, 8, 'GAME OVER'));
        ++this.live;
        delete this.zoiea;
        this.media.stop(5);
        this.media.stop(4);
    }
    play() {
        if (this.finished) {
            this.finished = this.damage(this.finished);
            this.index = Math.random() * Stage.stage.length >> 0;
            this.init();
            this.playing || super.play();
            return this.media.play(5).then(() => this.finished || this.paused || this.media.play(4, true));
        }
        if (this.paused) {
            this.paused = this.damage(this.paused);
            super.play();
            return this.media.play(4, true);
        }
        this.create(this.paused = new Text(8, 8, 'PAUSED'));
        requestAnimationFrame(() => this.stop());
        this.media.stop(5);
        this.media.stop(4);
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
        }
    }
}
new Main();