import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbutton">
                <NavLink
                to="/"
                >
                    Home
                </NavLink>
                <NavLink
                to="/trainers"
                >
                    Contributors
                </NavLink>
                <NavLink
                to="/sightings"
                >
                    Rare Sightings
                </NavLink>
            </div>
            <div className="navlogin">
                <NavLink
                to="/signup"
                >
                    Signup
                </NavLink>
            </div>
        </nav>
    );
};

export default NavBar;