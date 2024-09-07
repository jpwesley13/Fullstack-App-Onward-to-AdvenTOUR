import { Link } from "react-router-dom";

function HabitatCard({habitat, dangerAverage}) {

    const {name, image, id} = habitat

    function dangerIcon(id) {
        if(dangerAverage(id) <= 2) {
            return "✿"
        }
        else if(2 < dangerAverage(id) && dangerAverage(id) <= 4) {
            return "🗲"
        }
        else if(4 < dangerAverage(id)) {
            return "☠"
        }
    }

    return (
        <div className="card">
            <h2>{name}</h2>
            <img 
              src={`https://picsum.photos/200/?random=${id}`}
              alt={name}
              className="habitat-card"  
            />
            <span>Danger level: {dangerAverage(id)} {dangerIcon(id)}</span>
            <Link to={`/habitats/${id}`}>Details</Link>
        </div>
    );
};

export default HabitatCard;