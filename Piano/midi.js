export default class MIDI {
    static decode(data) {
        let view = new DataView(data), offset = 10, type, index = 0, length, time, last;
        const tracks = new Array(view.getUint16(offset)), uint = () => {
            data = 0;
            while ((type = view.getUint8(offset++)) & 128) data = (data | type & 127) << 7;
            return data | type;
        }, division = .001 / view.getUint16(offset += 2);
        offset += 2;
        do {
            (tracks[index] = []).index = 0;
            length = view.getUint32(offset += 4) + (offset += 4);
            do {
                time = uint();
                if ((type = view.getUint8(offset++)) & 128) {
                    data = view.getUint8(offset++);
                    last = type;
                } else {
                    data = type;
                    type = last;
                }
                if ((type >>= 4) === 9) type = view.getUint8(offset++);
                else if (type === 8) {
                    type = 0;
                    ++offset;
                } else if (type === 15) {
                    if (last === 255 && data === 81) {
                        type = null;
                        data = view.getUint32(offset) & 0xffffff;
                        offset += 4;
                    } else type = void (offset = uint() + offset);
                } else type = void (type === 13 || type === 12 || ++offset);
            } while (tracks[index].push({ index, time, type, data }), offset < length);
        } while (tracks[index].time = tracks[index][0].time, ++index < tracks.length);
        data = tracks[0];
        time = division * 500000;
        view = [];
        do {
            data[data.index].type === null && (time = division * data[data.index].data);
            data[data.index].time = (last = data.time) * time;
            view.push(data[data.index]);
            data.time += data[++data.index]?.time ?? Infinity;
        } while (tracks.forEach(track => (track.time -= last) < data.time && (data = track)), data.time !== Infinity);
        return view;
    }
}