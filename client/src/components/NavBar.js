import { NavLink, useNavigate } from "react-router-dom";

function NavBar( { trainer, setTrainer }) {

    const navigate = useNavigate();

    function handleLogout() {
        

        fetch('/logout', {
            method: 'DELETE'
        })
        .then(setTrainer(null))
        navigate('/')
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
                <button onClick={handleLogout}>
                    Logout
                </button>
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