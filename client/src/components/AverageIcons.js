import { Star, StarHalf, StarOutline } from '@mui/icons-material';


function AverageIcons({ average, property }) {

    const starSize = {
        fontSize: '1em'
    };

    function getIcon(average) {
        if (property === "danger") {
            if (average <= 2) {
                return "✿";
            } else if (2 < average && average <= 4) {
                return "🗲";
            } else if (4 < average) {
                return "☠";
            }
        } else if (property === "rating") {
            if (average <= 2) {
                return <StarOutline className='icon-star' style={starSize}/>;
            } else if (2 < average && average <= 4) {
                return <StarHalf className='icon-star' style={starSize}/>;
            } else if (4 < average) {
                return <Star className='icon-star' style={starSize}/>
            }
        }
        return "";
    }

    if(property=== "rating") {
        return (
            <span>Rating: {average}/5 {getIcon(average)}</span>
        )
    }
    return (
        <span>Danger level: {average}/5 {getIcon(average)}</span>
    )
}

export default AverageIcons;