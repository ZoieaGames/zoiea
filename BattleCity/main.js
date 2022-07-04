import { World } from './world.js';
import { Edge } from './edge.js';
import { Map } from './map.js';
import { Debug } from './debug.js';
import { Pause } from './pause.js';
import { Panel } from './panel.js';
import { Media } from './media.js';

class Main extends World {
    media = new Media();
    constructor() {
        super();
        this.init();
        this.uiAppend(this.finished = this.pause = new Pause('ZOIEA GAMES'));
    }
    init() {
        this.zoieas = [];
        this.append(new Edge(0, 0, { width: 360, height: 32 }));
        this.append(new Edge(0, 32, { width: 64, height: 208 }));
        this.append(new Edge(272, 32, { width: 88, height: 208 }));
        this.append(new Edge(0, 240, { width: 360, height: 30 }));
        Map.init(this);
        this.ui = [];
        this.uiAppend(new Debug(360, 0));
        this.uiAppend(this.panel = new Panel(280, 40));
    }
    enter() {
        if (this.finished) {
            this.id += this.zoieas.length + this.ui.length;
            this.init();
            this.finished = this.pause = void this.pause.refuse();
            this.playing || this.play();
            this.media.play(5).then(() => this.media.play(4, true));
            return;
        }
        if (this.playing) {
            this.uiAppend(this.pause = new Pause('PAUSED'));
            this.stop();
            this.media.stop(4);
        } else {
            this.pause = void this.pause.refuse();
            this.play();
            this.media.play(4, true);
        }
    }
    over() {
        if (this.finished) {
            return;
        }
        this.uiAppend(this.finished = this.pause = new Pause('GAME OVER'));
        this.panel.update = undefined;
        this.zoiea.moving = 0;
        this.zoiea = undefined;
        this.media.stop(4);
    }
    onDown(event) {
        super.onDown(event);
        switch (event.code) {
            case 'KeyX':
                this.zoiea?.fire(1);
                break;
        }
    }
    onUp(event) {
        super.onUp(event);
        switch (event.code) {
            case 'KeyX':
                this.zoiea?.fire(0);
                break;
            case 'Enter':
                this.enter();
                break;
        }
    }
}
new Main();