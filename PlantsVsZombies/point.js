import Actor from '../actor.js';
export default class Point extends Actor {
    constructor(x, y) {
        super(x, y, { width: 1, height: 1 });
    }
    redraw() { }
}