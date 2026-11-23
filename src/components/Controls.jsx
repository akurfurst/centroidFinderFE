import TargetColor from "./TargetColor";
import Threshold from "./Threshold";

/**
 * The Controls for the Preview
 * Has a TargetColor and Threshold
 * 
 * @typedef {object} ControlsProps
 * @property {Function} setTargetColor Sets the targetColor
 * @property {number} threshold The current threshold
 * @property {Function} setThreshold Sets the threshold
 * 
 * @param {ControlsProps} props
 * @returns {JSX.Element}
 */
export default function Controls({ setTargetColor, threshold, setThreshold }) {
    
    return (
        <div className="controls">
            <TargetColor setTargetColor={setTargetColor} />
            <Threshold threshold={threshold} setThreshold={ setThreshold} />
        </div>
    )
}