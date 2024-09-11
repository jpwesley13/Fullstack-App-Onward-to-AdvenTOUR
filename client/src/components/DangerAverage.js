function DangerAverage({ dangerAverage }) {
    function dangerIcon(dangerAverage) {
        if(dangerAverage <= 2) {
            return "✿"
        }
        else if(2 < dangerAverage && dangerAverage <= 4) {
            return "🗲"
        }
        else if(4 < dangerAverage) {
            return "☠"
        }
    }

    return (
        <span>Danger level: {dangerAverage}/5 {dangerIcon(dangerAverage)}</span>
    )
}

export default DangerAverage;