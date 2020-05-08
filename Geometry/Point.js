class Point
{
    constructor() {
        this.pos = createVector(900, 450);
        this.dir = p5.Vector.fromAngle(Math.random() * 360);
        this.speed = 1;
    }

    update() {
        this.pos.x += this.dir.x * this.speed;
        this.pos.y += this.dir.y * this.speed;

        if(this.pos.x > 1900) {
            this.pos.x = 0;
        } else if(this.pos.x < 0) {
            this.pos.x = 1900;
        } else if(this.pos.y > 915) {
            this.pos.y = 0;
        } else if(this.pos.y < 0) {
            this.pos.y = 915;
        }
    }

    draw() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 8, 8);
    }
}