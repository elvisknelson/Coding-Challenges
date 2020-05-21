let canvasWidth = 1900;
let canvasHeight = 900;
let boids = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    // alignSlider = createSlider(0, 5, 1, 0.1);
    // alignSlider.position(50, canvasHeight + 20);

    // cohesionSlider = createSlider(0, 5, 1, 0.1);
    // cohesionSlider.position(alignSlider.width + 56, canvasHeight + 20);

    // separationSlider = createSlider(0, 5, 1, 0.1);
    // separationSlider.position(cohesionSlider.width + alignSlider.width + 55, canvasHeight + 20);
    createBoids(200);
}

function draw() {
    background(0);

    boids.forEach(boid => {
        boid.draw();
        boid.update();
        boid.flock(boids);
        boid.edges();
    });
}

function createBoids(numBoids) {
    for (let i = 0; i < numBoids; i++) {
        boids.push(new Boid(random(canvasWidth), random(canvasHeight)));
    }
}