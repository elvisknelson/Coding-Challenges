class Player
{
    constructor(pos, facingDir) {
        this.pos = pos;
        this.facingDir  = facingDir;
        this.light = new LightSource(createVector(300, 300), 1, 360);
    }

    update() {
        let dir = p5.Vector.fromAngle(this.facingDir);

        if (keyIsDown(LEFT_ARROW)) {
            this.facingDir -= 0.1;
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.facingDir += 0.1;
        } else if (keyIsDown(UP_ARROW)) {
            this.pos.x += dir.x;
            this.pos.y += dir.y;
        } else if (keyIsDown(DOWN_ARROW)) {
            this.pos.x += dir.x;
            this.pos.y += dir.y;
        }

        this.light.update(this.pos.x, this.pos.y, this.facingDir);
        this.light.castRays(walls);
        this.light.draw();
    }

    draw() {
        ellipse(this.pos.x, this.pos.y, 10, 10);
    }
}