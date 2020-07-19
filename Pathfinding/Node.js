class Node
{
    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
        this.fCost = 0;
        this.gCost = 0;
        this.hCost = 0;
        this.walkable = true;
        this.parent = null;
    }

    getNeighbours() {
        let neighbours = [];
        let x = this.pos.x;
        let y = this.pos.y;

        if(x != 0) {
            neighbours.push(nodes[x-1][y]);
        }
        if(x != nodes.length - 1) {
            neighbours.push(nodes[x+1][y]);
        }
        if(y != 0) {
            neighbours.push(nodes[x][y-1]);
        }
        if(y != nodes[1].length - 1) {
            neighbours.push(nodes[x][y+1]);
        }

        if(x != 0 && y != 0) {
            if(nodes[x-1][y].walkable || nodes[x][y-1].walkable) {
                neighbours.push(nodes[x-1][y-1]);
            }
        }
        if(x != nodes[1].length - 1 && y != nodes[1].length - 1) {
            if(nodes[x+1][y].walkable || nodes[x][y+1].walkable) {
                neighbours.push(nodes[x+1][y+1]);
            }
        }
        if(x != nodes[1].length - 1 && y != 0) {
            if(nodes[x+1][y].walkable || nodes[x][y-1].walkable) {
                neighbours.push(nodes[x+1][y-1]);
            }
        }
        if(x != 0 && y != nodes[1].length - 1) {
            if(nodes[x-1][y].walkable || nodes[x][y+1].walkable) {
                neighbours.push(nodes[x-1][y+1]);
            }
        }

        return neighbours;
    }

    draw() {
        rectMode(CENTER);
        if(!this.walkable) {
            fill(255, 0, 0);
            stroke(255, 0, 0);
        } else {
            fill(255);
            stroke(255);
        }
        rect(this.pos.x * nodeSize + nodeSize/2, this.pos.y * nodeSize + nodeSize/2, this.w, this.h);
    }
}