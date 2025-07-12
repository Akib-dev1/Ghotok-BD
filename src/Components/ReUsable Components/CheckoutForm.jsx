import { AuthContext } from "@/Contexts/AuthProvidor";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";

const CheckoutForm = ({ biodataID, mobile, email, name }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const [errorz, setErrorz] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:5000/create-payment-intent", {
        amount: 5,
      })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      });
  }, []);

  const handleSubmit = async (event) => {
    setProcessing(true);
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorz(error.message);
      setProcessing(false);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setErrorz(null);
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });
    if (result.error) {
      setErrorz(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setErrorz(null);
        const paymentData = {
          requestedBy: user?.displayName,
          biodataName: name,
          biodataMobile: mobile,
          biodataEmail: email,
          email: user?.email,
          biodataID: biodataID,
          amount: 5,
          paymentID: result?.paymentIntent?.id,
          status: "pending",
        };
        axios
          .post("http://localhost:5000/biodata/contact", paymentData)
          .then(() => {
            Swal.fire({
              title: "Payment successful!",
              text: "Your request has been submitted.",
              icon: "success",
            });
            navigate(`/biodatas/${biodataID}`);
          });
      } else {
        setErrorz("Payment failed. Please try again.");
      }
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-md space-y-5 border border-gray-200"
    >
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Card Details
        </label>
        <CardElement
          className="min-w-full bg-[#FFF3F5] p-4 rounded-lg shadow-inner border border-pink-200"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                fontFamily: "Poppins, sans-serif",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#e53e3e",
              },
            },
          }}
        />
      </div>
      {errorz && (
        <div className="text-red-600 text-sm mt-2">
          <p>{errorz}</p>
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-[#D33454] text-white py-2 px-4 rounded-lg text-sm font-semibold shadow hover:bg-[#b92b46] transition duration-200"
      >
        {processing ? (
          <PulseLoader size={10} color="#7dc1b4" />
        ) : (
          "Pay $5 and Request Info"
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
