let canvasWidth = 600;
let canvasHeight = 600;

let walls;
let rays = [];
let light;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    light = new LightSource(createVector(300, 300));
    walls = [];

    walls.push(new Wall(200, 0, 0, 200));
    walls.push(new Wall(400, 0, 600, 200));
    walls.push(new Wall(0, 400, 200, 600));
    walls.push(new Wall(400, 600, 600, 400));

    walls.push(new Wall(50, 50, 550, 50));
    walls.push(new Wall(50, 50, 50, 550));
    walls.push(new Wall(550, 50, 550, 550));
    walls.push(new Wall(550, 550, 50, 550));
}

function draw() {
    background(0);

    walls.forEach(wall => {
        wall.draw();
    });
    light.update(mouseX, mouseY);
    light.castRays(walls);

    light.draw();
}