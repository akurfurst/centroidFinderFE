import { useState } from "react";
import Controls from "../components/Controls.jsx";
import ImagePreview from "../components/ImagePreview.jsx";
import toBinaryImage from "../BinaryImage/toBinaryImage.js";
import Preview from "../components/Preview.jsx";
import useFetchThumbnail from "../hooks/useFetchThumbnail.js";

export default function PreviewPage({ videoPath }) {
    const [color, setTargetColor] = useState("#000000");
    const [threshold, setThreshold] = useState(0);
    
    // Get image
    const {image, loading, error} = useFetchThumbnail(videoPath);

    // Make binarized image, only different on render.
    const hexColor = parseInt(color.slice(1), 16);
    const binarizedImage = (image == null) ? null : toBinaryImage(image, hexColor, threshold);

    return (
        <>
            <h1>Video Processor App</h1>
            <Controls setTargetColor={setTargetColor} threshold={threshold} setThreshold={setThreshold} />
            <Preview loading={loading} error={error}>
                <ImagePreview image={image} />
                <ImagePreview image={binarizedImage} />
            </Preview>
        </>
    )
}