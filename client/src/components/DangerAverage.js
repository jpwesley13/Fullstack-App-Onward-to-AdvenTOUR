

function DangerAverage({ dangerAverage, id }) {

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
        <span>Danger level: {dangerAverage(id)}/5 {dangerIcon(id)}</span>
    )
}
export default DangerAverage;