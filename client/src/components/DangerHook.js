import { useEffect, useState } from "react";

function useDangerAverage(reviews) {
    const [dangerAverages, setDangerAverages] = useState({});

    useEffect(() => {
        const dangerAverage = (id) => {
            const filteredReviews = reviews.filter(review => review.habitat_id === id);
            const dangerArray = filteredReviews.map(review => review.danger);
            const sum = dangerArray.reduce((acc, curr) => acc + curr, 0);
            const average = sum / dangerArray.length;
            return parseFloat(average.toFixed(2));
        };

        const averages = {};
        reviews.forEach(review => {
            if (!averages[review.habitat_id]) {
                averages[review.habitat_id] = dangerAverage(review.habitat_id);
            }
        });

        setDangerAverages(averages);
    }, [reviews]);

    return dangerAverages;
}

export default useDangerAverage;