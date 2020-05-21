let canvasWidth = 1800;
let canvasHeight = 800;
let boids = [];
let quadTree;
let capacity = 5;
let n = 1000;

let alignSlider, cohesionSlider, separationSlider;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    quadTree = new QuadTree(new Boundary(canvasWidth/2, canvasHeight/2, canvasWidth/2, canvasHeight/2));
    createBoids(n);
}

function draw() {
    background(0);

    quadTree = new QuadTree(new Boundary(canvasWidth/2, canvasHeight/2, canvasWidth/2, canvasHeight/2));

    for (let i = 0; i < n; i++) {
        quadTree.insert(boids[i]);
    }

    boids.forEach(boid => {
        boid.draw();
        boid.update();
        boid.flock(boids);
        boid.edges();
    });
    // quadTree.draw();
}

function createBoids(numBoids) {
    for (let i = 0; i < numBoids; i++) {
        boids.push(new Boid(random(canvasWidth), random(canvasHeight)));
        quadTree.insert(boids[i]);
    }
}