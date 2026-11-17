import { fetchURL } from "image-js";
import distance from "./colorDistance";

export default async function toBinaryImage(imagePath, targetColor, threshold){
    const image = await fetchURL(`http://localhost:4002/thumbnail/${imagePath}`);
    const binaryArray = toBinaryArray(image, targetColor, threshold);
    console.log(binaryArray);
}

function toBinaryArray(image, targetColor, threshold){ 
    const binaryArray = [];

    for(let y = 0; y < image.height; y++){
        const row = [];
        for(let x = 0; x < image.width; x++){ 
            const [r, g, b] = image.getPixel(x, y);
            const colorDistance = distance(targetColor, r, g, b);
            row.push(colorDistance < threshold ? 1 : 0);
        }
        binaryArray.push(row);
    }

    return binaryArray;
}

function toImage(binaryArray){
    
}