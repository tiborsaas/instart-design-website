import { Polygon } from "./utils/Polygon";
import Poisson from "./utils/Poisson";
import { seededRandom } from "./utils/random";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const SPACING = 90;
const { width, height } = canvas;
const defaultPalette = ['EF476F', 'FFD166', '06D6A0', '118AB2'];
let random = seededRandom(Math.random()*1500);

Poisson.init(screen.width, screen.height, SPACING, random);

function getRandom(max) {
    return Math.round(Math.random() * max);
}

function getRandomColor(palette) {
    return `#${palette[getRandom(palette.length - 1)]}`;
}

function drawPolygon(pos, offset) {
    const polygon = new Polygon(ctx);
    const rotation = Math.PI * 2 * random() + offset * .01;
    const sides = 3 + Math.floor(random() * 7);
    const size = SPACING * random();
    const line = 12 * random();

    ctx.lineWidth = line;

    const { x, y } = pos;

    if (random() > .85) {
        polygon.fill(x, y, size, sides, rotation);
    } else {
        polygon.stroke(x, y, size, sides, rotation);
    }
}

window.addEventListener('scroll', function (event) {
    render(window.pageYOffset);
});

/**
 * Init function to render background
 */
const points = Poisson.generatePoints();

export function render(yOff = 0) {
    random = seededRandom(0);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.save();
    ctx.translate(0, -yOff / 2);

    points.forEach(point => {
        const col = Math.floor(random() * (defaultPalette.length - 1));
        ctx.strokeStyle = `#${defaultPalette[col]}`;
        ctx.fillStyle = `#${defaultPalette[col]}`;
        drawPolygon(point, yOff);
    });
    ctx.restore();
}
