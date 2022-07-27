import Point from './point.js';
export default class Event {
    static init(zoiea) {
        zoiea.canvas.onpointerdown = event => {
            zoiea.canvas.style.cursor = 'grabbing';
            const point = new Point(event.offsetX * zoiea.ratio, event.offsetY * zoiea.ratio);
            for (const z of zoiea.zoieas) if (z.onDown && point.in(z)[0])
                return (zoiea.zoiea = z).onDown(point.x, point.y);
            zoiea.canvas.style.cursor = 'grab';
        };
        zoiea.canvas.onpointermove = event =>
            zoiea.zoiea?.onMove(event.offsetX * zoiea.ratio, event.offsetY * zoiea.ratio);
        zoiea.canvas.onpointerleave = zoiea.canvas.onpointerup = () => {
            zoiea.canvas.style.cursor = 'grab';
            zoiea?.zoiea?.onUp();
            delete zoiea.zoiea;
        };
        document.onkeyup = event => event.code === 'Enter' && zoiea.play();
    }
}