import Graph from '../graph.js';
export default class Image {
    static image = {
        role1: { x: 0, y: 0, type: 2 },
        role2: { x: 16, y: 0, type: 2 },
        role3: { x: 32, y: 0, type: 2 },
        role4: { x: 48, y: 0, type: 2 },
        role5: { x: 64, y: 0, type: 2 },
        role6: { x: 80, y: 0, type: 2 },
        role7: { x: 96, y: 0, type: 2 },
        role8: { x: 112, y: 0, type: 2 },
        role9: { x: 0, y: 16, type: 2 },
        rock1: { x: 16, y: 16, type: 2 },
        floor1: { x: 32, y: 16, type: 2 },
        plate1: { x: 48, y: 16, type: 2 },
        fungus1: { x: 64, y: 16, type: 2 },
        agaric1: { x: 80, y: 16, type: 2 },
        flag1: { x: 96, y: 16, type: 2 },
        turtle1: { x: 112, y: 16, type: 22 },
        role10: { x: 120, y: 16, type: 22 },
        role11: { x: 0, y: 32, type: 16 },
        role12: { x: 16, y: 32, type: 16 },
        role13: { x: 32, y: 32, type: 16 },
        role14: { x: 48, y: 32, type: 16 },
        role15: { x: 64, y: 32, type: 16 },
        role16: { x: 80, y: 32, type: 16 },
        role17: { x: 96, y: 32, type: 16 },
        role18: { x: 112, y: 32, type: 16 },
        role19: { x: 0, y: 64, type: 16 },
        role20: { x: 16, y: 64, type: 16 },
        role21: { x: 32, y: 64, type: 16 },
        role22: { x: 48, y: 64, type: 16 },
        role23: { x: 64, y: 64, type: 16 },
        role24: { x: 80, y: 64, type: 16 },
        role25: { x: 96, y: 64, type: 12 },
        role26: { x: 112, y: 64, type: 12 },
        bullet1: { x: 96, y: 88, type: 1 },
        bomb1: { x: 104, y: 88, type: 1 },
        bomb2: { x: 112, y: 88, type: 5 },
        bomb3: { x: 120, y: 88, type: 5 },
        flower1: { x: 0, y: 96, type: 22 },
        star1: { x: 8, y: 96, type: 22 },
        brick1: { x: 16, y: 96, type: 36 },
        pipe1: { x: 24, y: 96, type: 14 },
        pipe2: { x: 32, y: 96, type: 15 },
        pipe3: { x: 32, y: 112, type: 43 },
        cloud1: { x: 64, y: 96, type: 8 },
        cloud2: { x: 72, y: 96, type: 2 },
        cloud3: { x: 88, y: 96, type: 8 },
        cloud4: { x: 64, y: 112, type: 1 },
        cloud5: { x: 72, y: 112, type: 7 },
        cloud6: { x: 88, y: 112, type: 1 },
        turtle2: { x: 96, y: 96, type: 12 },
        turtle3: { x: 112, y: 96, type: 12 },
        hill1: { x: 0, y: 112, type: 19 },
        fungus2: { x: 8, y: 112, type: 19 },
        flag2: { x: 0, y: 120, type: 1 },
        coin1: { x: 8, y: 120, type: 1 },
        debris1: { x: 16, y: 112, type: 1 },
        plate2: { x: 16, y: 120, type: 5 },
        hill2: { x: 32, y: 120, type: 1 },
        hill3: { x: 40, y: 120, type: 1 },
        flag3: { x: 48, y: 120, type: 1 },
        flag4: { x: 56, y: 120, type: 1 },
        brick2: { x: 64, y: 120, type: 7 },
        brick3: { x: 80, y: 120, type: 7 },
        coin2: { x: 96, y: 120, type: 20 },
        coin3: { x: 104, y: 120, type: 20 },
        coin4: { x: 112, y: 120, type: 20 },
        coin5: { x: 120, y: 120, type: 20 },
    };
    static async init(id) {
        await Graph.init(`/${id}/0.png`, this.image);
    }
}
await Image.init('SuperMarioBros');