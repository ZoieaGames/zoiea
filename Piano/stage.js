import Player from "./player.js";
export default class Stage {
    static stage = [
        'SealedWithAKiss', 'MariagDamour', 'KissTheRain', 'Katusha', 'JingleBells', 'Innocent', 'FurElise', 'CanoninD',
        'Butterflylovers', 'BalladepourAdeline', 'ACommeAmour',
    ];
    static async next(zoiea) {
        zoiea.append(this.player = new Player(zoiea));
        await this.player.init(this.stage[zoiea.index]);
    }
}