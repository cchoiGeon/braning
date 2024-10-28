import NodeCache from 'node-cache';
import fs from 'fs';

const cache = new NodeCache();

export default {
    init: () => {
        const cached = JSON.parse(fs.readFileSync('cached.json', 'utf-8'));
        for (const [key, value] of Object.entries(cached)) {
            cache.set(key, value.v);
        }
    },
    save: () => {
        fs.writeFileSync('cached.json', JSON.stringify(cache.data));
    },
    get: (code, birth) => cache.get(`${code}/${birth}`),
    set: (code, birth, data) => cache.set(`${code}/${birth}`, data),
};