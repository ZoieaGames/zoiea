export default class Image {
    static image = {
        background1: 'background.jpg',
        PeaBullet1: 'PeaBullet.gif',
        PeaBulletHit1: 'PeaBulletHit.gif',
        Peashooter1: 'Peashooter.png',
        Peashooter2: 'Peashooter.gif',
        Zombie1: 'Zombie.gif',
        ZombieDie1: 'ZombieDie.gif',
    };
    static async init(id) {
        for (const [key, value] of Object.entries(this.image)) if (value.endsWith('gif')) {
            const decoder = new ImageDecoder({ type: 'image/gif', data: (await fetch(`/${id}/image/${value}`)).body });
            this.image[key] = [];
            let frameIndex = 0;
            do this.image[key].push(await createImageBitmap((await decoder.decode({ frameIndex })).image));
            while (++frameIndex < decoder.tracks.selectedTrack.frameCount);
            decoder.close();
        } else this.image[key] = await createImageBitmap(await (await fetch(`/${id}/image/${value}`)).blob());
    }
}
await Image.init('PlantsVsZombies');