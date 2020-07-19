let canvasWidth = 1900;
let canvasHeight = 900;
let boids = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    createBoids(1000);
}

function draw() {
    background(0);
    
    textSize(33);
    text(parseInt(getFrameRate()), 10, 30);
    
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