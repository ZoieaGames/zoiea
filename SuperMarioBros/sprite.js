const response = await fetch('0.png');
const blob = await response.blob();
const bitmap = await createImageBitmap(blob);
const response0 = await fetch('1.png');
const blob0 = await response0.blob();
const bitmap0 = await createImageBitmap(blob0);

const reverse = (image, width = 16, height = width) => {
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext('2d');
    context.translate(width, 0);
    context.scale(-1, 1);
    context.drawImage(image, 0, 0);
    return canvas.transferToImageBitmap();
}

const cloud1 = (() => {
    const canvas = new OffscreenCanvas(32, 24);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 32, 8, 8, 16, 0, 8, 8, 16);
    context.drawImage(bitmap, 40, 0, 16, 24, 8, 0, 16, 24);
    context.drawImage(bitmap, 56, 8, 8, 16, 24, 8, 8, 16);
    return canvas.transferToImageBitmap();
})();

const cloud = (size = 1) => {
    if (size === 1) {
        return cloud1;
    }
    const width = size * 16 + 16;
    const canvas = new OffscreenCanvas(width, 24);
    const context = canvas.getContext('2d');
    context.drawImage(cloud1, 0, 8, 8, 16, 0, 8, 8, 16);
    for (let i = 0; i < size; ++i) {
        context.drawImage(cloud1, 8, 0, 16, 24, i * 16 + 8, 0, 16, 24);
    }
    context.drawImage(cloud1, 24, 8, 8, 16, width - 8, 8, 8, 16);
    return canvas.transferToImageBitmap();
}

const plate1 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 8, 56, 8, 8, 0, 0, 8, 8);
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    context.translate(0, 16);
    context.scale(1, -1);
    context.drawImage(canvas, 0, 0);
    return canvas.transferToImageBitmap();
})();

const block0 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(plate1, 0, 0);
    const data = context.getImageData(0, 0, 16, 16);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
        if (d[i] === 153) {
            d[i] = 235;
            d[i + 1] = 159;
            d[i + 2] = 35;
        }
    }
    context.putImageData(data, 0, 0);
    context.drawImage(bitmap, 32, 32, 16, 16, 0, 0, 16, 16);
    return canvas.transferToImageBitmap();
})();

const block1 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(plate1, 0, 0);
    context.drawImage(bitmap, 32, 32, 16, 16, 0, 0, 16, 16);
    return canvas.transferToImageBitmap();
})();

const block2 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(block0, 0, 0);
    const data = context.getImageData(0, 0, 16, 16);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
        if (d[i] === 235) {
            d[i] = 87;
            d[i + 1] = 29;
            d[i + 2] = 0;
        }
    }
    context.putImageData(data, 0, 0);
    return canvas.transferToImageBitmap();
})();

const brick1 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 88, 16, 8, 16, 0, 0, 8, 16);
    context.drawImage(bitmap, 88, 16, 8, 16, 8, 0, 8, 16);
    return canvas.transferToImageBitmap();
})();

const debris0 = await createImageBitmap(bitmap, 56, 0, 8, 8);

const debris1 = (() => {
    const canvas = new OffscreenCanvas(8, 8);
    const context = canvas.getContext('2d');
    context.translate(8, 0);
    context.scale(-1, 1);
    context.drawImage(debris0, 0, 0);
    return canvas.transferToImageBitmap();
})();

const hill1 = (() => {
    const canvas = new OffscreenCanvas(48, 24);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 16, 48, 8, 8, 0, 16, 8, 8);
    context.fillStyle = '#0d9400';
    context.fillRect(8, 16, 8, 8);
    context.drawImage(bitmap, 16, 48, 8, 8, 8, 8, 8, 8);
    context.fillRect(16, 8, 8, 16);
    context.drawImage(bitmap, 80, 48, 8, 8, 16, 0, 8, 8);
    context.save();
    context.translate(48, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    context.restore();
    context.drawImage(bitmap, 24, 48, 8, 8, 24, 8, 8, 8);
    return canvas.transferToImageBitmap();
})();

