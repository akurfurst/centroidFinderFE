import { Link } from "react-router";

export default function VideoEntry({ name }) {
    return (
        <li>
            <Link to={`/videos/${name}`}>{name}</Link>
        </li>
    )
}