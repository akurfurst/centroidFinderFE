import TargetColor from "./TargetColor";
import Threshold from "./Threshold";

export default function Controls({ setTargetColor, threshold, setThreshold }) {
    
    return (
        <div className="controls">
            <TargetColor setTargetColor={setTargetColor} />
            <Threshold threshold={threshold} setThreshold={ setThreshold} />
        </div>
    )
}