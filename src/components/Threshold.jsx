
// The limit of the slider, NOT the limit of the threshold.
const MAX_THRESHOLD = 256;


/**
 * 
 * @typedef {object} ThresholdProps
 * @property {number} threshold The threshold of the processor
 * @property {Function} setThreshold Sets the threshold
 *   
 * @returns {JSX.Element}
 */
export default function Threshold({ threshold, setThreshold }) {

    return (
        <div>
            <label htmlFor="threshold-slider">Threshold:</label>
            <input
                id="threshold-slider"
                type="range"
                min={0}
                max={MAX_THRESHOLD}
                value={threshold}
                onChange={event => setThreshold(event.target.value)}
            />
            <input 
                id="threshold-number"
                type="number"
                min={0}
                value={threshold}
                onChange={event => setThreshold(event.target.value)}
            />
        </div>
    )
}