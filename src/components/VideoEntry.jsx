import { Link } from "react-router";

/**
 * A video available to preview.
 * Links to a PreviewPage with the video as a path parameter.
 * 
 * @param {string} name The video's name
 * @returns {JSX.Element}
 */
export default function VideoEntry({ name }) {
    return (
        <li>
            <Link to={`/videos/${name}`}>{name}</Link>
        </li>
    )
}