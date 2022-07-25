import Bridge from './bridge.js';
import Bush from './bush.js';
import Lawn from './Lawn.js';
import Rect from './rect.js';
import Rock from './rock.js';
import Tree from './tree.js';
import Wave from './wave.js';
import Wood from './wood.js';
export default class Stage {
    static stage = [
        {
            0: { 11: 're1' },
            3: { 7: 'wa3' },
            4: { 5: 'wv3', 13: 'rc47', 15: 'lw7', 16: 'bs11', 19: 'wd11' },
            8: { 16: 'bs21', 19: 'wd21' },
            12: { 16: 'bs31', 19: 'wd31' },
            16: { 5: 'wa12', 16: 'bs11', 19: 'wd11' },
            18: { 5: 'wa2' },
            19: { 4: 'wa6' },
            20: { 3: 'wv3', 9: 'rc33', 11: 'lw3', 16: 'bs31', 19: 'wd31' },
            24: { 16: 'bs12', 19: 'wd12' },
        },
        {
            0: { 3: 'wa5', 5: 'rc21', 7: 'lw1', 11: 're1', 13: 'rc54', 15: 'lw8', 16: 'bs23', 19: 'wd23' },
            3: { 1: 'wa7', 2: 'wa8' },
            4: { 1: 'wv2', 3: 'lw2' },
            12: { 1: 'wa10', 2: 'wa11', 3: 'wa5', 5: 'rc21', 7: 'lw1', 16: 'bs31', 19: "wd31" },
            16: { 4: 'wa9', 5: 'wa1', 13: 'rc44', 16: 'bs11', 19: 'wd11' },
            18: { 5: 'wa2' },
            19: { 4: 'wa6' },
            20: { 3: 'wv2', 9: 'rc32', 11: 'lw2', 16: 'bs22', 19: 'wd22' },
            28: { 4: 'wa9', 5: 'wa1', 16: 'bs31', 19: 'wd31' },
            30: { 5: 'wa13' },
        },
        {
            0: { 5: 'wa5', 11: 're1', 13: 'rc42', 15: 'lw8', 16: 'bs31', 19: 'wd31' },
            4: { 5: 'wa12', 16: 'bs11', 19: 'wd11' },
            6: { 5: 'wa2' },
            7: { 4: 'wa6' },
            8: { 3: 'wa5', 13: 'rc55', 16: 'bs22', 19: 'wd22' },
            11: { 1: 'wa7', 2: 'wa8' },
            12: { 1: 'wv2', 3: 'lw2' },
            16: { 9: 'lw3', 16: 'bs11', 19: 'wd11' },
            20: { 1: 'wa10', 2: 'wa11', 3: 'wv2', 16: 'bs22', 19: 'wd22' },
            28: { 4: 'wa9', 5: 'wa1', 13: 'rc41', 16: 'bs31', 19: 'wd31' },
            30: { 5: 'wa13' },
        },
        {
            0: { 7: 'wa4', 11: 're1', 15: 'br11' },
            4: { 15: 'br22' },
            12: { 15: 'br31' },
            15: { 7: 'wa3' },
            16: { 5: 'wv4', 13: 'rc44', 15: 'lw4', 16: 'bs11', 19: 'wd11' },
            20: { 16: 'bs23', 19: 'wd23' },
        },
        {
            0: { 5: 'wa5', 13: 'rc41', 11: 're1', 15: 'lw1', 16: 'bs31', 19: 'wd31' },
            4: { 7: 'wa4', 15: 'br11' },
            8: { 15: 'br22' },
            16: { 15: 'br31' },
            19: { 7: 'wa3' },
            20: { 5: 'wa5', 13: 'rc42', 15: 'lw3', 16: 'bs11', 19: 'wd11' },
            24: { 5: 'wa12', 16: 'bs22', 19: 'wd22' },
            26: { 5: 'wa2' },
            27: { 4: 'wa6' },
            28: { 3: 'wa5', 13: 'rc51', 25: "pk11" },
        },
        {
            0: { 3: 'wv4', 11: 're1', 13: 'rc55', 15: 'lw5', 16: 'bs22', 19: 'wd22' },
            8: { 16: 'bs31', 19: 'wd31' },
            12: { 17: 'rc22', 19: 'lw5', 20: 'bs15', 29: 're2', 33: 'tr11' },
            15: { 1: 'wa7', 2: 'wa8' },
            16: { 1: 'wv3', 3: 'lw3', 33: 'tr24' },
            20: { 17: 'rc73' },
            28: { 1: 'wa10', 2: 'wa11', 3: 'wa5', 9: "lw1" },
        },
        {
            0: { 3: 'wa5', 9: "lw1", 11: 're1', 17: 'rc71', 19: 'lw8', 20: 'bs18', 29: 're3', 33: 'tr28' },
            4: { 4: 'wa9', 5: 'wa1', 17: 'rc67' },
            6: { 5: 'wa2' },
            7: { 4: 'wa6' },
            8: { 3: 'wv4', 9: 'rc36', 11: 'lw6' },
            23: { 1: 'wa7', 2: 'wa8' },
            24: { 1: 'wa5', 3: 'lw2' },
            28: { 1: 'wa12' },
            30: { 1: 'wa2' },
        },
        {
            0: { 1: 'rc14', 3: 'lw4', 9: 'rc31', 11: 'lw1', 17: 'rc73', 19: 'lw3', 20: 'bs13', 29: 're4', 33: 'tr28' },
            8: { 13: 'rc54', 15: 'lw6' },
            12: { 16: 'bs15' },
            16: { 5: 'rc82', 7: 'lw2' },
            24: { 13: 'rca2' },
            28: { 5: 'rc81', 7: 'lw1' },
        },
        {
            0: { 5: 'rc81', 7: 'lw1', 13: 'rc31', 15: 'lw1', 17: 'rcb5', 19: 'lw5', 20: 'bs15', 29: 're4', 33: 'tr28' },
            8: { 9: 'lw1' },
            16: { 9: 'rc93', 11: 'lw3' },
            20: { 12: 'bs11' },
            24: { 13: 'rc21', 15: 'lw2', 16: 'bs12' },
            28: { 13: 'rca1' },
        },
        {
            0: { 29: 're4', 33: 'tr28' },
            4: { 1: 'rc11', 3: 'lw1', 9: 'rc32', 11: 'lw2', 12: 'bs12' },
            8: { 5: 'rc83', 7: 'lw3' },
            12: { 8: 'bs12' },
            20: { 13: 'rca2', 15: 'lw2', 16: 'bs11' },
            24: { 1: 'rc11', 3: 'lw1', 17: 'rc21', 19: 'lw2', 20: 'bs12' },
            28: { 9: 'lw1', 17: 'rcb1' },
        },
        {
            0: { 29: 're4', 33: 'tr28' },
            4: { 13: 'rca2', 15: 'lw2', 16: 'bs12', 30: 'tr41' },
            8: { 9: 'rc95', 11: 'lw5', 30: 'tr56' },
            12: { 12: 'bs14' },
            20: { 1: "rc13", 3: 'lw3' },
            28: { 4: 'bs11' },
        },
        {
            0: { 29: 're4', 30: 'tr58', 33: 'tr28' },
            4: { 5: 'rc82', 7: 'lw2', 8: 'bs12' },
            16: { 9: 'rc92', 11: 'lw2', 12: 'bs12' },
            24: { 1: 'rc12', 3: 'lw2', 13: "rc52", 15: 'lw2', 16: 'bs12' },
            28: { 9: 'lw1' },
        },
        {
            0: { 1: 'rc16', 3: 'lw6', 9: 'lw2', 13: 'rc52', 15: 'lw2', 16: 'bs12', 25: 're5', 30: 'tr53', 33: 'tr23' },
            8: { 9: 'rc31', 11: 'lw1', 12: 'bs11' },
            12: { 5: 'rc21', 7: 'lw1', 8: 'bs11', 30: 'tr61', 33: 'tr31' },
            16: { 4: 'bs12' },
        },
    ];
    static next(zoiea) {
        const rect = new Rect(0, 0);
        zoiea.insert(rect);
        let x, y;
        for (const [i, stage] of Object.entries(this.stage[zoiea.index])) {
            x = i * 8 + zoiea.offset + zoiea.index * 256;
            for (const [j, code] of Object.entries(stage).sort((a, b) => b[0] - a[0])) {
                y = 270 - j * 8;
                switch (code.substring(0, 2)) {
                    case 'br': for (let i = 0; i < code.charAt(3); ++i)
                        zoiea.insert(new Bridge(x + i * 32, y, code.charAt(2)), rect);
                        break;
                    case 'bs': for (let i = 0; i < code.charAt(3); ++i)
                        zoiea.insert(new Bush(x + i * 32, y, code.charAt(2)), rect);
                        break;
                    case 'lw': for (let i = 0; i < code.charAt(2); ++i) zoiea.insert(new Lawn(x + i * 32, y), rect);
                        break;
                    case 're': zoiea.insert(new Rect(x, y, code.charAt(2)));
                        break;
                    case 'rc': for (let i = 0; i < code.charAt(3); ++i)
                        zoiea.insert(new Rock(x + i * 32, y, code.charAt(2)), rect);
                        break;
                    case 'tr': for (let i = 0; i < code.charAt(3); ++i)
                        zoiea.insert(new Tree(x + i * 32, y, code.charAt(2)), rect);
                        break;
                    case 'wa': zoiea.insert(new Wave(x, y, code.substring(2)), rect);
                        break;
                    case 'wv': for (let i = 0; i < code.charAt(2); ++i) zoiea.insert(new Wave(x + i * 32, y, 5), rect);
                        break;
                    case 'wd': for (let i = 0; i < code.charAt(3); ++i)
                        zoiea.insert(new Wood(x + i * 32, y, code.charAt(2)), rect);
                        break;
                }
            }
        }
    }
}