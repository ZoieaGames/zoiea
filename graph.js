export default class Graph {
    static canvas = new OffscreenCanvas(0, 0);
    static context = this.canvas.getContext('2d');
    static async init(path, image) {
        const bitmap = await createImageBitmap(await (await fetch(path)).blob());
        for (const [key, value] of Object.entries(image)) switch (value.type) {
            case 1: image[key] = Graph.crop(bitmap, value.x, value.y, 8, 8);
                break;
            case 2: image[key] = Graph.crop(bitmap, value.x, value.y, 16, 16);
                break;
            case 3: image[key] = Graph.crop(bitmap, value.x, value.y, 24, 24);
                break;
            case 4: image[key] = Graph.crop(bitmap, value.x, value.y, 32, 32);
                break;
            case 5: image[key] = Graph.flip(Graph.crop(bitmap, value.x, value.y, 8, 8));
                break;
            case 6: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 8, 8));
                break;
            case 7: image[key] = Graph.crop(bitmap, value.x, value.y, 16, 8);
                break;
            case 8: image[key] = Graph.crop(bitmap, value.x, value.y, 8, 16);
                break;
            case 9: image[key] = Graph.crop(bitmap, value.x, value.y, 24, 8);
                break;
            case 10: image[key] = Graph.crop(bitmap, value.x, value.y, 8, 24);
                break;
            case 11: image[key] = Graph.crop(bitmap, value.x, value.y, 24, 16);
                break;
            case 12: image[key] = Graph.crop(bitmap, value.x, value.y, 16, 24);
                break;
            case 13: image[key] = Graph.crop(bitmap, value.x, value.y, 32, 8);
                break;
            case 14: image[key] = Graph.crop(bitmap, value.x, value.y, 8, 32);
                break;
            case 15: image[key] = Graph.crop(bitmap, value.x, value.y, 32, 16);
                break;
            case 16: image[key] = Graph.crop(bitmap, value.x, value.y, 16, 32);
                break;
            case 17: image[key] = Graph.crop(bitmap, value.x, value.y, 32, 24);
                break;
            case 18: image[key] = Graph.crop(bitmap, value.x, value.y, 24, 32);
                break;
            case 19: image[key] = Graph.flipX(Graph.crop(bitmap, value.x, value.y, 8, 8), 1);
                break;
            case 20: image[key] = Graph.flipY(Graph.crop(bitmap, value.x, value.y, 8, 8), 1);
                break;
            case 21: image[key] = Graph.flipY(Graph.crop(bitmap, value.x, value.y, 16, 8), 1);
                break;
            case 22: image[key] = Graph.flipX(Graph.crop(bitmap, value.x, value.y, 8, 16), 1);
                break;
            case 23: image[key] = Graph.flipX(Graph.crop(bitmap, value.x, value.y, 16, 16), 1);
                break;
            case 24: image[key] = Graph.flipY(Graph.crop(bitmap, value.x, value.y, 16, 16), 1);
                break;
            case 25: image[key] = Graph.flipY(Graph.crop(bitmap, value.x, value.y, 24, 8), 1);
                break;
            case 26: image[key] = Graph.flipX(Graph.crop(bitmap, value.x, value.y, 8, 24), 1);
                break;
            case 27: image[key] = Graph.flipY(Graph.crop(bitmap, value.x, value.y, 24, 16), 1);
                break;
            case 28: image[key] = Graph.flipX(Graph.crop(bitmap, value.x, value.y, 16, 24), 1);
                break;
            case 29: image[key] = Graph.flipY(Graph.crop(bitmap, value.x, value.y, 32, 8), 1);
                break;
            case 30: image[key] = Graph.flipX(Graph.crop(bitmap, value.x, value.y, 8, 32), 1);
                break;
            case 31: image[key] = Graph.flipY(Graph.crop(bitmap, value.x, value.y, 32, 16), 1);
                break;
            case 32: image[key] = Graph.flipX(Graph.crop(bitmap, value.x, value.y, 16, 32), 1);
                break;
            case 33: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 8, 8), 2, 1);
                break;
            case 34: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 8, 8), 1);
                break;
            case 35: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 16, 8), 1);
                break;
            case 36: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 8, 16), 2, 1);
                break;
            case 37: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 16, 16), 2, 1);
                break;
            case 38: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 16, 16), 1);
                break;
            case 39: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 24, 8), 1);
                break;
            case 40: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 8, 24), 2, 1);
                break;
            case 41: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 24, 16), 1);
                break;
            case 42: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 16, 24), 2, 1);
                break;
            case 43: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 32, 8), 1);
                break;
            case 44: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 8, 32), 2, 1);
                break;
            case 45: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 32, 16), 1);
                break;
            case 46: image[key] = Graph.repeat(Graph.crop(bitmap, value.x, value.y, 16, 32), 2, 1);
                break;
        }
    }
    static crop(image, x, y, width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.drawImage(image, x, y, width, height, 0, 0, width, height);
        return this.canvas.transferToImageBitmap();
    }
    static flip(image) {
        return this.flipY(this.flipX(image, 1), 1);
    }
    static flipX(image, double) {
        this.canvas.width = double ? image.width * 2 : image.width;
        this.canvas.height = image.height;
        double && this.context.drawImage(image, 0, 0);
        this.context.translate(this.canvas.width, 0);
        this.context.scale(-1, 1);
        this.context.drawImage(image, 0, 0);
        return this.canvas.transferToImageBitmap();
    }
    static flipY(image, double) {
        this.canvas.width = image.width;
        this.canvas.height = double ? image.height * 2 : image.height;
        double && this.context.drawImage(image, 0, 0);
        this.context.translate(0, this.canvas.height);
        this.context.scale(1, -1);
        this.context.drawImage(image, 0, 0);
        return this.canvas.transferToImageBitmap();
    }
    static repeat(image, cols = 2, rows = 2) {
        this.canvas.width = image.width * cols;
        this.canvas.height = image.height * rows;
        for (let j = 0, y = 0; j++ < rows; y += image.height)  for (let i = 0, x = 0; i++ < cols; x += image.width)
            this.context.drawImage(image, x, y);
        return this.canvas.transferToImageBitmap();
    }
    static rotate(image, anti) {
        this.canvas.width = image.height;
        this.canvas.height = image.width;
        this.context.translate(image.height * .5, image.width * .5);
        this.context.rotate(anti ? Math.PI * 1.5 : Math.PI * .5);
        this.context.drawImage(image, -image.width * .5, -image.height * .5);
        return this.canvas.transferToImageBitmap();
    }
    static change(image, offset, ...array) {
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        this.context.drawImage(image, 0, 0);
        const data = this.context.getImageData(0, 0, image.width, image.height), d = data.data;
        for (let j = 0; j < d.length; j += 4) for (let i = 0; i < array.length; i += 4) {
            if (array[i] !== d[j + offset]) continue;
            d[j] = array[i + 1];
            d[j + 1] = array[i + 2];
            d[j + 2] = array[i + 3];
        }
        this.context.putImageData(data, 0, 0);
        return this.canvas.transferToImageBitmap();
    }
    static rect(width, height, style) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.fillStyle = style;
        this.context.fillRect(0, 0, width, height);
        return this.canvas.transferToImageBitmap();
    }
    static grid(...array) {
        let width = 0, height = 0;
        for (let i = 0; i < array[0].length; width += array[0][i++].width);
        for (let j = 0; j < array.length; height += array[j++][0].height);
        this.canvas.width = width;
        this.canvas.height = height;
        for (let j = 0, y = 0; j < array.length; y += array[j++][0].height)
            for (let i = 0, x = 0; i < array[j].length; x += array[j][i++].width)
                array[j][i].close && this.context.drawImage(array[j][i], x, y);
        return this.canvas.transferToImageBitmap();
    }
    static draw(width, height, ...array) {
        this.canvas.width = width;
        this.canvas.height = height;
        for (const image of array) this.context.drawImage(image, 0, 0);
        return this.canvas.transferToImageBitmap();
    }
}