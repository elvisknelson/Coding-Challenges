class LightSource
{
    constructor(pos, intensity, fov) {
        this.pos = pos;
        this.rays = [];
        this.fov = fov;
        this.intensity = intensity;
        this.facingDir = 0;

        for (let i = 0; i < fov; i += intensity) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    update(x, y, facingDir) {
        this.pos.set(x, y);

        for (let i = 0; i < this.fov; i += this.intensity) {
            this.rays[i].dir = p5.Vector.fromAngle(radians(i) + facingDir);
        }
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