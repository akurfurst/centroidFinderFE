
export default function Preview({loading, error, children }) {
    if (loading) return (
        <p>Loading...</p>
    )

    if (error) return (
        <p>Error finding thumbnail.</p>
    )

    return (
        <div>
            {children}
        </div>
    )
}