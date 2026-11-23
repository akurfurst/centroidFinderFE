import { useEffect, useRef } from "react";
import { writeCanvas } from "image-js";


/**
 * Shows an image, placing a circle over the centroid of the largest group
 * 
 * @typedef {object} Group
 * @property {number} x
 * @property {number} y
 * @property {number} size
 * 
 * @typedef {object} ImageProps
 * @property {import('image-js').Image} image The image to show on the canvas
 * @property {Group} largestCentroid The largest group
 * 
 * @param {ImageProps} props
 * @returns {JSX.Element}
 */
export default function ImagePreview({image, largestCentroid}){
    const canvasRef = useRef(null); 
    useEffect(() => {
        const canvas = canvasRef.current;
        writeCanvas(image, canvas)    

        if(!canvas || !largestCentroid){
            return
        }
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        writeCanvas(image, canvas);
        // Draw circle around largest centroid
        ctx.beginPath();
        ctx.arc(largestCentroid.x, largestCentroid.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = '#199a19d8';
        ctx.lineWidth = 10;
        ctx.stroke();
    }, [image, largestCentroid]);

    return(
        <div className="image-preview">
            <canvas ref={canvasRef} aria-label="Preview Image" />
        </div>
    )
}