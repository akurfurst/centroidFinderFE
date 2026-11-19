import { useEffect, useState } from "react"

export default function useFetchStatusInterval({ jobId }) {
    const [status, setStatus] = useState("");
    const [result, setResult] = useState("");

    useEffect(() => {
        let fetchInterval = null;

        async function onInterval() {
            try {
                const response = await fetch(`/process/${jobId}/status`, { method: "GET" });
                if (!response.ok) throw new Error("Failed to fetch status: " + response);
                const { status, result, error } = await response.json();
                if (status) {
                    setStatus(status);
                    clearInterval(fetchInterval);
                    switch (status) {
                        // The processing is done
                        case "done":
                            setResult(result);
                            break;
                        // The processing failed
                        case "error":
                            console.error(error);
                            break;
                        // Still processing
                        case "processing": break;
                        // Only three valid statuses
                        default:
                            console.error("Received unknown status: " + status)
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }

        // Check every second if the file has finished processing
        fetchInterval = setInterval(onInterval, 1000);

        return () => clearInterval(fetchInterval);
    });

    return {status, result}
}