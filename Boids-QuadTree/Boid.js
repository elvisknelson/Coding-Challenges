class Boid
{
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
        this.maxForce = random(0.1, 0.3);
        this.maxSpeed = random(4, 6);
        this.size = 10;
        this.closestBoids = [];
    }

    flock() {
        let align = this.allignment();
        let cohesion = this.cohesion();
        let separation = this.separation();

        this.closestBoids = [];
        this.closestBoids = quadTree.query(new Boundary(this.pos.x, this.pos.y, 50, 50), this.closestBoids);

        this.acceleration.add(align);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    separation() {
        let total = 0;
        let steering = createVector();

        this.closestBoids.forEach(boid => {
            let d = p5.Vector.dist(this.pos, boid.pos);

            if(boid != this) {
                let diff = p5.Vector.sub(this.pos, boid.pos);
                diff.div(d);
                steering.add(diff);
                total++;
            }
        });
        
        if(total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    allignment() {
        let perceptionRadius = 100;
        let total = 0;
        let steering = createVector();

        this.closestBoids.forEach(boid => {
            if(boid != this) { 
                if(p5.Vector.dist(this.pos, boid.pos) < perceptionRadius) {
                    steering.add(boid.velocity);
                    total++;
                }
            }
        });
        if(total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion() {
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;

        this.closestBoids.forEach(boid => {
            if(boid != this) { 
                if(p5.Vector.dist(this.pos, boid.pos) < perceptionRadius) {
                    steering.add(boid.pos);
                    total++;
                }
            }
        });

        if(total > 0) {
            steering.div(total);
            steering.sub(this.pos);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    update() {
        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    edges() {
        if(this.pos.x > canvasWidth) {
            this.pos.x = 0;
        } else if(this.pos.x < 0) {
            this.pos.x = canvasWidth;
        }

        if(this.pos.y > canvasHeight) {
            this.pos.y = 0;
        } else if(this.pos.y < 0) {
            this.pos.y = canvasHeight;
        }
    }

    draw() {
        // rectMode(CENTER);
        // stroke(255, 0, 0);
        // noFill();
        // rect(this.pos.x, this.pos.y, 100, 100);

        let p1 = p5.Vector.fromAngle(0 + this.velocity.heading());
        let p2 = p5.Vector.fromAngle(90 + this.velocity.heading());
        let p3 = p5.Vector.fromAngle(180 + this.velocity.heading());

        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(p1.x * this.size, p1.y * this.size, p2.x * this.size, p2.y * this.size);
        line(0, 0, p2.x * this.size, p2.y * this.size);
        line(0, 0, p3.x * this.size, p3.y * this.size);
        line(p1.x * this.size, p1.y * this.size, p3.x * this.size, p3.y * this.size);
        pop();
    }
}