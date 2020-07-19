let canvasWidth = 1900;
let canvasHeight = 900;
let boids = [];
let grid = [];
let gridSize = 100;

let alignSlider, cohesionSlider, separationSlider;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    createGrid();
    createBoids(400);
}

function draw() {
    background(0);

    textSize(33);
    text(parseInt(getFrameRate()), 10, 30);

    // grid.forEach(square => {
    //     stroke(255, 0, 0);
    //     square.draw();
    // });
    
    boids.forEach(boid => {
        boid.draw();
        boid.update();
        boid.flock(boids);
        boid.edges();
    });
}

function createGrid() {
    for (let y = 50; y < canvasHeight; y += 100) {
        for (let x = 50; x < canvasWidth; x += 100) {
            grid.push(new GridSquare(x, y, gridSize, gridSize));
        }
    }
}

function createBoids(numBoids) {
    for (let i = 0; i < numBoids; i++) {
        boids.push(new Boid(random(canvasWidth), random(canvasHeight)));
    }
}