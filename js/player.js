class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = 50;
        this.height = 50;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.color = "cyan";
        this.speed = 5;
        this.movingLeft = false;
        this.movingRight = false;
        this.bullets = [];
        this.lastShotTime = 0;
        this.shotInterval = 300; // Milisegundos entre disparos
    }

    move() {
        if (this.movingLeft && this.x > 0) {
            this.x -= this.speed;
        }
        if (this.movingRight && this.x + this.width < this.canvas.width) {
            this.x += this.speed;
        }
    }

    shoot() {
        const now = Date.now();
        if (now - this.lastShotTime > this.shotInterval) {
            this.bullets.push(new Bullet(this.x + this.width / 2, this.y, this.canvas));
            this.lastShotTime = now; // Actualiza el tiempo del último disparo
        }
    }

    update() {
        this.move();
        this.shoot(); // Ahora dispara automáticamente
        this.bullets.forEach(bullet => bullet.update());
        this.bullets = this.bullets.filter(bullet => bullet.y > 0); // Elimina balas fuera de pantalla
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.bullets.forEach(bullet => bullet.draw());
    }
}