const hill2 = (() => {
    const canvas = new OffscreenCanvas(80, 40);
    const context = canvas.getContext('2d');
    context.drawImage(hill1, 0, 8, 32, 16, 0, 24, 32, 16);
    context.drawImage(hill1, 0, 0, 32, 24, 16, 0, 32, 24);
    context.drawImage(hill1, 32, 8, 16, 16, 48, 8, 16, 16);
    context.drawImage(hill1, 32, 8, 16, 16, 64, 24, 16, 16);
    context.fillStyle = '#0d9400';
    context.fillRect(32, 24, 32, 16);
    context.drawImage(hill1, 24, 8, 8, 8, 48, 24, 8, 8);
    return canvas.transferToImageBitmap();
})();

const grass1 = (() => {
    const canvas = new OffscreenCanvas(32, 16);
    const context = canvas.getContext('2d');
    context.drawImage(cloud1, 0, 0, 32, 16, 0, 0, 32, 16);
    const data = context.getImageData(0, 0, 32, 16);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
        if (d[i] === 100) {
            d[i] = 13;
            d[i + 1] = 148;
            d[i + 2] = 0;
        } else if (d[i] === 254) {
            d[i] = 137;
            d[i + 1] = 217;
            d[i + 2] = 0;
        }
    }
    context.putImageData(data, 0, 0);
    return canvas.transferToImageBitmap();
})();

const grass = (size = 1) => {
    if (size === 1) {
        return grass1;
    }
    const width = size * 16 + 16;
    const canvas = new OffscreenCanvas(width, 16);
    const context = canvas.getContext('2d');
    context.drawImage(grass1, 0, 8, 8, 8, 0, 8, 8, 8);
    for (let i = 0; i < size; ++i) {
        context.drawImage(grass1, 8, 0, 16, 16, i * 16 + 8, 0, 16, 16);
    }
    context.drawImage(grass1, 24, 8, 8, 8, width - 8, 8, 8, 8);
    return canvas.transferToImageBitmap();
}

const pipe1 = (() => {
    const canvas = new OffscreenCanvas(32, 32);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 0, 32, 24, 0, 0, 32, 24);
    context.drawImage(bitmap, 0, 16, 32, 8, 0, 24, 32, 8);
    return canvas.transferToImageBitmap();
})();

const pipe = (size = 1) => {
    if (size === 1) {
        return pipe1;
    }
    const canvas = new OffscreenCanvas(32, ++size * 16);
    const context = canvas.getContext('2d');
    context.drawImage(pipe1, 0, 0, 32, 16, 0, 0, 32, 16);
    for (let i = 1; i < size; ++i) {
        context.drawImage(pipe1, 0, 16, 32, 16, 0, i * 16, 32, 16);
    }
    return canvas.transferToImageBitmap();
}

const stone1 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(hill1, 0, 8, 16, 16, 0, 0, 16, 16);
    const data = context.getImageData(0, 0, 16, 16);
    const d = data.data;
    const data0 = context.createImageData(data);
    const d0 = data0.data;
    for (let i = 0; i < d.length; ++i) {
        if (d[i] === 13) {
            d[i++] = 0;
            d[i++] = 0;
            d[i++] = 0;
        } else if (d[i + 3] === 0) {
            d[i++] = 254;
            d[i++] = 205;
            d[i++] = 198;
            d[i] = 255;
        } else {
            d0[i++] = 153;
            d0[i++] = 79;
            d0[++i] = 255;
        }
    }
    context.putImageData(data0, 0, 0);
    const bitmap = canvas.transferToImageBitmap();
    context.putImageData(data, 0, 0);
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(bitmap, 0, 0);
    context.fillStyle = '#994f00';
    context.fillRect(4, 4, 8, 8);
    return canvas.transferToImageBitmap();
})();

const stone = (rols = 1, rows = 1) => {
    if (rols === 1 && rows === 1) {
        return stone1;
    }
    const width = rols * 16;
    const height = rows * 16;
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext('2d');
    for (let j = 0; j < rows; ++j) {
        for (let i = 0, y = j * 16; i < rols - j; ++i) {
            context.drawImage(stone1, i * 16, y);
        }
    }
    return canvas.transferToImageBitmap();
}

