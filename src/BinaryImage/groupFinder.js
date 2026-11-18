//returns a list of centroids as objects [{x, y, size}]
export default function groupFinder(image){
    const clusters = [];
    const visited = new Set();

    for(let y = 0; y < image.length; y++){
        for(let x = 0; x < image[0].length; x++){
            const current = `${x} ${y}`;
            if(!visited.has(current)){
                current.push(dfs(image, x, y, visited))
            }
        }
    }
    return clusters.sort((a, b) => b.size - a.size);
}
//returns the centroid at the starting location {x, y, size}
function dfs(image, startX, startY, visited){

}

//returns a list of valid moves at current x and y [[x, y]]
function possibleMoves(image, currX, currY){

}

