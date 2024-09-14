import { Link } from "react-router-dom";
import { useAuth } from "../context and hooks/AuthContext";

function ProfileCard({sighting}) {

    const {name, image, id, habitat, trainer: user} = sighting;
    const {trainer} = useAuth();

    return (
        <div className="profile-card">
            <Link to={`/sightings/${id}`}><h2>{name}</h2>
            <img 
              src={image}
              alt={name}
              className="habitat-card"  
            />
            </Link>  
        {trainer.id === parseInt(user.id) && (
            <div className="profile-sighting">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        )}
        </div>
    );
};

export default ProfileCard;