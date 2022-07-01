class Event {
    static init(zoiea) {
        document.onkeydown = event => zoiea.onDown(event);
        document.onkeyup = event => zoiea.onUp(event);
    }
}
export { Event }