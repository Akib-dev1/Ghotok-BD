import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";
import { AuthContext } from "@/Contexts/AuthProvidor";

const BioDataDetails = () => {
  const auth = use(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [contactData, setContactData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/users").then((response) => {
      setUser(response?.data);
    });
    axios.get("http://localhost:5000/biodata/favorite").then((response) => {
      setFavorite(response?.data);
    });
    axios.get("http://localhost:5000/biodata/contact").then((response) => {
      setContactData(response?.data);
    });
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["biodatass"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/biodata");
      return response?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader color="#D33454" />
      </div>
    );
  }

  const biodata = data?.find((item) => item.biodataID == id);

  const userData = user?.find((item) => item.email === auth?.user?.email);

  const favoriteData = favorite?.find(
    (item) =>
      item.biodataID === biodata?.biodataID && item.email === auth?.user?.email
  );

  const contactDataItem = contactData?.find(
    (item) =>
      item.biodataID === biodata?.biodataID && item.email === auth?.user?.email
  );

  const myBiodata = biodata.email === auth?.user?.email;

  if (!biodata) {
    return (
      <div className="text-center text-lg text-gray-600 mt-10">
        Biodata not found.
      </div>
    );
  }
  const isPremium = userData?.isPremium;
  const isAdmin = userData?.role === "admin";

  const similarBiodatas = data
    ?.filter(
      (item) =>
        item.type === biodata.type && item.biodataID !== biodata.biodataID
    )
    .slice(0, 3);

  const handleAddToFavourites = async () => {
    const profileData = {
      name: biodata.name,
      email: auth?.user?.email,
      biodataID: biodata.biodataID,
      permanentAddress: biodata.permanentDivision,
      occupation: biodata.occupation,
    };
    const { data } = await axios.post(
      "http://localhost:5000/biodata/favorite",
      profileData
    );
    if (data.insertedId) {
      Swal.fire({
        title: "Added to Favourites!",
        icon: "success",
      });
    }
  };

  return (
    <section className="min-h-screen py-10 px-4  bg-[#FFF3F5]">
      <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-lg border">
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={biodata?.profileImage}
            alt={biodata?.name}
            className="w-40 h-40 rounded-full object-cover border-2 border-[#E3D4B4]"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#D33454]">
              {biodata?.name}
            </h2>
            <p className="text-gray-700 mb-2">
              Biodata ID: {biodata?.biodataID}
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
              <p>Type: {biodata?.type}</p>
              <p>Age: {biodata?.age}</p>
              <p>Height: {biodata?.height}</p>
              <p>Weight: {biodata?.weight}</p>
              <p>Occupation: {biodata?.occupation}</p>
              <p>Race: {biodata?.race}</p>
              <p>Date of Birth: {biodata?.dob}</p>
              <p>Father's Name: {biodata?.father}</p>
              <p>Mother's Name: {biodata?.mother}</p>
              <p>Present Division: {biodata?.presentDivision}</p>
              <p>Permanent Division: {biodata?.permanentDivision}</p>
              <p>Expected Partner Age: {biodata?.partnerAge}</p>
              <p>Expected Partner Height: {biodata?.partnerHeight}</p>
              <p>Expected Partner Weight: {biodata?.partnerWeight}</p>
              {(isPremium || myBiodata || isAdmin) && (
                <>
                  <p>Email: {biodata?.email}</p>
                  <p>Mobile: {biodata?.mobile}</p>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              {isAdmin ||
                (!favoriteData ? (
                  !myBiodata && (
                    <Button
                      className="bg-[#D33454] text-white hover:bg-[#b72b48] cursor-pointer"
                      onClick={handleAddToFavourites}
                    >
                      Add to Favourites
                    </Button>
                  )
                ) : (
                  <Button className="bg-[#D33454] text-white hover:bg-[#b72b48] cursor-pointer">
                    Added to Favourites
                  </Button>
                ))}
              {!isAdmin && !isPremium && !myBiodata && !contactDataItem && (
                <Button
                  className={"cursor-pointer"}
                  variant="outline"
                  onClick={() =>
                    navigate(`/biodatas/checkout/${biodata.biodataID}`)
                  }
                >
                  Request Contact Info
                </Button>
              )}

              {!isAdmin &&
                !isPremium &&
                !myBiodata &&
                contactDataItem?.status === "pending" && (
                  <Button
                    variant="outline"
                    disabled
                    className="cursor-not-allowed opacity-60"
                  >
                    Request Pending
                  </Button>
                )}

              {!isPremium &&
                !myBiodata &&
                contactDataItem?.status === "approved" && (
                  <p className="text-green-600 font-medium mt-2 flex items-center gap-1">
                    <span className="text-lg">✔</span> Contact Info Approved
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Biodatas */}
      {similarBiodatas.length > 0 && (
        <div className="mt-12 max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold text-[#D33454] mb-6">
            Similar {biodata.type} Biodatas
          </h3>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {similarBiodatas?.map((user) => (
              <div
                key={user._id}
                className="bg-white p-4 rounded-lg shadow-md border hover:shadow-lg transition"
              >
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-24 h-24 mx-auto rounded-full border-2 border-[#E3D4B4] object-cover mb-4"
                />
                <div className="text-center text-sm text-gray-600">
                  <p className="font-semibold text-[#B72B48]">{user.name}</p>
                  <p>Age: {user.age}</p>
                  <p>Division: {user.presentDivision}</p>
                  <p>Occupation: {user.occupation}</p>
                  <Button
                    onClick={() => navigate(`/biodatas/${user.biodataID}`)}
                    className="mt-3 w-full bg-[#D33454] hover:bg-[#b72b48] text-white text-sm cursor-pointer"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default BioDataDetails;
