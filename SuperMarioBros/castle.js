import Actor from '../actor.js';
import Banner from './banner.js';
import Bomb from './bomb.js';
import Graph from '../graph.js';
import Image from './image.js';
export default class Castle extends Actor {
    static {
        const brick1 = Graph.crop(Image.image.brick1, 0, 8, 8, 8),
            brick2 = Graph.grid([Image.image.brick2], [Graph.repeat(brick1, 2, 1)]);
        this.image = Graph.draw(
            80,
            80,
            Graph.grid(
                [{ width: 16, height: 16 }, Graph.repeat(brick2, 3, 1)],
                [
                    { width: 16, height: 16 },
                    Graph.repeat(brick1, 1),
                    Graph.rect(8, 16, '#000'),
                    Graph.repeat(brick1),
                    Graph.rect(8, 16, '#000'),
                    Graph.repeat(brick1, 1),
                ],
                [{ width: 16, height: 8 }, Graph.repeat(brick1, 6, 1)],
            ),
            Graph.grid(
                [{ width: 80, height: 32 }],
                [Graph.repeat(brick2, 5, 1)],
                [Graph.repeat(brick1, 4, 1), Image.image.brick3, Graph.repeat(brick1, 4, 1)],
                [Graph.repeat(brick1, 4, 3), Graph.rect(16, 24, '#000'), Graph.repeat(brick1, 4, 3)],
            ),
        );
    }
    type = 2;
    constructor(x, y) {
        super(x + 24, y, Castle.image);
        this.o.x = 24;
    }
    redraw() {
        this.zoiea.context.drawImage(Castle.image, this.x - 24, this.y);
    }
    ruin() {
        this.type = 0;
        this.zoiea.insert(new Banner(this), this);
        this.zoiea.append(new Bomb({ x: this.x, y: this.y - 80 }));
        this.zoiea.media.play(10);
    }
}