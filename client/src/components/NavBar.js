import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
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
        </nav>
    );
};

export default NavBar;