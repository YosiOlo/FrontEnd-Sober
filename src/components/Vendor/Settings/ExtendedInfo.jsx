import React, { useState, useEffect } from "react";
import { putTax } from "../../../utils/ApiConfig";
import Swal from "sweetalert2";

function ExtendedInfo() {
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [Linkedin, setLinkedin] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    // const file = e.target.files[0];

    const image = fileRef.current.files[0];
    console.log(image);
    setSelectedImage(image);
  };

  const handleSaveData = () => {
    const updatedData = {
      business_name: businessName,
      tax_id: taxId,
      address: address,
    };

    putTax(updatedData)
      .then((response) => {
        console.log("Tax info updated successfully:", response);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Data saved successfully", response);
        setDataSaved(true);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          error,
        });
        console.error("Data save failed", error);
      });
  };
  return (
    <div>
      <div className="mt-5">
        <label className="block font-medium">Cover Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="card border-2 rounded-sm mt-5 p-4">
        <h1 className="font-bold text-[16px] text-blue-500 ">Socials</h1>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block font-medium">Facebook</label>
            <input
              className="border rounded px-3 py-2 w-full bg-white"
              type="text"
              value={"https://www.facebook.com/"+facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Twitter</label>
            <input
              className="border rounded px-3 py-2 w-full bg-white"
              type="text"
              value={"https://www.twitter.com/"+twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-5">
          <div className="w-1/2">
            <label className="block font-medium">Instagram</label>
            <input
              className="border rounded px-3 py-2 w-full bg-white"
              type="text"
              value={"https://www.instagram.com/"+instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Youtube</label>
            <input
              className="border rounded px-3 py-2 w-full bg-white"
              type="text"
              value={"https://www.youtube.com/"+youtube}
              onChange={(e) => setYoutube(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="block font-medium">Linkedin</label>
          <input
            className="border rounded px-3 py-2 w-full bg-white"
            type="text"
            value={"https://www.linkedin.com/"+Linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
      </div>

      <button
        className="bg-[#80bc00] text-white px-4 py-2 rounded mt-9"
        onClick={handleSaveData}
      >
        Save Settings
      </button>
    </div>
  );
}

export default ExtendedInfo;
