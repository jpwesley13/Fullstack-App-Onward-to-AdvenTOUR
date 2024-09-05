import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <main>
        <h1>You're in deep, uncharted territory now. Better play it safe and try another page!</h1>
      </main>
    </>
  );
}

export default ErrorPage;