import { Link } from "react-router-dom";

function HabitatCard({habitat}) {

    const {name, image, id} = habitat

    return (
        <div className="card">
            <h2>{name}</h2>
            <img 
              src={`https://picsum.photos/200/?random=${id}`}
              alt={name}
              className="habitat-card"  
            />
            <Link to={`/habitats/${id}`}>Reviews</Link>
        </div>
    );
};

export default HabitatCard;