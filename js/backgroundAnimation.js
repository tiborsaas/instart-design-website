import SimplexNoise from 'simplex-noise';

const noise = new SimplexNoise();
const { sin, cos, random, PI } = Math;
const TWO_PI = PI * 2;

let rings = 80;
let dim_init = 0;
let dim_delta = 4.5;

let chaos_init = .0;
let chaos_delta = 0.1;
let chaos_mag = 8;

let ox = random() * 10000;
let oy = random() * 10000;
let oz = random() * 10000;

const radians = angle => angle * PI / 180;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'pink';
ctx.globalAlpha = 0.34;
ctx.resetTransform();
ctx.translate(canvas.width / 2, canvas.height / 2);

function clearScreen() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
}

function render() {
    clearScreen();
    ox += 0.004;
    oy -= 0.002;
    oz += 0.001;

    for (let i = 0; i < rings; i++) {
        ctx.beginPath();
        for (let angle = 0; angle < 360; angle++) {
            let radian = radians(angle);
            let radius = (chaos_mag * getNoiseWithTime(radian, chaos_delta * i + chaos_init, oz)) + (dim_delta * i + dim_init);
            ctx.lineTo(radius * cos(radian), radius * sin(radian));
        }
        ctx.closePath();
        ctx.stroke();
    }
    requestAnimationFrame(render);
}

function getNoiseWithTime(radian, dim, time) {
    let r = radian % TWO_PI;
    if (r < 0.0) { r += TWO_PI; }
    return noise.noise3D(ox + cos(r) * dim, oy + sin(r) * dim, oz + time);
}

window.render = render;