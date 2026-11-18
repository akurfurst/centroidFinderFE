import useFetchVideos from "../hooks/useFetchVideos";

export default function Videos() {
    const { videos, loading, error } = useFetchVideos();

    if (loading) return (
        <p>Loading...</p>
    )

    if (error) return (
        <p>Error loading videos</p>
    )

    return (
        <>
            <h1>Videos</h1>
            <ul>
                {videos.length > 0 && videos.map((videoName,idx) => <li key={idx}>{videoName}</li>)}
            </ul>
        </>
    )
}