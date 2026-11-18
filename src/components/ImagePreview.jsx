import { useEffect, useRef } from "react";
import { writeCanvas } from "image-js";

export default function ImagePreview({image}){
    const canvasRef = useRef(null); 
    useEffect(() => {
        const canvas = canvasRef.current;
        writeCanvas(image, canvas); 
    }, [image]);
    
    return(
        <div className="image-preview">
            <canvas ref={canvasRef} aria-label="Preview Image" />
        </div>
    )
}