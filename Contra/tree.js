import Graph from '../graph.js';
import Image from './image.js';
import Zoiea from '../zoiea.js';
export default class Tree extends Zoiea {
    static {
        const tree1 = Image.image.tree1, tree2 = Image.image.tree2, tree3 = Image.image.tree3,
            tree4 = Graph.crop(tree1, 24, 0, 8, 8), tree5 = Graph.crop(tree2, 8, 16, 8, 8),
            wood1 = Image.image.wood1, wood2 = Image.image.wood2, wood3 = Graph.crop(wood2, 0, 0, 8, 8),
            wood4 = Graph.crop(wood2, 0, 8, 8, 8);
        this.image = {
            1: Graph.draw(32, 32, tree2, tree3),
            2: tree2,
            3: Graph.grid([wood3, { width: 16, height: 8 }], [tree4, wood3], [tree5, tree4, wood4]),
            4: Graph.grid(
                [tree1],
                [wood4, Graph.crop(tree2, 8, 0, 24, 16)],
                [{ width: 8, height: 8 }],
                [{ width: 8, height: 8 }, Graph.crop(wood1, 0, 8, 8, 8), Graph.crop(tree2, 16, 16, 16, 8)],
            ),
            5: Graph.grid([tree1], [tree2]),
            6: Graph.grid(
                [Graph.repeat(Graph.crop(tree1, 8, 0, 8, 8), 2, 1), tree4, wood3, { width: 16, height: 8 }],
                [
                    tree2,
                    Graph.grid(
                        [wood3, { width: 8, height: 8 }],
                        [Graph.crop(wood1, 8, 0, 16, 8)],
                        [wood4, Graph.crop(wood1, 8, 0, 8, 8)],
                        [Graph.crop(tree2, 0, 24, 16, 8)],
                    ),
                ],
            ),
        };
    }
    constructor(x, y, level) {
        super(x, y, Tree.image[level]);
    }
}