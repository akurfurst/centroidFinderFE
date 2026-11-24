import useFetchVideos from "../hooks/useFetchVideos";
import VideoEntry from "../components/VideoEntry";

/**
 * The page for showing every processable video
 * Videos are fetched from the back-end
 * 
 * Updates to show the page is either loading or failed to get the videos
 * 
 * Each video is created as a VideoEntry
 * 
 * @returns {JSX.Element}
 */
export default function Videos() {
    const { videos, loading, error } = useFetchVideos();

    if (loading) return (
        <p>Loading...</p>
    )

    if (error) return (
        <p>Error loading videos</p>
    )

    return (
        <main>
            <h1>Videos</h1>
            <div className="videos-container">
                <ul>
                    {videos.length > 0 && videos.map((videoName, idx) => <VideoEntry key={idx} name={videoName} />)}
                </ul>
            </div>
        </main>
    )
}