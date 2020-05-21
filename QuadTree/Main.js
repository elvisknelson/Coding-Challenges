let canvasWidth = 400;
let canvasHeight = 400;
let qt;
let capacity = 3;
let pInRange;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    boundary = new Boundary(200, 200, 200, 200);
    qt = new QuadTree(boundary);

    for (let i = 0; i < 450; i++) {
        qt.insert(new Point(random(0, 400), random(0, 400)));
    }
}

function draw() {
    background(0);
    qt.draw();

    rectMode(CENTER);
    stroke(255, 0, 0)
    let rec = new Boundary(mouseX, mouseY, 30, 30);
    rect(rec.x, rec.y, rec.w*2, rec.h*2);

    let points = qt.query(rec);
    rec.x = mouseX;
    rec.y = mouseY;
    

    if(points != null) {
        for(let p of points) {
            strokeWeight(5);
            stroke(255, 0, 0);
            point(p.x, p.y);
        }
    }

}
