import { Image } from "image-js";
import distance from "./colorDistance";

/**
 * Converts an image into a binarized version.
 * 
 * @param {Image} image 
 * @param {number} targetColor 
 * @param {number} threshold 
 * @returns 
 */
export default function toBinaryImage(image, targetColor, threshold){
    const binaryArray = toBinaryArray(image, targetColor, threshold);
    const binaryImage = toImage(binaryArray);
    return binaryImage;
}

/**
 * Converts an image into a binary array
 * 
 * @param {Image} image 
 * @param {number} targetColor 
 * @param {number} threshold 
 * @returns a binary array
 */
export function getBinaryArray(image, targetColor, threshold){
    return toBinaryArray(image, targetColor, threshold);
}

/**
 * Converts an image into a binary array
 * 
 * @param {Image} image 
 * @param {number} targetColor 
 * @param {number} threshold 
 * @returns a binary array
 */
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

/**
 * Converts a binary array into an image
 * Values of 1 result in a Pure White (255,255,255) pixel
 * Values of 0 result in a Pure Black (000,000,000) pixel
 * 
 * @param {Array} binaryArray 
 * @returns a binary image
 */
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