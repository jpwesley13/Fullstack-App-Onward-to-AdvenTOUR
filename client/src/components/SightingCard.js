import { Link } from "react-router-dom";

function SightingCard({sighting}) {

    const {name, image, id, habitat} = sighting

    return (
        <div className="card">
            <Link to={`/sightings/${id}`}><h2>{name}</h2>
            <img 
              src={`https://picsum.photos/200/?random=${id}`}
              alt={name}
              className="habitat-card"  
            />
            </Link>
            <span>{habitat.name}</span>
        </div>
    );
};

export default SightingCard