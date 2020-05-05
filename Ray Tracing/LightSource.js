class LightSource
{
    constructor(pos, numRays) {
        this.pos = pos;
        this.rays = [];

        for (let i = 0; i < 360; i += 1) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    update(x, y) {
        this.pos.set(x, y);
    }

    castRays(walls) {
        this.rays.forEach(ray => {

            let closestPoint = null;
            let record = Infinity;

            walls.forEach(wall => {
                const pt = ray.cast(wall);

                if(pt) {
                    const distance = p5.Vector.dist(this.pos, pt);
                    if(distance < record) {
                        record = distance;
                        closestPoint = pt;
                    }
                }
            });

            if(closestPoint) {
                stroke(255, 100)
                line(this.pos.x, this.pos.y, closestPoint.x, closestPoint.y);
            }
            // else {
            //     stroke(255, 100)
            //     line(this.pos.x, this.pos.y, ray.dir.x * this.sightLength + this.pos.x, ray.dir.y * this.sightLength + this.pos.y);
            // }
        });
    }

    draw() {
        ellipse(this.pos.x, this.pos.y, 8, 8);
    }
}