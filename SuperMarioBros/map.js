import { Cloud } from './cloud.js';
import { Block } from './block.js';
import { Brick } from './brick.js';
import { Hill } from './hill.js';
import { Grass } from './grass.js';
import { Pipe } from './pipe.js';
import { Stone } from './stone.js';
import { Flag } from './flag.js';
import { Castle } from './castle.js';
import { Land } from './land.js';
import { Villian } from './villian.js';
import { Turtle } from './turtle.js';

class Map {
    static map = {
        0: { 3: 'ln8', 8: 'hl2' },
        16: { 3: 'ln8' },
        17: { 23: 'cl1' },
        23: { 5: 'gr3' },
        32: { 3: 'ln8', 6: 'hl1', 11: 'bl0' },
        39: { 25: 'cl1' },
        40: { 11: 'br1' },
        42: { 11: 'bl1' },
        44: { 11: 'br1', 19: 'bl0' },
        46: { 11: 'bl0' },
        47: { 5: 'gr1' },
        48: { 3: 'ln8', 11: 'br1' },
        50: { 5: 'vl0' },
        55: { 23: 'cl3' },
        56: { 7: 'pp1' },
        64: { 3: 'ln8' },
        73: { 25: 'cl2' },
        76: { 9: 'pp2' },
        80: { 3: 'ln8' },
        82: { 5: 'vl2' },
        83: { 5: 'gr2' },
        92: { 11: 'pp3' },
        96: { 3: 'ln8', 8: 'hl2' },
        102: { 5: 'vl0' },
        104: { 5: 'vl0' },
        112: { 3: 'ln8' },
        113: { 23: 'cl1' },
        114: { 11: 'pp3' },
        119: { 5: 'gr3' },
        128: { 3: 'ln5', 6: 'hl1', 13: 'bl4' },
        135: { 25: 'cl1' },
        142: { 3: 'ln1' },
        143: { 5: 'gr1' },
        144: { 3: 'ln8' },
        151: { 23: 'cl3' },
        154: { 11: 'br1' },
        156: { 11: 'bl1' },
        158: { 11: 'br1' },
        160: { 3: 'ln6', 19: 'br1', 21: 'vl0' },
        162: { 19: 'br1' },
        163: { 21: 'vl0' },
        164: { 19: 'br1' },
        166: { 19: 'br1' },
        168: { 19: 'br1' },
        170: { 19: 'br1' },
        172: { 19: 'br1' },
        174: { 19: 'br1' },
        169: { 25: 'cl2' },
        178: { 3: 'ln7' },
        179: { 5: 'gr2' },
        182: { 19: 'br1' },
        184: { 19: 'br1' },
        186: { 19: 'br1' },
        188: { 11: 'bl3', 19: 'bl0' },
        192: { 3: 'ln8', 8: 'hl2' },
        194: { 5: 'vl0' },
        196: { 5: 'vl0' },
        200: { 11: 'br1' },
        202: { 11: 'bl2' },
        208: { 3: 'ln8' },
        209: { 23: 'cl1' },
        212: { 11: 'bl0' },
        214: { 6: 'tr1' },
        215: { 5: 'gr3' },
        218: { 11: 'bl0', 19: 'bl1' },
        224: { 3: 'ln8', 6: 'hl1', 11: 'bl0' },
        229: { 5: 'vl0' },
        231: { 5: 'vl0', 25: 'cl1', },
        236: { 11: 'br1' },
        239: { 5: 'gr1' },
        240: { 3: 'ln8' },
        242: { 19: 'br1' },
        244: { 19: 'br1' },
        246: { 19: 'br1' },
        247: { 23: 'cl3' },
        248: { 5: 'vl0' },
        250: { 5: 'vl0' },
        256: { 3: 'ln8', 5: 'vl0', 19: 'br1' },
        258: { 11: 'br1', 19: 'bl0' },
        260: { 11: 'br1', 19: 'bl0' },
        262: { 19: 'br1' },
        268: { 5: 'st4' },
        270: { 7: 'st3' },
        272: { 3: 'ln8', 9: 'st2' },
        274: { 11: 'st1' },
        275: { 5: 'gr2' },
        280: { 5: 'st4', 7: 'st3', 9: 'st2', 11: 'st1' },
        288: { 3: 'ln9', 8: 'hl2' },
        296: { 5: 'st5' },
        298: { 7: 'st4' },
        300: { 9: 'st3' },
        302: { 11: 'st2' },
        305: { 23: 'cl1' },
        310: { 3: 'ln5', 5: 'st4', 7: 'st3', 9: 'st2', 11: 'st1' },
        315: { 5: 'gr1' },
        320: { 3: 'ln8', 6: 'hl1' },
        326: { 7: 'pp1' },
        327: { 25: 'cl1' },
        335: { 5: 'gr1' },
        336: { 3: 'ln8', 11: 'br1' },
        338: { 11: 'br1' },
        340: { 11: 'bl0' },
        342: { 11: 'br1' },
        343: { 23: 'cl3' },
        350: { 5: 'vl0' },
        352: { 3: 'ln8', 5: 'vl0' },
        358: { 7: 'pp1' },
        361: { 25: 'cl2' },
        362: { 5: 'st9' },
        364: { 7: 'st8' },
        366: { 9: 'st7' },
        368: { 3: 'ln8', 11: 'st6' },
        370: { 13: 'st5' },
        372: { 15: 'st4' },
        374: { 17: 'st3' },
        376: { 19: 'st2' },
        384: { 3: 'ln8', 8: 'hl2' },
        395: { 24: 'fl1' },
        396: { 5: 'st1' },
        400: { 3: 'ln8' },
        401: { 23: 'cl1' },
        404: { 13: 'csl' },
        411: { 5: 'gr1' },
        416: { 3: 'ln3', 6: 'hl1' },
        448: { 3: 'ln8' }
    }
    static get(zoiea) {
        const ghosts = [];
        const zoieas = [];
        const x = zoiea.index * 8;
        for (const [i, code] of Object.entries(this.map[zoiea.index])) {
            const y = zoiea.height - i * 8;
            switch (code.substring(0, 2)) {
                case 'cl':
                    ghosts.push(new Cloud(x, y, code.charAt(2)));
                    break;
                case 'bl':
                    zoieas.push(new Block(x, y, Number(code.charAt(2))));
                    break;
                case 'br':
                    zoieas.push(new Brick(x, y));
                    break;
                case 'hl':
                    ghosts.push(new Hill(x, y, Number(code.charAt(2))));
                    break;
                case 'gr':
                    ghosts.push(new Grass(x, y, code.charAt(2)));
                    break;
                case 'pp':
                    zoieas.push(new Pipe(x, y, code.charAt(2)));
                    break;
                case 'st':
                    zoieas.push(new Stone(x, y, code.charAt(2)));
                    break;
                case 'fl':
                    zoieas.push(new Flag(x, y));
                    break;
                case 'cs':
                    zoieas.push(new Castle(x, y));
                    break;
                case 'ln':
                    zoieas.push(new Land(x, y, code.charAt(2)));
                    break;
                case 'vl':
                    zoieas.push(new Villian(x, y, code.charAt(2)));
                    break;
                case 'tr':
                    zoieas.push(new Turtle(x, y));
                    break;
            }
        }
        return [ghosts, zoieas];
    }
}

export { Map }