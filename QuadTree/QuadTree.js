class Point
{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(color) {
        stroke(color);
        strokeWeight(1);
        point(this.x, this.y);
    }
}

class Boundary
{
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return (point.x >= this.x - this.w &&
                point.x <= this.x + this.w &&
                point.y >= this.y - this.h &&
                point.y <= this.y + this.h);
    }

    intersects(range) {
        return !(range.x - range.w > this.x + this.w || 
                range.x + range.w < this.x - this.w || 
                range.y - range.h > this.y + this.h || 
                range.y + range.h < this.y - this.h);
    }
}

class QuadTree
{
    constructor(boundary) {
        this.boundary = boundary;
        this.points = [];
        this.divided = false;
        this.northWest = null;
        this.northEast = null;
        this.southWest = null;
        this.southEast = null;
    }

    query(range, found) {
        if(!found) {
            found = [];
        }

        if (!this.boundary.intersects(range)) {
            return;
        } else {
            this.points.forEach(point => {
                if(range.contains(point)) {
                    found.push(point);
                }
            });
            if(this.divided) {
                this.northWest.query(range, found);
                this.northEast.query(range, found);
                this.southWest.query(range, found);
                this.southEast.query(range, found);
            }
        }
        return found;
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;
        
        this.northEast = new QuadTree(new Boundary(x + w / 2, y - h / 2, w / 2, h / 2));
        this.northWest = new QuadTree(new Boundary(x - w / 2, y - h / 2, w / 2, h / 2));
        this.southEast = new QuadTree(new Boundary(x + w / 2, y + h / 2, w / 2, h / 2));
        this.southWest = new QuadTree(new Boundary(x - w / 2, y + h / 2, w / 2, h / 2));
        this.divided = true;
    }

    insert(point) {
        if(!this.boundary.contains(point)) {
            return;
        }

        if(this.points.length < capacity) {
            this.points.push(point);
        } else {
            if(!this.divided) {
                this.subdivide();
            }

            this.northWest.insert(point);
            this.northEast.insert(point);
            this.southWest.insert(point);
            this.southEast.insert(point);
        }
    }

    draw() {
        stroke(52, 188, 77);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);

        if(this.divided) {
            this.northWest.draw();
            this.northEast.draw();

            this.southWest.draw();
            this.southEast.draw();
        }

        this.points.forEach(point => {
            point.draw(255);
        });
    }
}