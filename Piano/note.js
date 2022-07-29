import Graph from '../graph.js';
import Key from './key.js';
import Zoiea from '../zoiea.js';
export default class Note extends Zoiea {
    static width = [32, 20, 32, 20, 32, 32, 20, 32, 20, 32, 20, 32];
    constructor(zoiea, note, time, last, track) {
        const index = note % 12, width = Note.width[index], height = Math.ceil(time - last), images = {
            1: [Graph.rect(width, height, '#09f'), Graph.rect(width, height, '#0ff')],
            2: [Graph.rect(width, height, '#f90'), Graph.rect(width, height, '#ff0')],
        };
        super(zoiea.x + (note / 12 >> 0) * 252 + Key.offset[index] - 406, -time, images[track][0]);
        this.note = note;
        this.images = images;
        this.index = track;
    }
    update() {
        this.y += this.zoiea.step * 4;
        if (this.y + this.image.height < this.zoiea.height - 208) return;
        if (!this.playing) {
            this.playing = this.image = this.images[this.index][1];
            Key.key[this.note].play();
            this.zoiea.Piano.play(this.note);
        }
        if (this.y < this.zoiea.height - 208) return;
        Key.key[this.note].stop();
        this.zoiea.Piano.stop(this.note);
        delete this.zoiea;
    }
}