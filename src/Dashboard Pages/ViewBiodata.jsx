import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "@/Contexts/AuthProvidor";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const ViewBiodata = () => {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = use(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["biodata", user?.email],
    queryFn: async () => {
      const response = await axios.get(
        `https://b11a12-server-side-akib-dev1.vercel.app/biodata/${user?.email}`
      );
      return response.data;
    },
  });

  useEffect(() => {
    axios
      .get(
        `https://b11a12-server-side-akib-dev1.vercel.app/users/premium/${user?.email}`
      )
      .then((res) => {
        setDone(res.data?.isHandled);
      });
    axios
      .get(
        `https://b11a12-server-side-akib-dev1.vercel.app/users/${user?.email}`
      )
      .then((res) => {
        setUserData(res.data);
      });
  }, [user?.email]);

  const handleReqPremium = async () => {
    setOpen(false);
    const { data } = await axios.get(
      `https://b11a12-server-side-akib-dev1.vercel.app/users/${user?.email}`
    );
    try {
      await axios.post(
        "https://b11a12-server-side-akib-dev1.vercel.app/users/premium",
        data
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `${error.response.data.message}`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ScaleLoader barCount={6} color="#ff1d8d" height={50} width={4} />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFF3F5] dark:bg-[#121212] py-12 transition-colors duration-500">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto bg-white dark:bg-[#1F1F1F] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-10 transition-colors duration-500">
        <h2 className="text-4xl font-bold text-[#D33454] dark:text-[#FF5C7A] mb-10 text-center great-vibes">
          Your Biodata Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left two columns with fields */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Biodata Type", value: data?.type },
              { label: "Full Name", value: data?.name },
              { label: "Date of Birth", value: data?.dob },
              { label: "Height", value: data?.height },
              { label: "Weight", value: data?.weight },
              { label: "Age", value: data?.age },
              { label: "Occupation", value: data?.occupation },
              { label: "Race", value: data?.race },
              { label: "Father's Name", value: data?.father },
              { label: "Mother's Name", value: data?.mother },
              { label: "Permanent Division", value: data?.permanentDivision },
              { label: "Present Division", value: data?.presentDivision },
              { label: "Expected Partner Age", value: data?.partnerAge },
              { label: "Expected Partner Height", value: data?.partnerHeight },
              { label: "Expected Partner Weight", value: data?.partnerWeight },
              { label: "Contact Email", value: data?.email },
              { label: "Mobile Number", value: data?.mobile },
            ].map((field, idx) => (
              <div
                key={idx}
                className="bg-[#FFF3F5] dark:bg-[#2A2A2A] h-full w-full p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300"
              >
                <p className="text-sm mb-1 font-semibold text-[#B72B48] dark:text-[#FF5C7A]">
                  {field.label}
                </p>
                <p className="text-base text-gray-800 dark:text-gray-200">
                  {field.value || "N/A"}
                </p>
              </div>
            ))}
          </div>

          {/* Right column with image and button */}
          <div className="w-full flex flex-col items-center order-first lg:order-last">
            <img
              src={data?.profileImage}
              alt="Profile"
              className="rounded-xl shadow-lg w-full max-w-xs mb-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            />
            {!done && !userData?.isPremium ? (
              <Button
                onClick={() => setOpen(true)}
                className="bg-[#D33454] dark:bg-[#FF5C7A] hover:bg-[#b72b48] dark:hover:bg-[#FF3F70] text-white text-lg px-6 py-3 rounded-md cursor-pointer duration-200 transition-colors"
              >
                Make Biodata Premium
              </Button>
            ) : (
              <span className="bg-[#D33454] dark:bg-[#FF5C7A] text-white text-lg px-6 py-1.5 rounded-md">
                Premium Account
              </span>
            )}
          </div>
        </div>

        {/* Premium Confirmation Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="rounded-lg max-w-md bg-white dark:bg-[#1F1F1F] border border-gray-200 dark:border-gray-700 shadow-lg p-6 transition-colors duration-500">
            <DialogHeader>
              <DialogTitle className="text-[#D33454] dark:text-[#FF5C7A] text-xl font-bold">
                Confirm Premium Upgrade
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-gray-700 dark:text-gray-200 mt-2">
              Are you sure you want to make your biodata premium?
            </DialogDescription>
            <DialogFooter className="mt-6 flex justify-end gap-4">
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                className="border-[#D33454] dark:border-[#FF5C7A] text-[#D33454] dark:text-[#FF5C7A] cursor-pointer hover:bg-[#fdf1f2] dark:hover:bg-[#2A2A2A]"
              >
                Cancel
              </Button>
              <Button
                className="bg-[#D33454] dark:bg-[#FF5C7A] text-white hover:bg-[#b72b48] dark:hover:bg-[#FF3F70] cursor-pointer"
                onClick={handleReqPremium}
              >
                Yes, Make Premium
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ViewBiodata;
