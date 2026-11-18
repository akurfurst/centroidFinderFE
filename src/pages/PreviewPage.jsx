import { useState } from "react";
import Controls from "../components/Controls.jsx";
import { useEffect, useRef } from 'react';
import { writeCanvas } from 'image-js';
import toBinaryImage from "../BinaryImage/toBinaryImage.js";

export default function PreviewPage() {
    const [color, setTargetColor] = useState("#000000");
    const [threshold, setThreshold] = useState(0);

    //test binary image
    const canvasRef = useRef(null); 
      useEffect(() => {
        const canvas = canvasRef.current;
    
        async function showImage() {
          const image = await toBinaryImage('moving-centroid.mp4', parseInt(color.slice(1), 16), threshold); 
          writeCanvas(image, canvas); 
        }
    
        showImage().catch(console.error);
      }, [threshold, color]);

    return (
        <>
            <h1>Video Processor App</h1>
            <Controls setTargetColor={setTargetColor} threshold={threshold} setThreshold={setThreshold} />
            <canvas ref={canvasRef} aria-label="Binary image" />
        </>
    )
}