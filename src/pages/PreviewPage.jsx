import { useState } from "react";
import { Link, useParams } from "react-router";

import useFetchThumbnail from "../hooks/useFetchThumbnail.js";
import toBinaryImage from "../BinaryImage/toBinaryImage.js";

import Controls from "../components/Controls.jsx";
import ImagePreview from "../components/ImagePreview.jsx";
import Preview from "../components/Preview.jsx";
import groupFinder from "../BinaryImage/groupFinder.js";
import ProcessButton from "../components/ProcessButton.jsx";
import { useFetchPost } from "../hooks/useFetchPost.js";

export default function PreviewPage() {
    const { videoPath } = useParams();
    const [color, setTargetColor] = useState("#000000");
    const [threshold, setThreshold] = useState(0);

    const [url, setUrl] = useState(null);
    const {data, error: postError} = useFetchPost(url); 

    // Get image
    const { image, loading, error } = useFetchThumbnail(videoPath);

    // Make binarized image, only different on render.
    const hexColor = parseInt(color.slice(1), 16);
    const binarizedImage = (image == null) ? null : toBinaryImage(image, hexColor, threshold);

    // Get centroids to draw circle at largest centroid.
    const centroids = (image == null) ? null : groupFinder(image, hexColor, threshold);
    const largestCentroid = (centroids == null || centroids.length === 0) ? null : centroids[0];

    //handle process click
    function handleClick(){
        setUrl(`http://localhost:4002/process/${videoPath}?targetColor=${hexColor}&threshold=${threshold}`)
    }

    return (
        <>
            <main>
                <nav>
                    <Link to="/videos">Back</Link>
                </nav>
                <h1>Video Processor App</h1>
                <Preview loading={loading} error={error}>
                    <ImagePreview image={image} largestCentroid={largestCentroid} />
                    <ImagePreview image={binarizedImage} largestCentroid={largestCentroid} />
                </Preview>
                <Controls setTargetColor={setTargetColor} threshold={threshold} setThreshold={setThreshold} />
                <ProcessButton handelClick={handleClick}/>
                {postError && <p>Error: {postError}</p>}
            </main>
        </>
    )
}