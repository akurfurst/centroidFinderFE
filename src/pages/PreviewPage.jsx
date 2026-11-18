import { useEffect, useState } from "react";
import Controls from "../components/Controls.jsx";
import ImagePreview from "../components/ImagePreview.jsx";
import { fetchURL } from "image-js";
import toBinaryImage from "../BinaryImage/toBinaryImage.js";

export default function PreviewPage({ videoPath }) {
    const [image, setImage] = useState(null);
    const [color, setTargetColor] = useState("#000000");
    const [threshold, setThreshold] = useState(0);

    // Get image
    useEffect(() => {
        async function loadThumbnail() {
            // fetchURL does not return a response, it returns the image itself
            const image = await fetchURL(`http://localhost:4002/thumbnail/${videoPath}`);

            setImage(image);
        }

        loadThumbnail()

        return () => {
            // Needs to abort here
        }
    }, [videoPath])

    // Make binarized image, only different on render.
    const hexColor = parseInt(color.slice(1), 16);
    const binarizedImage = (image == null) ? null : toBinaryImage(image, hexColor, threshold);

    return (
        <>
            <h1>Video Processor App</h1>
            <Controls setTargetColor={setTargetColor} threshold={threshold} setThreshold={setThreshold} />
            {image && <>
                <ImagePreview image={image} />
                <ImagePreview image={binarizedImage} />
            </>
            }
        </>
    )
}