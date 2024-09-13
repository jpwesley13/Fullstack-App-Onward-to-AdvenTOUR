import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context and hooks/AuthContext";

function NavBar() {

    const navigate = useNavigate();
    const { trainer, setTrainer } = useAuth();

    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(() => {
            setTrainer(null);
            navigate('/');
        })
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