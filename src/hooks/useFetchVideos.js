import { useEffect, useState } from "react";

/**
 * Makes a GET request to the back-end for processable videos.
 * 
 * 
 * @typedef {object} FetchStatus
 * @property {Array} videos A list of processable videos
 * @property {boolean} loading Whether a request is in progress
 * @property {string | null} error The error message, or null if no error has occurred
 *  
 * @returns {FetchStatus} The status and result of the GET request
 */
export default function useFetchVideos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        async function load() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/videos`);
                if (!response.ok) throw new Error("Failed to get videos");
                const data = await response.json();
                if (!ignore) setVideos(data);
            } catch (e) {
                console.error(e);
                if (!ignore) setError(e.message);
            } finally {
                if (!ignore) setLoading(false);
            }
        }

        load();

        // Abort
        return () => {
            ignore = false;
        }
    }, [])

    return {videos, loading, error}
}