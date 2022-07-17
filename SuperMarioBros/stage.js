import Brick from './brick.js';
import Castle from './castle.js';
import Cloud from './cloud.js';
import Flag from './flag.js';
import Floor from './floor.js';
import Fungus from './fungus.js';
import Grass from './grass.js';
import Hill from './hill.js';
import Pipe from './pipe.js';
import Plate from './plate.js';
import Rect from './rect.js';
import Rock from './rock.js';
import Turtle from './turtle.js';
export default class Stage {
    static stage = [
        {
            0: { 3: 'fl8', 8: 'hl2' },
            16: { 3: 'fl8' },
            17: { 23: 'cl1' },
            23: { 5: 'gr3' },
        },
        {
            0: { 3: 'fl8', 6: 'hl1', 11: 'pl1' },
            7: { 25: 'cl1' },
            8: { 11: 'br1' },
            10: { 11: 'pl2' },
            12: { 11: 'br1', 19: 'pl1' },
            14: { 11: 'pl1' },
            15: { 5: 'gr1' },
            16: { 3: 'fl8', 11: 'br1' },
            18: { 5: 'fn3' },
            23: { 23: 'cl3' },
            24: { 7: 'pp1' },
        },
        {
            0: { 3: 'fl8' },
            9: { 25: 'cl2' },
            12: { 9: 'pp2' },
            16: { 3: 'fl8' },
            18: { 5: 'fn1' },
            19: { 5: 'gr2' },
            28: { 11: 'pp3' },
        },
        {
            0: { 3: 'fl8', 8: 'hl2' },
            6: { 5: 'fn3' },
            9: { 5: 'fn3' },
            16: { 3: 'fl8' },
            17: { 23: 'cl1' },
            18: { 11: 'pp3' },
            23: { 5: 'gr3' },
        },
        {
            0: { 3: 'fl5', 6: 'hl1', 13: 'pl5' },
            7: { 25: 'cl1' },
            14: { 3: 'fl1' },
            15: { 5: 'gr1' },
            16: { 3: 'fl8' },
            23: { 23: 'cl3' },
            26: { 11: 'br1' },
            28: { 11: 'pl2' },
            30: { 11: 'br1' },
        },
        {
            0: { 3: 'fl6', 19: 'br8', 21: 'fn3' },
            3: { 21: 'fn3' },
            9: { 25: 'cl2' },
            18: { 3: 'fl7' },
            19: { 5: 'gr2' },
            22: { 19: 'br3' },
            28: { 11: 'pl4', 19: 'pl1' },
        },
        {
            0: { 3: 'fl8', 8: 'hl2' },
            2: { 5: 'fn3' },
            5: { 5: 'fn3' },
            8: { 11: 'br1' },
            10: { 11: 'pl3' },
            16: { 3: 'fl8' },
            17: { 23: 'cl1' },
            20: { 11: 'pl1' },
            22: { 6: 'tr3' },
            23: { 5: 'gr3' },
            26: { 11: 'pl1', 19: 'pl2' },
        },
        {
            0: { 3: 'fl8', 6: 'hl1', 11: 'pl1' },
            4: { 5: 'fn3' },
            7: { 5: 'fn3', 25: 'cl1' },
            12: { 11: 'br1' },
            15: { 5: 'gr1' },
            16: { 3: 'fl8' },
            18: { 19: 'br3' },
            23: { 23: 'cl3' },
            24: { 5: 'fn3' },
            27: { 5: 'fn3' },
        },
        {
            0: { 3: 'fl8', 5: 'fn3', 19: 'br1' },
            2: { 11: 'br2', 19: 'pl1' },
            4: { 19: 'pl1' },
            6: { 19: 'br1' },
            12: { 5: 'rc4' },
            14: { 7: 'rc3' },
            16: { 3: 'fl8', 9: 'rc2' },
            18: { 11: 'rc1' },
            19: { 5: 'gr2' },
            24: { 5: 'rc4', 7: 'rc3', 9: 'rc2', 11: 'rc1' },
        },
        {
            0: { 3: 'fl9', 8: 'hl2' },
            8: { 5: 'rc5' },
            10: { 7: 'rc4' },
            12: { 9: 'rc3' },
            14: { 11: 'rc2' },
            17: { 23: 'cl1' },
            22: { 3: 'fl5', 5: 'rc4', 7: 'rc3', 9: 'rc2', 11: 'rc1' },
            27: { 5: 'gr1' },
        },
        {
            0: { 3: 'fl8', 6: 'hl1' },
            6: { 7: 'pp1' },
            7: { 25: 'cl1' },
            15: { 5: 'gr1' },
            16: { 3: 'fl8', 11: 'br2' },
            20: { 11: 'pl1' },
            22: { 11: 'br1' },
            23: { 23: 'cl3' },
        },
        {
            0: { 3: 'fl8', 5: 'fn3' },
            3: { 5: 'fn3' },
            6: { 7: 'pp1' },
            9: { 25: 'cl2' },
            10: { 5: 'rc9' },
            12: { 7: 'rc8' },
            14: { 9: 'rc7' },
            16: { 3: 'fl8', 11: 'rc6' },
            18: { 13: 'rc5' },
            20: { 15: 'rc4' },
            22: { 17: 'rc3' },
            24: { 19: 'rc2' },
        },
        {
            0: { 3: 'fl8', 8: 'hl2' },
            11: { 24: 'fg1' },
            12: { 5: 'rc1' },
            16: { 3: 'fl8' },
            17: { 23: 'cl1' },
            20: { 13: 'csl' },
            27: { 5: 'gr1' },
        },
        {
            0: { 3: 'fl3', 6: 'hl1' },
            24: { 3: 'fl4', 11: 'pp4' },
        },
    ];
    static next(zoiea) {
        const rect = new Rect(zoiea.offset + zoiea.index * 256, 0, 1);
        zoiea.insert(rect);
        zoiea.insert(new Rect(rect.x, 0));
        let x, y;
        for (const [i, stage] of Object.entries(this.stage[zoiea.index])) {
            x = i * 8 + rect.x;
            for (const [j, code] of Object.entries(stage)) {
                y = 270 - j * 8;
                switch (code.substring(0, 2)) {
                    case 'br': for (let i = 0; i < code.charAt(2); ++i) zoiea.append(new Brick(x + i * 16, y));
                        break;
                    case 'cs': zoiea.append(new Castle(x, y));
                        break;
                    case 'cl': zoiea.insert(new Cloud(x, y, code.charAt(2)), rect);
                        break;
                    case 'fg': zoiea.append(new Flag(x, y));
                        break;
                    case 'fl': for (let i = 0; i < code.charAt(2); ++i) zoiea.append(new Floor(x + i * 16, y));
                        break;
                    case 'fn': zoiea.append(new Fungus(x, y, code.charAt(2)));
                        break;
                    case 'gr': zoiea.insert(new Grass(x, y, code.charAt(2)), rect);
                        break;
                    case 'hl': zoiea.insert(new Hill(x, y, code.charAt(2)), rect);
                        break;
                    case 'pp': zoiea.append(new Pipe(x, y, code.charAt(2)));
                        break;
                    case 'pl': zoiea.append(new Plate(x, y, code.charAt(2)));
                        break;
                    case 'rc': for (let i = 0; i < code.charAt(2); ++i) zoiea.append(new Rock(x + i * 16, y));
                        break;
                    case 'tr': zoiea.append(new Turtle(x, y, code.charAt(2)));
                        break;
                }
            }
        }
    }
}