const flag1 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 48, 64, 16, 8, 0, 0, 16, 8);
    context.drawImage(bitmap, 48, 64, 8, 8, 8, 8, 8, 8);
    return canvas.transferToImageBitmap();
})();

const flag2 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap0, 32, 32, 16, 16, 0, 0, 16, 16);
    return canvas.transferToImageBitmap();
})();

const pole1 = (() => {
    const canvas = new OffscreenCanvas(8, 152);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 80, 64, 8, 8, 0, 0, 8, 8);
    context.fillStyle = '#89d900';
    context.fillRect(3, 8, 2, 144);
    return canvas.transferToImageBitmap();
})();

const castle1 = (() => {
    const canvas = new OffscreenCanvas(80, 80);
    const context = canvas.getContext('2d');
    for (let i = 0; i < 3; ++i) {
        context.drawImage(bitmap, 32, 24, 16, 8, i * 16 + 16, 0, 16, 8);
    }
    for (let j = 0; j < 4; ++j) {
        for (let i = 0, y = j * 8 + 8; i < 6; ++i) {
            context.drawImage(bitmap, 88, 24, 8, 8, i * 8 + 16, y, 8, 8);
        }
    }
    context.fillRect(24, 16, 8, 16);
    context.fillRect(48, 16, 8, 16);
    for (let i = 0; i < 5; ++i) {
        context.drawImage(bitmap, 32, 24, 16, 8, i * 16, 32, 16, 8);
    }
    for (let j = 0; j < 5; ++j) {
        for (let i = 0, y = j * 8 + 40; i < 10; ++i) {
            context.drawImage(bitmap, 88, 24, 8, 8, i * 8, y, 8, 8);
        }
    }
    context.drawImage(bitmap, 80, 0, 16, 8, 32, 48, 16, 8);
    context.fillRect(32, 56, 16, 24);
    return canvas.transferToImageBitmap();
})();

const soil1 = await createImageBitmap(bitmap, 0, 32, 16, 16);

const land1 = (() => {
    const canvas = new OffscreenCanvas(16, 24);
    const context = canvas.getContext('2d');
    context.drawImage(soil1, 0, 0);
    context.drawImage(soil1, 0, 0, 16, 8, 0, 16, 16, 8);
    return canvas.transferToImageBitmap();
})();

const land = (size = 1) => {
    if (size === 1) {
        return land1;
    }
    const canvas = new OffscreenCanvas(size * 16, 24);
    const context = canvas.getContext('2d');
    for (let i = 0; i < size; ++i) {
        context.drawImage(land1, i * 16, 0);
    }
    return canvas.transferToImageBitmap();
}

const coin = (x) => {
    const canvas = new OffscreenCanvas(8, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, x, 24, 8, 8, 0, 0, 8, 8);
    context.translate(0, 16);
    context.scale(1, -1);
    context.drawImage(canvas, 0, 0);
    return canvas.transferToImageBitmap();
};

const coin0 = coin(0);
const coin1 = coin(8);
const coin2 = coin(16);
const coin3 = coin(24);

const agaric0 = await createImageBitmap(bitmap, 16, 32, 16, 16);

const agaric1 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(agaric0, 0, 0);
    const data = context.getImageData(0, 0, 16, 16);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
        if (d[i] === 181) {
            d[i] = 13;
            d[i + 1] = 148;
            d[i + 2] = 0;
        }
    }
    context.putImageData(data, 0, 0);
    return canvas.transferToImageBitmap();
})();

const flower0 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 72, 16, 8, 16, 0, 0, 8, 16);
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    return canvas.transferToImageBitmap();
})();

const flower1 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(flower0, 0, 0);
    const data = context.getImageData(0, 0, 16, 16);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
        if (d[i] === 254) {
            d[i] = 254;
            d[i + 1] = 205;
            d[i + 2] = 198;
        } else if (d[i] === 235) {
            d[i] = 153;
            d[i + 1] = 79;
            d[i + 2] = 0;
        } else if (d[i] === 181) {
            d[i] = 0;
            d[i + 1] = 0;
            d[i + 2] = 0;
        }
    }
    context.putImageData(data, 0, 0);
    return canvas.transferToImageBitmap();
})();

