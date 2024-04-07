import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-screen h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p className="text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="text-sm text-gray-500">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
