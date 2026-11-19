import { useEffect, useRef } from "react";
import { writeCanvas } from "image-js";


export default function ImagePreview({image, largestCentroid}){
    const canvasRef = useRef(null); 
    useEffect(() => {
        const canvas = canvasRef.current;
        writeCanvas(image, canvas)    

        //Draw circle around largest centroid
        if(!canvas || !largestCentroid){
            return
        }

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        writeCanvas(image, canvas);
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