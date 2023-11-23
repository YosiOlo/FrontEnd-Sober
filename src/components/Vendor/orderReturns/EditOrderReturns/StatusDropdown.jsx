import React, { useState } from "react";
import axios from "axios";
import { putOrderReturns } from "../../../../utils/ApiConfig";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const StatusDropdown = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { id } = useParams();

  const handleStatusChange = (selectedStatus) => {
    setPaymentMethod(selectedStatus);
  };

  // bug canceled

  const handleSave = () => {
    const updatedData = {
      status: paymentMethod,
    };
    putOrderReturns(id, updatedData)
      .then((response) => {
        console.log("Order Return updated successfully:", response);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Data saved successfully", response);
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
    <div className="card bg-white rounded-md shadow-lg w-[700px] mt-6 p-4 break-words">
      <label className="block font-medium">Change return order status</label>
      <select
        className="border rounded px-3 py-2 w-full bg-white"
        value={paymentMethod}
        onChange={(e) => handleStatusChange(e.target.value)}
      >

        <option value="" disabled>Pilih Status</option>
        <option value="canceled">Canceled</option>
        <option value="processing">Processing</option>
        <option value="pending">Pending</option>
      </select>
      <button
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default StatusDropdown;