const flower2 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(flower0, 0, 0);
    const data = context.getImageData(0, 0, 16, 16);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
        if (d[i] === 254) {
            d[i] = 235;
            d[i + 1] = 159;
            d[i + 2] = 35;
        } else if (d[i] === 235) {
            d[i] = 108;
            d[i + 1] = 110;
            d[i + 2] = 0;
        }
    }
    context.putImageData(data, 0, 0);
    return canvas.transferToImageBitmap();
})();

const flower3 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(flower0, 0, 0);
    const data = context.getImageData(0, 0, 16, 16);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
        if (d[i] === 181) {
            d[i] = 13;
            d[i + 1] = 148;
            d[i + 2] = 0;
        }
    }
    context.putImageData(data, 0, 0);
    return canvas.transferToImageBitmap();
})();

const ball0 = await createImageBitmap(bitmap, 0, 64, 8, 8);

const ball = (angle) => {
    const canvas = new OffscreenCanvas(8, 8);
    const context = canvas.getContext('2d');
    context.translate(4, 4);
    context.rotate(angle);
    context.drawImage(ball0, -4, -4);
    return canvas.transferToImageBitmap();
}

const ball1 = ball(Math.PI * .5);
const ball2 = ball(Math.PI);
const ball3 = ball(Math.PI * 1.5);

const ball20 = reverse(ball0);
const ball21 = reverse(ball1);
const ball22 = reverse(ball2);
const ball23 = reverse(ball3);


const bomb0 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 8, 64, 8, 8, 4, 4, 8, 8);
    return canvas.transferToImageBitmap();
})();

const bomb1 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 16, 64, 8, 8, 0, 0, 8, 8);
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    context.translate(0, 16);
    context.scale(1, -1);
    context.drawImage(canvas, 0, 0);
    return canvas.transferToImageBitmap();
})();

const bomb2 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 24, 64, 8, 8, 0, 0, 8, 8);
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    context.translate(0, 16);
    context.scale(1, -1);
    context.drawImage(canvas, 0, 0);
    return canvas.transferToImageBitmap();
})();


const star0 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 56, 24, 8, 16, 0, 0, 8, 16);
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    return canvas.transferToImageBitmap();
})();

const star1 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(star0, 0, 0);
    const data = context.getImageData(0, 0, 16, 16);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
        if (d[i] === 13) {
            d[i] = 181;
            d[i + 1] = 50;
            d[i + 2] = 32;
        }
    }
    context.putImageData(data, 0, 0);
    return canvas.transferToImageBitmap();
})();

const star2 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(star0, 0, 0);
    const data = context.getImageData(0, 0, 16, 16);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
        if (d[i] === 235) {
            d[i] = 153;
            d[i + 1] = 79;
            d[i + 2] = 0;
        } else if (d[i] === 13) {
            d[i] = 0;
            d[i + 1] = 0;
        }
    }
    context.putImageData(data, 0, 0);
    return canvas.transferToImageBitmap();
})();

const star3 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(star1, 0, 0);
    const data = context.getImageData(0, 0, 16, 16);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
        if (d[i] === 235) {
            d[i] = 108;
            d[i + 1] = 110;
            d[i + 2] = 0;
        }
    }
    context.putImageData(data, 0, 0);
    return canvas.transferToImageBitmap();
})();


const villian0 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 48, 32, 8, 8, 0, 0, 8, 8);
    context.save();
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    context.restore();
    context.drawImage(bitmap, 48, 40, 16, 8, 0, 8, 16, 8);
    return canvas.transferToImageBitmap();
})();

const villian1 = reverse(villian0, 16);

const villian2 = (() => {
    const canvas = new OffscreenCanvas(16, 8);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 48, 24, 8, 8, 0, 0, 8, 8);
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    return canvas.transferToImageBitmap();
})();

