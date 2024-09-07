import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Trainer from "./pages/Trainer";
import Sightings from "./pages/Sightings";
import Habitat from "./pages/Habitat";
import Review from "./pages/Review";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/trainers",
                element: <Trainer />
            },
            {
                path: "/sightings",
                element: <Sightings />
            },
            {
                path: "/habitats/:id",
                element: <Habitat />,
            },
            {
                path: "reviews/:id",
                element: <Review />
            }
        ]
    }
];

export default routes;