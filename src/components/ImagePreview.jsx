import { useEffect, useRef } from "react";
import toBinaryImage from "../BinaryImage/toBinaryImage";
import { writeCanvas } from "image-js";

export default function ImagePreview({imagePath, color, threshold}){
    const canvasRef = useRef(null); 
    useEffect(() => {
    const canvas = canvasRef.current;

    async function showImage() {
        const image = await toBinaryImage('moving-centroid.mp4', parseInt(color.slice(1), 16), threshold); 
        writeCanvas(image, canvas); 
    }

    showImage().catch(console.error);
    }, [threshold, color]);
    
    return(
        <div className="image-preview">
            <canvas ref={canvasRef} aria-label="Binary image" />
        </div>
    )
}