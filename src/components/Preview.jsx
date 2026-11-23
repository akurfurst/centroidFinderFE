
/**
 * A loading & error handler for image previews.
 * Updates according to the status of fetching a thumbnail on the PreviewPage
 * 
 * @typedof {object} PreviewProps
 * @param {boolean} loading
 * @param {boolean} error
 * @param {object} children The images to be previewed
 *  
 * @returns {JSX.Element}
 */
export default function Preview({loading, error, children }) {
    if (loading) return (
        <p>Loading...</p>
    )

    if (error) return (
        <p>Error finding thumbnail.</p>
    )

    return (
        <div className="preview">
            {children}
        </div>
    )
}