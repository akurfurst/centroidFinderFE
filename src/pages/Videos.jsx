import useFetchVideos from "../hooks/useFetchVideos";
import VideoEntry from "../components/VideoEntry";

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