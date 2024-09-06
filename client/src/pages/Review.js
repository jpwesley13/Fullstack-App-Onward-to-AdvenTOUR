import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Review() {
    const params = useParams();
    const {reviews} = useOutletContext();
}