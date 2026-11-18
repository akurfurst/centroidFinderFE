import { useEffect, useState } from "react";
import Controls from "../components/Controls.jsx";
import ImagePreview from "../components/ImagePreview.jsx";
import { fetchURL } from "image-js";
import toBinaryImage from "../BinaryImage/toBinaryImage.js";
import Preview from "../components/Preview.jsx";

export default function PreviewPage({ videoPath }) {
    const [image, setImage] = useState(null);
    const [color, setTargetColor] = useState("#000000");
    const [threshold, setThreshold] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get image
    useEffect(() => {
        let ignore = false;
        async function loadThumbnail() {
            setLoading(true);
            setError(null);

            try {
                // fetchURL does not return a response, it returns the image itself
                const image = await fetchURL(`http://localhost:4002/thumbnail/${videoPath}`);
                if (!ignore) setImage(image);
            } catch(e) {
                console.error(e);
                if (!ignore) setError(e.message);
            } finally {
                if (!ignore) setLoading(false);
            }
        }

        loadThumbnail();

        // Abort
        return () => {
            ignore = false;
        }
    }, [videoPath])

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