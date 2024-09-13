import { useEffect, useState } from "react";

function useAverage(reviews, property) {
    const [averages, setAverages] = useState({});

    useEffect(() => {
        const calculateAverage = (id) => {
            const filteredReviews = reviews.filter(review => review.habitat_id === id);
            const propertyArray = filteredReviews.map(review => review[property]);
            const sum = propertyArray.reduce((acc, curr) => acc + curr, 0);
            const average = sum / propertyArray.length;
            return parseFloat(average.toFixed(2));
        };

        const calculatedAverages = {};
        reviews.forEach(review => {
            if (!calculatedAverages[review.habitat_id]) {
                calculatedAverages[review.habitat_id] = calculateAverage(review.habitat_id);
            }
        });

        setAverages(calculatedAverages);
    }, [reviews, property]);

    return averages;
}

export default useAverage;