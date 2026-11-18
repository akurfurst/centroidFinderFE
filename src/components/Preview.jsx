
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