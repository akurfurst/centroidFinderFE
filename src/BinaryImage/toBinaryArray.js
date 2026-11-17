import distance from './colorDistance';

export default function toBinaryArray(image, targetColor, threshold){
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