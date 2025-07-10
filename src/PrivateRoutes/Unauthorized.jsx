import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF3F5] font-poppins">
      <div className="text-center">
        <h1 className="text-4xl text-[#D33454] font-bold mb-4">
          403 - Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to view this page.
        </p>
        <Link to="/" className="bg-[#D33454] text-white py-2 px-4 rounded">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
