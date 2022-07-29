export default class Event {
    static init(zoiea) {
        document.onkeyup = event => {
            switch (event.code) {
                case 'ArrowLeft': zoiea.onLeft();
                    break;
                case 'ArrowRight': zoiea.onRight();
                    break;
                case 'Enter': zoiea.play();
                    break;
            }
        }
    }
}