const villian3 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.translate(0, 16);
    context.scale(1, -1);
    context.drawImage(villian0, 0, 0);
    return canvas.transferToImageBitmap();
})();

const villian4 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.translate(0, 16);
    context.scale(1, -1);
    context.drawImage(villian1, 0, 0);
    return canvas.transferToImageBitmap();
})();

const turtle0 = (() => {
    const canvas = new OffscreenCanvas(16, 24);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 64, 24, 8, 8, 0, 0, 8, 8);
    context.drawImage(bitmap, 64, 32, 16, 16, 0, 8, 16, 16);
    return canvas.transferToImageBitmap();
})();

const turtle1 = (() => {
    const canvas = new OffscreenCanvas(16, 24);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 80, 24, 8, 8, 0, 0, 8, 8);
    context.drawImage(bitmap, 80, 32, 16, 16, 0, 8, 16, 16);
    return canvas.transferToImageBitmap();
})();

const turtle2 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 8, 80, 8, 16, 0, 0, 8, 16);
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    return canvas.transferToImageBitmap();
})();

const turtle3 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.translate(0, 16);
    context.scale(1, -1);
    context.drawImage(turtle2, 0, 0);
    return canvas.transferToImageBitmap();
})();

const turtle20 = reverse(turtle0, 16, 24);
const turtle21 = reverse(turtle1, 16, 24);


const role0 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 56, 8, 8, 0, 8, 8, 8);
    context.save();
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    context.restore();
    context.drawImage(bitmap, 0, 48, 16, 8, 0, 0, 16, 8);
    return canvas.transferToImageBitmap();
})();

const role1 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 48, 16, 7, 1, 1, 16, 7);
    context.drawImage(bitmap, 16, 56, 16, 8, 0, 8, 16, 8);
    return canvas.transferToImageBitmap();
})();

const role2 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 48, 16, 7, 0, 0, 16, 7);
    context.drawImage(bitmap, 32, 48, 16, 16, 0, 0, 16, 16);
    return canvas.transferToImageBitmap();
})();

const role3 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 48, 16, 7, 0, 0, 16, 7);
    context.drawImage(bitmap, 48, 48, 16, 16, 0, 0, 16, 16);
    return canvas.transferToImageBitmap();
})();

const role4 = await createImageBitmap(bitmap, 64, 48, 16, 16);

const role5 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 48, 16, 7, 1, 1, 16, 7);
    context.drawImage(bitmap, 88, 48, 8, 8, 8, 0, 8, 8);
    context.drawImage(bitmap, 80, 56, 16, 8, 0, 8, 16, 8);
    return canvas.transferToImageBitmap();
})();

const role6 = await createImageBitmap(bitmap0, 0, 16, 16, 16);
const role7 = await createImageBitmap(bitmap0, 0, 32, 16, 16);
const role8 = await createImageBitmap(bitmap0, 16, 32, 16, 16);


const role10 = reverse(role0);
const role11 = reverse(role1);
const role12 = reverse(role2);
const role13 = reverse(role3);
const role14 = reverse(role4);
const role15 = reverse(role5);
const role16 = reverse(role6);
const role17 = reverse(role7);
const role18 = reverse(role8);


const role20 = (() => {
    const canvas = new OffscreenCanvas(16, 32);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 76, 8, 20, 0, 12, 8, 20);
    context.save();
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    context.restore();
    context.drawImage(bitmap, 0, 75, 16, 1, 0, 11, 16, 1);
    context.drawImage(bitmap, 64, 0, 16, 11, 0, 0, 16, 11);
    return canvas.transferToImageBitmap();
})();

const role21 = (() => {
    const canvas = new OffscreenCanvas(16, 32);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 64, 0, 16, 11, 0, 0, 16, 11)
    context.drawImage(bitmap, 16, 75, 16, 21, 0, 11, 16, 21);
    return canvas.transferToImageBitmap();
})();

