import { NavLink } from "react-router-dom";

function NavBar( { trainer, setTrainer }) {

    function handleLogout() {
        console.log(trainer)
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(setTrainer(null))
        console.log(trainer)
    }

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
            {trainer ? (
                <NavLink to="/login" onClick={handleLogout}>
                    Logout
                </NavLink>
                ) : (
                <>
                    <NavLink to="/signup">Signup</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </>
            )}
        </div>
    </nav>
);
};

export default NavBar;