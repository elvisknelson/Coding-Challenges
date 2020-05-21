class LightSource
{
    constructor(pos, fov) {
        this.pos = pos;
        this.rays = [];
        this.fov = fov;
        this.facingDir = 0;

        for (let i = 0; i < this.fov; i += 1) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    update(x, y, facingDir) {
        this.pos.set(x, y);

        for (let i = 0; i < this.fov; i += 1) {
            this.rays[i].dir = p5.Vector.fromAngle(radians(i) + facingDir - radians(this.fov / 2));
        }
    }

    castRays(walls) {
        this.rays.forEach(ray => {

            let closestPoint = null;
            let record = Infinity;
            // let sightLength = 100;

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
            //     line(this.pos.x, this.pos.y, ray.dir.x * sightLength + this.pos.x, ray.dir.y * sightLength + this.pos.y);
            // }
        });
    }

    draw() {
        stroke(162, 244, 221);
        ellipse(this.pos.x, this.pos.y, 8, 8);
    }
}