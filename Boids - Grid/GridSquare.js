class GridSquare {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.objs = [];
        this.color = (255);
    }

    addObj(boid) {
        this.objs.push(boid);
        this.color = (255, 0, 0)
    }

    removeObj(boid) {
        var i = this.objs.indexOf(boid);
        if (i > -1) {
            this.objs.splice(i, 1);
        }
    }

    contains(boid) {
        return (boid.pos.x > this.x && boid.pos.x < this.x + this.w &&
                boid.pos.y > this.y && boid.pos.y < this.y + this.h);
    }

    draw() {
        noFill();
        if(this.objs.length > 0) {
            stroke(255);
            rectMode(CENTER);
            rect(this.x, this.y, this.w, this.h);

            fill(255, 0, 0);
            textSize(10);
            text(this.objs.length, this.x + 30, this.y - 30);
    } else {
            stroke(0);
            rectMode(CENTER);
            rect(this.x, this.y, this.w, this.h);
        }
    }
}