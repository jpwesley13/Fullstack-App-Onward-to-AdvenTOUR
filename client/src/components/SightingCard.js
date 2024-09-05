import { Link } from "react-router-dom";

function SightingCard({sighting}) {

    const {name, image, id} = sighting

    return (
        <div className="card">
            <h2>{name}</h2>
            <img 
              src={`https://picsum.photos/200/?random=${id}`}
              alt={name}
              className="habitat-card"  
            />
            <Link to={`/sightings/${id}`}>Details</Link>
        </div>
    );
};

export default SightingCard