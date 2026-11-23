/**
 * Finds the distance between two colors.
 * ColorA is represented as a hexadecimal number
 * ColorB is represented through three numbers, the red value the green value, and green value.
 * 
 * @param {number} colorA 
 * @param {number} r 
 * @param {number} g
 * @param {number} b
 * @returns 
 */
export default function distance(colorA, r, g, b){
    const rgb1 = toRGB(colorA);
    //sqrt((r1 - r2)^2 + (g1 - g2)^2 + (b1 - b2)^2)
    return Math.sqrt(Math.pow((rgb1.red - r), 2) + Math.pow((rgb1.green - g), 2) + Math.pow((rgb1.blue - b), 2))
}

/**
 * Converts a hexadecimal color to its red, green, and blue values
 * 
 * @param {number} color 
 * @returns an object with a red, green, and blue value
 */
function toRGB(color){
    const MASK = 0x0000FF;
    const blue = color & MASK;
    const green = (color >> 8) & MASK;
    const red = (color >> 16) & MASK;
    return {red, green, blue};
}