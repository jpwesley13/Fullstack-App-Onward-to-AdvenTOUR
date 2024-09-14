import { Link } from "react-router-dom";
import { useAuth } from "../context and hooks/AuthContext";

function SightingCard({sighting}) {

    const {name, image, id, habitat, trainer: user} = sighting;
    const {trainer} = useAuth();

    return (
        <div className="card">
            <Link to={`/sightings/${id}`}><h2>{name}</h2>
            <img 
              src={image}
              alt={name}
              className="habitat-card"  
            />
            </Link>
            <span>{habitat.name}</span>    
        {trainer.id === parseInt(user.id) && (
            <div className="profile-sighting">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        )}
        </div>
    );
};

export default SightingCard;