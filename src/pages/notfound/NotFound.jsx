import { Link } from "react-router-dom";
import './notFound.scss';
export default function NotFound() {
    return (
        <div className="notFound">
            <div className="wrapper">
            <h1  className="title">Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <Link to='/'>Home</Link>
            </div>
            
            
        </div>
    )
}