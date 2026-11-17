export default function distance(colorA, r, g, b){
    const rgb1 = toRGB(colorA);
    //sqrt((r1 - r2)^2 + (g1 - g2)^2 + (b1 - b2)^2)
    return Math.sqrt(Math.pow((rgb1.red - r), 2) + Math.pow((rgb1.green - g), 2) + Math.pow((rgb1.blue - b), 2))
}

function toRGB(color){
    const MASK = 0x0000FF;
    const blue = color & MASK;
    const green = (color >> 8) & MASK;
    const red = (color >> 16) & MASK;
    return {red, green, blue};
}