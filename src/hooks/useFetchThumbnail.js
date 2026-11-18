import { fetchURL } from "image-js";
import { useEffect, useState } from "react";

export default function useFetchThumbnail(videoPath) {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        async function loadThumbnail() {
            setLoading(true);
            setError(null);

            try {
                // fetchURL does not return a response, it returns the image itself
                const image = await fetchURL(`http://localhost:4002/thumbnail/${videoPath}`);
                if (!ignore) setImage(image);
            } catch (e) {
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

    return {image, loading, error}
}