const image = {
    tank1: { x: 0, y: 0, type: 1 },
    tank2: { x: 16, y: 0, type: 1 },
    tank3: { x: 32, y: 0, type: 1 },
    tank4: { x: 48, y: 0, type: 1 },
    prop1: { x: 64, y: 0, type: 1 },
    prop2: { x: 80, y: 0, type: 1 },
    prop3: { x: 96, y: 0, type: 1 },
    tank5: { x: 0, y: 16, type: 1 },
    tank6: { x: 16, y: 16, type: 1 },
    tank7: { x: 32, y: 16, type: 1 },
    tank8: { x: 48, y: 16, type: 1 },
    prop4: { x: 64, y: 16, type: 1 },
    prop5: { x: 80, y: 16, type: 1 },
    prop6: { x: 96, y: 16, type: 1 },
    tank11: { x: 0, y: 32, type: 1 },
    tank12: { x: 16, y: 32, type: 1 },
    tank13: { x: 32, y: 32, type: 1 },
    tank14: { x: 48, y: 32, type: 1 },
    star1: { x: 64, y: 32, type: 1 },
    star2: { x: 80, y: 32, type: 1 },
    star3: { x: 96, y: 32, type: 1 },
    tank15: { x: 0, y: 48, type: 1 },
    tank16: { x: 16, y: 48, type: 1 },
    tank17: { x: 32, y: 48, type: 1 },
    tank18: { x: 48, y: 48, type: 1 },
    star4: { x: 64, y: 48, type: 1 },
    base1: { x: 80, y: 48, type: 1 },
    base2: { x: 96, y: 48, type: 1 },
    bomb1: { x: 0, y: 64, type: 1 },
    bomb2: { x: 16, y: 64, type: 1 },
    bomb3: { x: 32, y: 64, type: 1 },
    bomb4: { x: 48, y: 64, type: 2 },
    bomb5: { x: 80, y: 64, type: 2 },
    brick1: { x: 0, y: 80, type: 3 },
    plate1: { x: 8, y: 80, type: 3 },
    water1: { x: 0, y: 88, type: 4 },
    water2: { x: 8, y: 88, type: 4 },
    grass1: { x: 16, y: 80, type: 4 },
    snow1: { x: 24, y: 80, type: 4 },
    cover1: { x: 16, y: 88, type: 5 },
    cover2: { x: 24, y: 88, type: 5 },
    bullet1: { x: 32, y: 80, type: 3 },
    arrow1: { x: 40, y: 80, type: 3 },
    vehicle1: { x: 32, y: 88, type: 3 },
    vehicle2: { x: 40, y: 88, type: 3 },
}

const repeat = (image, cols = 2, rows = 2) => {
    const canvas = new OffscreenCanvas(image.width * cols, image.height * rows);
    const context = canvas.getContext('2d');
    for (let j = 0; j < rows; ++j) {
        for (let i = 0, y = j * image.height; i < cols; ++i) {
            context.drawImage(image, i * image.width, y);
        }
    }
    return canvas.transferToImageBitmap();
}

const flipX = image => {
    const canvas = new OffscreenCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.translate(image.width, 0);
    context.scale(-1, 1);
    context.drawImage(image, 0, 0);
    return canvas.transferToImageBitmap();
}

const flipY = image => {
    const canvas = new OffscreenCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.translate(0, image.height);
    context.scale(1, -1);
    context.drawImage(image, 0, 0);
    return canvas.transferToImageBitmap();
}

const flip = image => {
    const canvas = new OffscreenCanvas(image.width * 2, image.height * 2);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    context.translate(0, canvas.height);
    context.scale(1, -1);
    context.drawImage(canvas, 0, 0);
    return canvas.transferToImageBitmap();
}

const rotate = image => {
    const canvas = new OffscreenCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.translate(image.width * .5, image.height * .5);
    context.rotate(Math.PI * .5);
    context.drawImage(image, -image.width * .5, -image.height * .5);
    return canvas.transferToImageBitmap();
}

const bitmap = await createImageBitmap(await (await fetch('0.png')).blob());

for (const [key, value] of Object.entries(image)) {
    switch (value.type) {
        case 1:
            image[key] = await createImageBitmap(bitmap, value.x, value.y, 16, 16);
            break;
        case 2:
            image[key] = await createImageBitmap(bitmap, value.x, value.y, 32, 32);
            break;
        case 3:
            image[key] = await createImageBitmap(bitmap, value.x, value.y, 8, 8);
            break;
        case 4:
            image[key] = repeat(await createImageBitmap(bitmap, value.x, value.y, 8, 8));
            break;
        case 5:
            image[key] = flip(await createImageBitmap(bitmap, value.x, value.y, 8, 8));
            break;
    }
}

export default image;
export { image, flipX, flipY, rotate }