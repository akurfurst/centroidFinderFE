import { useState } from "react";
import { Link, useParams } from "react-router";

import useFetchThumbnail from "../hooks/useFetchThumbnail.js";
import useFetchStatusInterval from "../hooks/useFetchStatusInterval.js";
import toBinaryImage from "../BinaryImage/toBinaryImage.js";
import groupFinder from "../BinaryImage/groupFinder.js";

import Controls from "../components/Controls.jsx";
import ImagePreview from "../components/ImagePreview.jsx";
import Preview from "../components/Preview.jsx";
import ProcessButton from "../components/ProcessButton.jsx";

/**
 * The Page that shows the preview for processing a video
 * Contains the Preview, Controls, and ProcessButton
 * Stores state for the video processing
 * 
 * The video shown is determined by a Path Parameter.
 * 
 * @returns {JSX.Element}
 */
export default function PreviewPage() {
    const { videoPath } = useParams();
    const [color, setTargetColor] = useState("#000000");
    const [threshold, setThreshold] = useState(0);

    const [jobId, setJobId] = useState();
    const { status, setStatus, result } = useFetchStatusInterval(jobId);

    // Get image from back-end
    const { image, loading, error } = useFetchThumbnail(videoPath);

    // Convert the color into a hex string (RRGGBB) and number 
    const hexColor = color.slice(1);
    const numberColor = parseInt(color.slice(1), 16);
    // Create the binarizedImage
    const binarizedImage = (image == null) ? null : toBinaryImage(image, numberColor, threshold);

    // Get centroids to draw circle at largest centroid.
    const centroids = (image == null) ? null : groupFinder(image, numberColor, threshold);
    const largestCentroid = (centroids == null || centroids.length === 0) ? null : centroids[0];

    // Runs when Process video button is clicked
    async function handleClick(){
        try {
            const res = await fetch(`/process/${videoPath}?targetColor=${hexColor}&threshold=${threshold}`, { method: "POST"});
            if (!res.ok) throw new Error("Post failed: " + res.status);
            const { jobId } = await res.json();
            setJobId(jobId);
            setStatus("processing");

        } catch(e) {
            console.error(e);
        }
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
                <ProcessButton handleClick={handleClick}/>
                { status == "done" ? <a target="_blank" href={`http://localhost:4002${result}`}>Download CSV</a> 
                    : status == "error" ? <p>Error processing video, please try again.</p> 
                    : status == "processing" ? <p>Please wait, processing...</p> 
                    : null
                }
            </main>
        </>
    )
}