import { AuthContext } from "@/Contexts/AuthProvidor";
import { Elements } from "@stripe/react-stripe-js";
import React, { use } from "react";
import { Link, useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/Components/ReUsable Components/CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ScaleLoader } from "react-spinners";

const stripePromise = loadStripe(import.meta.env.VITE_PK);

const Checkout = () => {
  const param = useParams();
  const { user } = use(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["biodata"],
    queryFn: async () => {
      const response = await axios.get(`https://b11a12-server-side-akib-dev1.vercel.app/biodata`);
      return response.data;
    },
  });
  const biodata = data?.find((item) => item.biodataID == param.id);
  if (!biodata) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Biodata not found!</h1>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ScaleLoader barCount={6} color="#ff1d8d" height={50} width={4} />
      </div>
    );
  }
  return (
    <section className="bg-[#FFF3F5] min-h-screen py-10">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-pink-100">
          <h1 className="text-3xl font-bold text-center text-[#D33454] mb-4">
            Checkout for Biodata ID:{" "}
            <span className="font-semibold text-gray-700">
              {biodata?.biodataID}
            </span>
          </h1>

          <h2 className="text-xl text-center text-gray-700 mb-6">
            Your Email: <span className="font-semibold">{user.email}</span>
          </h2>

          <div className="flex justify-center">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                biodataID={biodata?.biodataID}
                mobile={biodata?.mobile}
                email={biodata?.email}
                name={biodata?.name}
              />
            </Elements>
          </div>
          <Link
            to={`/biodatas/${param.id}`}
            className="mt-6 inline-block text-center text-sm text-[#D33454] px-3 py-2 rounded-lg border border-[#D33454] hover:bg-[#D33454] hover:text-white transition duration-200"
          >
            Back to Biodata
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
