export class Dust {
    constructor(app, x, y, direction) {
        this.app = app;
        this.marketForDeletion = false;
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = "rgba(100,100,100,0.2)";
        this.direction = direction;
    }
    update() {
        this.x -= this.direction * (this.speedX + 5);
        this.y -= this.speedY;
        this.size *= 0.95;
        if (this.size < 0.5) this.marketForDeletion = true;
    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}
