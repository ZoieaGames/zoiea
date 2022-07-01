import { Text } from './text.js';

class Time extends Text {
    time = 400;
    constructor() {
        super(8, 8, 'TIME:400');
    }
    update(zoiea) {
        if (zoiea.step % 24 === 0 && !zoiea.over) {
            if (this.time > 0) {
                this.text = 'TIME:' + String(--this.time).padStart(3, 0);
                if (this.time === 0) {
                    zoiea.zoiea.over(zoiea);
                    this.update = undefined;
                }
                if (this.time === 100) {
                    zoiea.media.stop(0);
                    zoiea.media.play(18);
                }
                if (this.time === 95) {
                    zoiea.media.play(19, true);
                }
            }
        }
    }
    update0() {
        this.text = 'TIME:' + String(this.time).padStart(3, 0);
    }
}

export { Time };
