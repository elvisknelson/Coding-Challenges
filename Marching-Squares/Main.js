let cSize = 800;
let rez = 10;
let points = new Array((cSize / rez) + 1);
let xOff = 0;
let yOff = 0;

function setup() {
    createCanvas(cSize, cSize);
    noiseSeed(Math.random() * 1000);
    for (let i = 0; i < points.length; i++) {
        points[i] = [];
    }

    for (let col = 0; col <= cSize / rez; col++) {
        for (let row = 0; row <= cSize / rez; row++) {
            points[col][row] = new Node(col * rez, row * rez, noise((col / 15) + xOff, (row / 15) + yOff));
        }
    }
}

function keyInput() {
    if (keyIsDown(UP_ARROW)) {
        yOff += 0.1;
    } 
    if (keyIsDown(DOWN_ARROW)) {
        yOff -= 0.1;
    }
    if (keyIsDown(LEFT_ARROW)) {
        xOff += 0.1;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        xOff -= 0.1;
    }
}

function draw() {
    background(0);
    keyInput();
    
    
    drawSquares();
    drawMarchingSquares();
}

function getState(a, b, c, d) {
    return a * 8 + b * 4 + c * 2 + d * 1;
}

function drawSquares() {
    for (let col = 0; col <= cSize / rez; col++) {
        for (let row = 0; row <= cSize / rez; row++) {
            points[col][row].noise = noise((col / 25) + xOff, (row / 25) + yOff);
            points[col][row].draw();
        }
    }
}

function drawMarchingSquares() {
    for (let col = 0; col <= (cSize / rez) - 1; col++) {
        for (let row = 0; row <= (cSize / rez) - 1; row++) {
            let a = points[col][row];
            let b = points[col + 1][row];
            let c = points[col + 1][row + 1];
            let d = points[col][row + 1];

            stroke(255);
            strokeWeight(0.5);
            switch (getState(Math.round(a.noise), Math.round(b.noise), Math.round(c.noise), Math.round(d.noise))) {
                case 1:
                    line(a.x, a.y + rez/2, a.x + rez/2, a.y + rez);
                    break;
                case 2:
                    line(a.x + rez, a.y + rez/2, a.x + rez/2, a.y + rez);
                    break;
                case 3:
                    line(a.x, a.y + rez/2, a.x + rez, a.y + rez/2);
                    break;
                case 4:
                    line(a.x + rez/2, a.y, a.x + rez, a.y + rez/2);
                    break;
                case 5:
                    line(a.x + rez/2, a.y, a.x + rez, a.y + rez/2);
                    line(a.x, a.y + rez/2, a.x + rez/2, a.y + rez);
                    break;
                case 6:
                    line(a.x + rez/2, a.y, a.x + rez/2, a.y + rez);
                    break;
                case 7:
                    line(a.x + rez/2, a.y, a.x, a.y + rez/2);
                    break;
                case 8:
                    line(a.x + rez/2, a.y, a.x, a.y + rez/2);
                    break;
                case 9:
                    line(a.x + rez/2, a.y, a.x + rez/2, a.y + rez);
                    break;
                case 10:
                    line(a.x + rez/2, a.y, a.x , a.y + rez/2);
                    line(a.x + rez, a.y + rez/2, a.x + rez/2, a.y + rez);
                    break;
                case 11:
                    line(a.x + rez/2, a.y, a.x + rez, a.y + rez/2);
                    break;
                case 12:
                    line(a.x, a.y + rez/2, a.x + rez, a.y + rez/2);
                    break;
                case 13:
                    line(a.x + rez, a.y + rez/2, a.x + rez/2, a.y + rez);
                    break;
                case 14:
                    line(a.x, a.y + rez/2, a.x + rez/2, a.y + rez);
                    break;
                default:
                    break;
            }
        }
    }
}