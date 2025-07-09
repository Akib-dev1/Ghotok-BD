import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const ViewBiodata = () => {
  const [open, setOpen] = useState(false);

  const biodata = {
    type: "Male",
    name: "Akib Rahman",
    image: "https://i.ibb.co/rRjS0tzF/image.png",
    dob: "2000-01-01",
    height: "5ft 8in",
    weight: "65kg",
    age: 25,
    occupation: "Engineer",
    race: "Fair",
    father: "Abdul Rahman",
    mother: "Fatema Rahman",
    permanentDivision: "Dhaka",
    presentDivision: "Chattagra",
    partnerAge: 22,
    partnerHeight: "5ft 4in",
    partnerWeight: "55kg",
    email: "akibanj2017@gmail.com",
    mobile: "+8801985326982",
  };

  const fieldClass =
    "bg-[#FFF3F5] p-4 rounded-lg shadow-sm border mb-4 last:mb-0";

  const labelClass = "text-sm mb-1 font-semibold text-[#B72B48]";
  const valueClass = "text-base text-gray-800";

  return (
    <section className="min-h-screen bg-[#FFF3F5] py-12">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:w-11/12 mx-auto bg-white rounded-xl shadow-xl border border-gray-200 p-10">
        <h2 className="text-4xl font-bold text-[#D33454] mb-10 text-center great-vibes">
          Your Biodata Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left two columns with fields */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={fieldClass}>
              <p className={labelClass}>Biodata Type</p>
              <p className={valueClass}>{biodata.type}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Full Name</p>
              <p className={valueClass}>{biodata.name}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Date of Birth</p>
              <p className={valueClass}>{biodata.dob}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Height</p>
              <p className={valueClass}>{biodata.height}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Weight</p>
              <p className={valueClass}>{biodata.weight}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Age</p>
              <p className={valueClass}>{biodata.age}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Occupation</p>
              <p className={valueClass}>{biodata.occupation}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Race</p>
              <p className={valueClass}>{biodata.race}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Father's Name</p>
              <p className={valueClass}>{biodata.father}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Mother's Name</p>
              <p className={valueClass}>{biodata.mother}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Permanent Division</p>
              <p className={valueClass}>{biodata.permanentDivision}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Present Division</p>
              <p className={valueClass}>{biodata.presentDivision}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Expected Partner Age</p>
              <p className={valueClass}>{biodata.partnerAge}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Expected Partner Height</p>
              <p className={valueClass}>{biodata.partnerHeight}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Expected Partner Weight</p>
              <p className={valueClass}>{biodata.partnerWeight}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Contact Email</p>
              <p className={valueClass}>{biodata.email}</p>
            </div>
            <div className={fieldClass}>
              <p className={labelClass}>Mobile Number</p>
              <p className={valueClass}>{biodata.mobile}</p>
            </div>
          </div>

          {/* Right column with image and button */}
          <div className="w-full flex flex-col items-center order-first lg:order-last">
            <img
              src={biodata.image}
              alt="Profile"
              className="rounded-xl shadow-lg w-full max-w-xs mb-6 border border-gray-200"
            />
            <Button
              onClick={() => setOpen(true)}
              className="bg-[#D33454] hover:bg-[#b72b48] text-white text-lg px-6 py-3 rounded-md"
            >
              Make Biodata Premium
            </Button>
          </div>
        </div>

        {/* Premium Confirmation Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="rounded-lg max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#D33454] text-xl font-bold">
                Confirm Premium Upgrade
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to make your biodata premium?
            </DialogDescription>
            <DialogFooter className="mt-6 flex justify-end gap-4">
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                className="border-[#D33454] text-[#D33454]"
              >
                Cancel
              </Button>
              <Button className="bg-[#D33454] text-white hover:bg-[#b72b48]">
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
