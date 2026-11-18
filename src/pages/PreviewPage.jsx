import { useState } from "react";
import { useParams } from "react-router";

import useFetchThumbnail from "../hooks/useFetchThumbnail.js";
import toBinaryImage from "../BinaryImage/toBinaryImage.js";

import Controls from "../components/Controls.jsx";
import ImagePreview from "../components/ImagePreview.jsx";
import Preview from "../components/Preview.jsx";

export default function PreviewPage() {
    const { videoPath } = useParams();
    const [color, setTargetColor] = useState("#000000");
    const [threshold, setThreshold] = useState(0);
    
    // Get image
    const {image, loading, error} = useFetchThumbnail(videoPath);

    // Make binarized image, only different on render.
    const hexColor = parseInt(color.slice(1), 16);
    const binarizedImage = (image == null) ? null : toBinaryImage(image, hexColor, threshold);

    return (
        <>
            <main>
                <h1>Video Processor App</h1>
                <Controls setTargetColor={setTargetColor} threshold={threshold} setThreshold={setThreshold} />
                <Preview loading={loading} error={error}>
                    <ImagePreview image={image} />
                    <ImagePreview image={binarizedImage} />
                </Preview>
            </main>
        </>
    )
}