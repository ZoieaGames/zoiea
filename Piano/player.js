import MIDI from './midi.js';
import Note from './note.js';
import Zoiea from '../zoiea.js';
export default class Player extends Zoiea {
    constructor(zoiea) {
        super(zoiea.x, zoiea.y, {});
    }
    async init(id) {
        const events = MIDI.decode(await (await fetch(`/Piano/mid/${id}.mid`)).arrayBuffer());
        let time = 0;
        const notes = [], scale = .24;
        for (const event of events) {
            time += event.time;
            if (event.type === 0)
                this.zoiea.append(new Note(this, event.data, time * scale, notes[event.data], event.index % 2 + 1));
            else event.type && (notes[event.data] = time * scale);
        }
    }
    redraw() { }
}