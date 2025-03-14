class Bullet {
    constructor(x, y, canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.x = x;
        this.y = y;
        this.width = canvas.width * 0.01;
        this.height = canvas.height * 0.03;
        this.color = "yellow";
        this.speed = Math.max(canvas.height * 0.01, 4);
    }

    update() {
        this.y -= this.speed;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}