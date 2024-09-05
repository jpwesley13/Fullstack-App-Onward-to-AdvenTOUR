import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Trainer from "./components/Trainer";

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
            }
        ]
    }
];

export default routes;