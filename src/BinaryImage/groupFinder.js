import { getBinaryArray } from "./toBinaryImage";

//returns a list of centroids as objects [{x, y, size}]
export default function groupFinder(image, targetColor, threshold){
    const clusters = [];
    const visited = new Set();
    const binaryArray = getBinaryArray(image, targetColor, threshold);
    for(let y = 0; y < binaryArray.length; y++){
        for(let x = 0; x < binaryArray[0].length; x++){
            const current = `${x} ${y}`;
            if(binaryArray[y][x] === 1 && !visited.has(current)){
                clusters.push(dfs(binaryArray, x, y, visited))
            }
        }
    }
    return clusters.sort((a, b) => b.size - a.size || b.x - a.x || b.y - a.y);
}
//returns the centroid at the starting location {x, y, size}
function dfs(image, startX, startY, visited){
    let totalX = 0;
    let totalY = 0;
    let size = 0;
    const stack = [[startX, startY]];

    while(stack.length > 0){
        const [x, y] = stack.pop();
        const current = `${x} ${y}`;
        if(visited.has(current)) continue;
        visited.add(current);
        totalX += x;
        totalY += y;
        size++;
        for(let next of possibleMoves(image, x, y)) stack.push(next);
    }
    const avgX = Math.floor(totalX / size);
    const avgY = Math.floor(totalY / size);

    return {x: avgX, y: avgY, size};
}

//returns a list of valid moves at current x and y [[x, y]]
function possibleMoves(image, currX, currY){
    const moves = [];
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    for(let dir of directions){
        const x = currX + dir[0];
        const y = currY + dir[1];
        if(y < 0 || y >= image.length || x < 0 || x >= image[0].length) continue;
        if(image[y][x] === 0) continue;
        moves.push([x, y]);
    }

    return moves;
}

