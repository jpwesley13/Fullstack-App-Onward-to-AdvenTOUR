import { Link } from "react-router-dom";
import DangerAverage from "./DangerAverage";

function HabitatCard({habitat, dangerAverage}) {

    const {name, image, id} = habitat

    // function dangerIcon(id) {
    //     if(dangerAverage(id) <= 2) {
    //         return "✿"
    //     }
    //     else if(2 < dangerAverage(id) && dangerAverage(id) <= 4) {
    //         return "🗲"
    //     }
    //     else if(4 < dangerAverage(id)) {
    //         return "☠"
    //     }
    // }

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
            <Link to={`/habitats/${id}`}>Details</Link>
        </div>
    );
};

export default HabitatCard;