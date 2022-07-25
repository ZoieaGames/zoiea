import Actor from '../actor.js';
import Graph from '../graph.js';
import Image from './image.js';
export default class Bridge extends Actor {
    static {
        const bridge1 = Graph.grid(
            [Graph.repeat(Image.image.bridge3, 4, 1)],
            [Image.image.bridge1, Graph.crop(Image.image.bridge1, 0, 0, 8, 8)],
        ),
            bridge9 = Graph.crop(Image.image.bridge6, 16, 0, 16, 16);
        this.image = {
            1: [Graph.grid([bridge1], [Image.image.bridge6])],
            2: [Graph.grid([bridge1], [Graph.repeat(bridge9, 2, 1)])],
            3: [
                Graph.grid(
                    [bridge1],
                    [bridge9, Graph.grid([Graph.crop(bridge9, 0, 0, 8, 8), Image.image.bridge4], [Image.image.bridge5])],
                ),
            ],
        };
        for (const image of Object.values(this.image)) image.push(
            Graph.change(image[0], 0, 181, 254, 130, 112),
            image[0],
            Graph.change(image[0], 0, 181, 108, 7, 0),
        );
    }
    type = 1;
    count = 0;
    index = 0;
    constructor(x, y, level) {
        super(x, y, Bridge.image[level][0]);
        this.o.y = 4;
        this.level = level;
    }
    update() {
        ++this.count % 8 || (this.image = Bridge.image[this.level][++this.index % 4]);
    }
}