import Card from './card.js';
import Rect from './rect.js';
import Zombie from './zombie.js';
export default class Stage {
    static stage = [{}];
    static next(zoiea) {
        zoiea.append(new Rect(zoiea.offset, 0));
        for (let i = 0; i < 10; zoiea.append(new Card(zoiea.offset, i++ * 60)));
        for (let j = 0, y = 0; j < 5; y = ++j * 96) for (let i = 0, x = 0; i < 5; x = ++i * 96)
            zoiea.append(new Zombie(y + zoiea.offset + 1200, x + 32));
    }
}