const role22 = (() => {
    const canvas = new OffscreenCanvas(16, 32);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 64, 0, 16, 9, 0, 2, 16, 9)
    context.drawImage(bitmap, 32, 75, 16, 21, 0, 11, 16, 21);
    return canvas.transferToImageBitmap();
})();

const role23 = (() => {
    const canvas = new OffscreenCanvas(16, 32);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 64, 0, 16, 9, 0, 1, 16, 9)
    context.drawImage(bitmap, 48, 74, 16, 22, 0, 10, 16, 22);
    return canvas.transferToImageBitmap();
})();

const role24 = await createImageBitmap(bitmap, 64, 64, 16, 32);

const role25 = (() => {
    const canvas = new OffscreenCanvas(16, 32);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 64, 0, 8, 6, 0, 2, 8, 6);
    context.drawImage(bitmap, 88, 64, 8, 8, 8, 0, 8, 8);
    context.drawImage(bitmap, 80, 72, 16, 24, 0, 8, 16, 24);
    return canvas.transferToImageBitmap();
})();

const role26 = await createImageBitmap(bitmap0, 16, 0, 16, 32);
const role27 = await createImageBitmap(bitmap0, 32, 0, 16, 32);
const role28 = await createImageBitmap(bitmap0, 48, 0, 16, 32);

const role30 = reverse(role20, 16, 32);
const role31 = reverse(role21, 16, 32);
const role32 = reverse(role22, 16, 32);
const role33 = reverse(role23, 16, 32);
const role34 = reverse(role24, 16, 32);
const role35 = reverse(role25, 16, 32);
const role36 = reverse(role26, 16, 32);
const role37 = reverse(role27, 16, 32);
const role38 = reverse(role28, 16, 32);

const role49 = (() => {
    const canvas = new OffscreenCanvas(16, 24);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 80, 16, 8, 8, 0, 16, 8, 8);
    context.save();
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    context.restore();
    context.drawImage(bitmap, 64, 0, 16, 6, 0, 2, 16, 6);
    context.drawImage(bitmap, 80, 8, 16, 8, 0, 8, 16, 8);
    return canvas.transferToImageBitmap();
})();

const role59 = reverse(role49, 16, 24);

const role79 = (() => {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap0, 0, 0, 8, 16, 0, 0, 8, 16);
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    return canvas.transferToImageBitmap();
})();

const role89 = (() => {
    const canvas = new OffscreenCanvas(16, 24);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 64, 12, 8, 12, 0, 12, 8, 12);
    context.save();
    context.translate(16, 0);
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0);
    context.restore();
    context.drawImage(bitmap, 64, 0, 16, 12, 0, 0, 16, 12);
    return canvas.transferToImageBitmap();
})();

const role99 = reverse(role89, 16, 24);

export {
    bitmap,
    cloud,
    cloud1,
    plate1,
    block0,
    block1,
    block2,
    brick1,
    debris0,
    debris1,
    hill1,
    hill2,
    grass,
    grass1,
    pipe,
    pipe1,
    stone,
    stone1,
    flag1,
    flag2,
    pole1,
    castle1,
    land,
    land1,
    coin0,
    coin1,
    coin2,
    coin3,
    agaric0,
    agaric1,
    flower0,
    flower1,
    flower2,
    flower3,
    ball0,
    ball1,
    ball2,
    ball3,
    ball20,
    ball21,
    ball22,
    ball23,
    bomb0,
    bomb1,
    bomb2,
    star0,
    star1,
    star2,
    star3,
    villian0,
    villian1,
    villian2,
    villian3,
    villian4,
    turtle0,
    turtle1,
    turtle2,
    turtle3,
    turtle20,
    turtle21,
    role0,
    role1,
    role2,
    role3,
    role4,
    role5,
    role6,
    role7,
    role8,
    role10,
    role11,
    role12,
    role13,
    role14,
    role15,
    role16,
    role17,
    role18,
    role20,
    role21,
    role22,
    role23,
    role24,
    role25,
    role26,
    role27,
    role28,
    role30,
    role31,
    role32,
    role33,
    role34,
    role35,
    role36,
    role37,
    role38,
    role49,
    role59,
    role79,
    role89,
    role99
}