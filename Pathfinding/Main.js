let canvasWidth = 800;
let canvasHeight = 800;
let nodeSize = 10;
let nodes = [];
let bestPath = [];
let prevMouseNode = null;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(0);
    createNodes();
}

function getNodeFromMouse() {
    if(!(mouseX < 0) && !(mouseX > canvasWidth) && !(mouseY < 0) && !(mouseY > canvasHeight)) {
        return nodes[Math.floor(mouseX/nodeSize)][Math.floor(mouseY/nodeSize)];
    }
}

function mouseDragged() {
    if (mouseButton === LEFT) {
        getNodeFromMouse().walkable = false;
    }
    if (mouseButton === CENTER) {
        getNodeFromMouse().walkable = true;
    }
}

function mousePressed() {
    background(0);
    bestPath = findPath(nodes[0][0], getNodeFromMouse());
}

function lowestFCost(arr) {
    let minIndex = 0;

    for (let i = 0; i < arr.length; i++) {
        if(arr[i].fCost < arr[minIndex].fCost) {
            minIndex = i;
        }    
    }
    return arr[minIndex];
}

function findPath(startNode, targetNode) {
    let openNodes = [];
    let closedNodes = [];

    openNodes.push(startNode);

    while(openNodes.length > 0) {
        let currentNode = openNodes[0];

        for (let i = 0; i < openNodes.length; i++) {
            if(openNodes[i].fCost < currentNode.fCost || openNodes[i].fCost == currentNode.fCost && openNodes[i].hCost == currentNode.hCost) {
                currentNode = openNodes[i];
            }
        }
        // currentNode.draw();
        let i = openNodes.indexOf(currentNode);
        if (i > -1) {
            openNodes.splice(i, 1);
        }
        closedNodes.push(currentNode);

        if(currentNode == targetNode) {
            return retracePath(startNode, targetNode);
        }

        currentNode.getNeighbours().forEach(neighbour => {
            if(neighbour.walkable && !closedNodes.includes(neighbour)) {

                let newMovementCostToNeighbour = currentNode.gCost + getDistance(currentNode, neighbour);
                if(newMovementCostToNeighbour < neighbour.gCost || !openNodes.includes(neighbour)) {
                    neighbour.gCost = newMovementCostToNeighbour;
                    neighbour.hCost = getDistance(neighbour, targetNode);
                    neighbour.parent = currentNode;

                    if(!openNodes.includes(neighbour)) {
                        openNodes.push(neighbour);
                    }
                }
            }
        });
    }
}
 
function retracePath(startNode, targetNode) {
    let path = [];
    let curNode = targetNode;

    while(curNode != startNode) {
        path.push(curNode);
        curNode = curNode.parent;
    }
    path.push(startNode);
    return path;
}

function print(text) {
    console.log(text);
}

function draw() {
    // textSize(20);
    // text(parseInt(getFrameRate()), 10, 30);

    for (let x = 0; x < nodes.length; x++) {
        for (let y = 0; y < nodes[0].length; y++) {
            if(!nodes[x][y].walkable) {
                nodes[x][y].draw();
            }
            if(bestPath != null) {
                if(bestPath.includes(nodes[x][y])) {
                    nodes[x][y].draw();
                }
            }
        }
    }
    prevMouseNode = getNodeFromMouse();
}

function getDiagonalDist(a) {
    return Math.sqrt(Math.pow(a, 2) * 2);
}

function getDistance(nodeA, nodeB) {
    if(nodeA != null && nodeB != null) {
        let dstX = Math.abs(nodeA.pos.x - nodeB.pos.x);
        let dstY = Math.abs(nodeA.pos.y - nodeB.pos.y);

        if(dstX > dstY) {
            return 14 * dstY + 10 * (dstX - dstY);
        }
        return 14 * dstX + 10 * (dstY - dstX);
    } else {
        return null;
    }
}

function createNodes() {
    for (let x = 0; x < canvasWidth / nodeSize; x++) {
        let temp = [];
        for (let y = 0; y < canvasHeight / nodeSize; y++) {
             temp.push(new Node(x, y, nodeSize, nodeSize));
        }
        nodes.push(temp);
    }
}