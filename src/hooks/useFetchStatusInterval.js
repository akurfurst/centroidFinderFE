import { useEffect, useState } from "react"

/**
 * Periodically makes a GET request to the back-end, getting the status of the given jobId.
 * 
 * Clears interval on 'error', 'done' or an unknown status.
 * Does not set error on unknown status
 * Failed requests / network errors do not cancel
 * 
 * @param {string} jobId The UUID of the job to check
 * 
 * @typedef {object} JobStatus
 * @property {string} status The status of the job
 * @property {Function} setStatus Sets the status of the job
 * @property {string} result The output path of the job
 * 
 * @returns {JobStatus} The resulting job status
 */
export default function useFetchStatusInterval(jobId) {
    const [status, setStatus] = useState("");
    const [result, setResult] = useState("");
    
    useEffect(() => {
        if (!jobId) return;
        let fetchInterval = null;

        async function onInterval() {
            try {
                const response = await fetch(`/process/${jobId}/status`, { method: "GET" });
                if (!response.ok) throw new Error("Failed to fetch status: " + response);
                const { status, result, error } = await response.json();
                if (status) {
                    console.log(status);
                    setStatus(status);
                    switch (status) {
                        // The processing is done
                        case "done":
                            setResult(result);
                            clearInterval(fetchInterval);
                            break;
                        // The processing failed
                        case "error":
                            console.error(error);
                            clearInterval(fetchInterval);
                            break;
                        // Still processing
                        case "processing":
                            break;
                        // Only three valid statuses
                        default:
                            console.error("Received unknown status: " + status);
                            clearInterval(fetchInterval);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }

        // Check every second if the file has finished processing
        fetchInterval = setInterval(onInterval, 1000);

        return () => clearInterval(fetchInterval);
    }, [jobId]);

    return {status, setStatus, result}
}