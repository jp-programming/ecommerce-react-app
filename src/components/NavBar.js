import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="navbar">
            <Link to="/" className="navbar__brand">Brand</Link>
            <div className="navbar__container">
                <nav className="navbar__links">
                    <Link to="/platform/pc">PC</Link>
                    <Link to="/platform/ps">Playstation</Link>
                    <Link to="/platform/nintendo">Nintendo</Link>
                    <Link to="/platform/xbox">Xbox</Link>
                </nav> 
                <CartWidget/>
            </div> 
        </div>
    )
}

export default NavBar;