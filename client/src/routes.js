import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";

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
        ]
    }
];

export default routes;