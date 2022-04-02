import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
    const { logOut } = useAuth();
    
    const handleLogOut = async () => await logOut(); 

    return (
        <header className="navbar">
            <Link to="/" className="navbar__brand"><span>oG</span>Go</Link>
            <div className="navbar__container">
                <nav className="navbar__links">
                    <Link to="/platform/pc">PC</Link>
                    <Link to="/platform/ps">Playstation</Link>
                    <Link to="/platform/nintendo">Nintendo</Link>
                    <Link to="/platform/xbox">Xbox</Link>
                </nav> 
                <CartWidget/>
                
                <FontAwesomeIcon
                    className="navbar__logoutIcon" 
                    onClick={handleLogOut} 
                    icon="fa-solid fa-right-from-bracket" 
                />
            </div> 
        </header>
    )
}

export default NavBar;