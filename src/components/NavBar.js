import CartWidget from "./CartWidget";

const NavBar = () => {
    return (
        <div className="navbar">
            <span className="navbar__brand">Brand</span>
            <div className="navbar__container">
                <nav className="navbar__links">
                    <a href="#root">link</a>
                    <a href="#root">link</a>
                    <a href="#root">link</a>
                    <a href="#root">link</a>
                </nav> 
                <CartWidget/>
            </div> 
        </div>
    )
}

export default NavBar;