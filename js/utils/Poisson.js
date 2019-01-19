import { Vector2 } from 'three/src/math/Vector2.js';

let width = 0;
let height = 0;
let cols, rows;
let r = 0; // Spacing
let w = 0;

const k = 12;
const grid = [];
const active = [];
const { floor } = Math;

let seededRandom = () => {};

function init(_width, _height, spacing, randomFunction) {
    r = spacing;
    width = _width;
    height = _height;
    w = r / Math.sqrt(2);
    seededRandom = randomFunction;

    // STEP 0
    cols = floor(width / w);
    rows = floor(height / w);
    for (let i = 0; i < cols * rows; i++) {
        grid[i] = undefined;
    }

    // STEP 1
    const x = width / 2;
    const y = height / 2;
    const i = floor(x / w);
    const j = floor(y / w);
    const pos = new Vector2(x, y);
    grid[i + j * cols] = pos;
    active.push(pos);
}

function signedRandom() {
    return -1 + seededRandom() * 2;
}

function generatePoints() {
    const ordered = [];

    while (active.length > 0) {
        const randIndex = floor(seededRandom(active.length));
        const pos = active[randIndex];
        let found = false;
        for (let n = 0; n < k; n++) {
            const sample = new Vector2();
            sample.set(signedRandom(), signedRandom());

            const m = r + seededRandom() * r;
            sample.multiplyScalar(m);
            sample.add(pos);

            const col = floor(sample.x / w);
            const row = floor(sample.y / w);

            if (col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]) {
                let ok = true;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const index = (col + i) + (row + j) * cols;
                        const neighbor = grid[index];
                        if (neighbor) {
                            const d = sample.distanceTo(neighbor);
                            if (d < r) {
                                ok = false;
                            }
                        }
                    }
                }
                if (ok) {
                    found = true;
                    grid[col + row * cols] = sample;
                    active.push(sample);
                    ordered.push(sample);
                    // Should we break?
                    break;
                }
            }
        }

        if (!found) {
            active.splice(randIndex, 1);
        }
    }
    return ordered;
}

export default {
    init,
    generatePoints
}
