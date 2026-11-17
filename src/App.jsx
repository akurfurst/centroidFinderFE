import { writeCanvas } from 'image-js';
import './App.css'
import toBinaryImage from './BinaryImage/toBinaryImage'
import { useEffect, useRef } from 'react';

function App() {
  const canvasRef = useRef(null); 
  useEffect(() => {
    const canvas = canvasRef.current;

    async function showImage() {
      const image = await toBinaryImage('moving-centroid.mp4', 0xFDA301, 162);
      writeCanvas(image, canvas);
    }

    showImage().catch(console.error);
  }, []);
  return (
    <>
      <h1>Video Processor App</h1>

       <canvas ref={canvasRef} aria-label="Binary image" />
    </>
  )
}

export default App
