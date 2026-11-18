import { useState } from "react";
import Controls from "../components/Controls.jsx";
import ImagePreview from "../components/ImagePreview.jsx";

export default function PreviewPage() {
    const [color, setTargetColor] = useState("#000000");
    const [threshold, setThreshold] = useState(0);

    //test binary image

    return (
        <>
            <h1>Video Processor App</h1>
            <Controls setTargetColor={setTargetColor} threshold={threshold} setThreshold={setThreshold} />
            <ImagePreview imagePath={""} color={color} threshold={threshold} />
        </>
    )
}