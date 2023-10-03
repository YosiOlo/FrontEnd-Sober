import React, { useState, useEffect } from "react";
import { getVendorInfo, putTax } from "../../../utils/ApiConfig";
import Swal from "sweetalert2";

function Tax() {
  const [businessName, setBusinessName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [address, setAddress] = useState("");
  const [dataSaved, setDataSaved] = useState(false);

  useEffect(() => {
    getVendorInfo()
      .then((data) => {
        setBusinessName(data?.vendor_info?.tax_info?.business_name || "");
        setTaxId(data?.vendor_info?.tax_info.tax_id || "");
        setAddress(data?.vendor_info?.tax_info.address || "");
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching vendor data:", error);
      });
  }, [dataSaved]);

  const handleSaveData = () => {
    const updatedData = {
      business_name: businessName,
      tax_id: taxId,
      address: address,
    };

    putTax(updatedData)
      .then((response) => {
        // Handle successful response
        console.log("Tax info updated successfully:", response);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
          })
          console.log("Data saved successfully", response);
          setDataSaved(true);
        })
      .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',error,
          })
          console.error("Data save failed", error);
      });
  };
  return (
    <div>
      <div className="space-y-2">
        <div className="mt-4">
          <label className="block font-medium">Business Name</label>
          <input
            className="border rounded px-3 py-2 w-full bg-white"
            type="text"
            value={businessName}
            placeholder="Business Name"
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Tax ID</label>
          <input
            className="border rounded px-3 py-2 w-full bg-white"
            type="text"
            value={taxId}
            placeholder="Tax ID"
            onChange={(e) => setTaxId(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <input
            className="border rounded px-3 py-2 w-full bg-white"
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
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

export default Tax;
