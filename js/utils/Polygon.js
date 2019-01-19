
export class Polygon {
    constructor(ctx) {
        this.ctx = ctx;
        this.points = [];
    }

    reset() {
        this.points = [];
    }

    draw(x, y, radius, sides, rOff) {
        this.reset();
        const { PI, sin, cos } = Math;
        const a = (PI * 2) / sides;
        const startX = radius * cos(rOff + 0);
        const startY = radius * sin(rOff + 0);

        this.ctx.translate(x, y);
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.points.push({ x: startX, y: startY });

        for (var i = 1; i < sides; i++) {
            const x = radius * cos(rOff + a * i);
            const y = radius * sin(rOff + a * i);
            this.ctx.lineTo(x, y);
            this.points.push({ x, y });
        }
        this.ctx.closePath();
        this.ctx.translate(-x, -y);
    }

    stroke(x, y, radius, sides, rOff = 0) {
        this.draw(x, y, radius, sides, rOff);
        this.ctx.stroke();
    }

    fill(x, y, radius, sides, rOff = 0) {
        this.draw(x, y, radius, sides, rOff);
        this.ctx.fill();
    }

    clip(x, y, radius, sides, rOff = 0) {
        this.draw(x, y, radius, sides, rOff);
        this.ctx.clip();
    }
}
