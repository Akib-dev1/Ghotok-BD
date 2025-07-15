import { Link } from "react-router";
import forbidden from "../assets/Forbidden.png";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF3F5] ">
      <div className="flex flex-col gap-6 items-center">
        <div className="max-w-4xl p-6">
          <img src={forbidden} alt="" className="rounded-2xl" />
        </div>
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
    </div>
  );
};

export default Unauthorized;
