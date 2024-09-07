import { Link } from "react-router-dom";

function HabitatCard({habitat, dangerAverage}) {

    const {name, image, id, reviews} = habitat

    return (
        <div className="card">
            <h2>{name}</h2>
            <img 
              src={`https://picsum.photos/200/?random=${id}`}
              alt={name}
              className="habitat-card"  
            />
            <span>Danger level: {dangerAverage(id)}</span>
            <Link to={`/habitats/${id}`}>Reviews</Link>
        </div>
    );
};

export default HabitatCard;