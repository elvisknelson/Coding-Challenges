let canvasWidth = 1900;
let canvasHeight = 915;
let points;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    points = [];
    CreatePoints(50);
}

function draw() {
    background(0);

    points.forEach(point => {
        point.update();
        point.draw();
    });

    for (let i = 0; i < points.length; i++) {
        for (let j = i; j < points.length; j++) {
            let dist = p5.Vector.dist(points[i].pos, points[j].pos);
            if(dist < 255) {
                stroke('rgba(100%,100%,100%,' + lerp(1, 0, dist / 255) + ')');
                line(points[i].pos.x, points[i].pos.y, points[j].pos.x, points[j].pos.y);
            }
        }
    }
}

function CreatePoints(numPoints) {
    for (let i = 0; i < numPoints; i++) {
        points.push(new Point());
    }
}