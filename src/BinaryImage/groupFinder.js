import { getBinaryArray } from "./toBinaryImage";

/**
 * Finds a list of Groups
 * Groups are represented as an object 
 * where x and y represent the location of the group, 
 * and size represents the size of the group.
 * 
 * Expects a hexadecimal number for targetColor
 * 
 * @param {import('image-js').Image} image The image to find the groups of 
 * @param {number} targetColor A hexadecimal target color
 * @param {number} threshold The maximum distance a color can be from the target (exclusive)
 * @returns list of groups
 */
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
/**
 * 
 * Returns a new group from a starting x and y value.
 * 
 * @param {Array} image A binary array
 * @param {number} startX The starting x value of the array
 * @param {number} startY The starting y value of the array
 * @param {Set} visited The visited coordinates
 * @returns the group at the starting location 
 */
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
    // Find the Centroid of the group
    const avgX = Math.floor(totalX / size);
    const avgY = Math.floor(totalY / size);

    return {x: avgX, y: avgY, size};
}

/**
 * Returns a list of valid x and y coordinates adjacent to the given.
 * 
 * @param {Array} image A binary array
 * @param {number} currX The current x
 * @param {number} currY The current y
 * @returns the valid moves adjacent to the current.
 */
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

