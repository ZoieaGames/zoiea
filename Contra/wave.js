import Graph from '../graph.js';
import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Wave extends Zoiea {
    static {
        const wave3 = Image.image.wave3, wave4 = Image.image.wave4, wave5 = Image.image.wave5;
        this.image = {
            1: [Graph.grid([Image.image.wave1, Graph.crop(wave5, 8, 0, 8, 8)])],
            2: [Graph.grid([Graph.crop(wave5, 16, 0, 8, 8), Image.image.wave2])],
            3: [wave3],
            4: [wave4],
            5: [wave5],
            6: [Graph.crop(wave3, 0, 8, 8, 16)],
            7: [Graph.crop(wave3, 0, 16, 8, 8)],
            8: [Graph.crop(wave3, 0, 0, 8, 8)],
            9: [Graph.crop(wave4, 0, 8, 8, 16)],
            10: [Graph.crop(wave4, 0, 16, 8, 8)],
            11: [Graph.crop(wave4, 0, 0, 8, 8)],
            12: [Graph.crop(wave5, 0, 0, 16, 8)],
            13: [Graph.crop(wave5, 16, 0, 16, 8)],
        };
        for (const image of Object.values(this.image))
            image.push(Graph.change(image[0], 0, 254, 255, 255, 255, 100, 254, 254, 254, 255, 100, 176, 254));
    }
    count = 0;
    index = 0;
    constructor(x, y, level) {
        super(x, y, Wave.image[level][0]);
        this.level = level;
    }
    update() {
        ++this.count % 8 || (this.image = Wave.image[this.level][++this.index % 2]);
    }
}