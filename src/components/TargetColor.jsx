
/**
 * The controls for the TargetColor
 * 
 * @param {Function} setTargetColor The function that updates the TargetColor 
 * @returns {JSX.Element}
 */
export default function TargetColor({ setTargetColor }) {

    return (
        <div className="control">
            <label htmlFor="target-color">Target Color:</label>
            <input
                id="target-color"
                type="color"
                onChange={event => setTargetColor (event.target.value)}
            />
        </div>
    )
}