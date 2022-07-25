import Graph from '../graph.js';
export default class Image {
    static image = {
        tree1: { x: 0, y: 0, type: 13 },
        tree2: { x: 0, y: 8, type: 4 },
        tree3: { x: 32, y: 0, type: 10 },
        wood1: { x: 0, y: 40, type: 3 },
        wood2: { x: 24, y: 40, type: 10 },
        bush1: { x: 0, y: 64, type: 9 },
        bridge1: { x: 0, y: 72, type: 9 },
        bridge2: { x: 24, y: 64, type: 8 },
        bridge3: { x: 32, y: 64, type: 1 },
        bridge4: { x: 40, y: 64, type: 1 },
        bridge5: { x: 32, y: 72, type: 7 },
        bridge6: { x: 48, y: 64, type: 15 },
        bridge7: { x: 40, y: 0, type: 14 },
        bridge8: { x: 32, y: 24, type: 1 },
        wave1: { x: 32, y: 32, type: 1 },
        wave2: { x: 40, y: 32, type: 1 },
        wave3: { x: 32, y: 40, type: 10 },
        wave4: { x: 40, y: 40, type: 10 },
        wave5: { x: 48, y: 56, type: 13 },
        lawn1: { x: 48, y: 0, type: 15 },
        rock1: { x: 48, y: 16, type: 13 },
        rock2: { x: 48, y: 24, type: 4 },
    };
    static async init(id) {
        await Graph.init(`/${id}/0.png`, this.image);
    }
    static async load(path) {
        return await createImageBitmap(await (await fetch(path)).blob());
    }
}
await Image.init('Contra');