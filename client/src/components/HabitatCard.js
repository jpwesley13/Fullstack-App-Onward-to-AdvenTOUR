import { Link } from "react-router-dom";
import DangerAverage from "./DangerAverage";

function HabitatCard({habitat, dangerAverage, ratingAverage}) {

    const {name, image, id} = habitat

    return (
        <div className="card">
            <h2>{name}</h2>
            <img 
              src={image}
              alt={name}
              className="habitat-card"  
            />
            <DangerAverage
            id={id}
            dangerAverage={dangerAverage}/>
            {ratingAverage}/5
            <Link to={`/habitats/${id}`}>Details</Link>
        </div>
    );
};

export default HabitatCard;