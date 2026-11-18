import { Image } from "image-js";
import distance from "./colorDistance";

export default function toBinaryImage(image, targetColor, threshold){
    const binaryArray = toBinaryArray(image, targetColor, threshold);
    const binaryImage = toImage(binaryArray);
    //console.log(targetColor);
    return binaryImage;
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
    const height = binaryArray.length;
    const width = binaryArray[0].length;
    const image = new Image(width, height, {colorModel: 'GREY', bitDepth: 8});
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            const brightness = binaryArray[y][x] === 1 ? 255 : 0;
            image.setPixel(x, y, [brightness]);
        }
    }
    return image

}