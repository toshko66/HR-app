import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div className="bg-gray-100 text-center flex justify-center items-center h-screen">
      <div>
        <h1 className="text-6xl font-bold text-red-500">500</h1>
        <p className="text-2xl mt-4">Something went wrong on our end. Please try again later.</p>
        <Link to="/" className="mt-8 inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default ServerError;
