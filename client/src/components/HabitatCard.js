import { Link } from "react-router-dom";
import AverageIcons from "./AverageIcons";

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
            <AverageIcons
            id={id}
            average={dangerAverage}
            property={'danger'}/>
            <AverageIcons
            id={id}
            average={ratingAverage}
            property={"rating"} />
            <Link to={`/habitats/${id}`}>Details</Link>
        </div>
    );
};

export default HabitatCard;