class Node {
    constructor(x, y, noise) {
        this.x = x;
        this.y = y;
        this.noise = noise;
    }

    draw() {
        noStroke();
        fill(43, this.noise * 255, 153);
        rect(this.x, this.y, rez, rez);
    }
}