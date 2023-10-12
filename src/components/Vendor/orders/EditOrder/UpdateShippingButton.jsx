import React, { useState } from "react";
import { RxUpdate } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { putOrders } from "../../../../utils/ApiConfig";
import Swal from "sweetalert2";

const UpdateShipping = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState("");
  const { id } = useParams();

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const handleSave = () => {
    const updatedData = {
      status: status,
    };
    putOrders(id, updatedData)
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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 ">
      <div className="absolute inset-0 " />
      <div className=" w-[500px] rounded-lg shadow-md z-10 bg-[#f9f9f9]">
        <div className="header bg-[#0DCAF0] p-2 flex gap-3 rounded-t-lg">
          <RxUpdate className="text-white mt-2 font-bold" />
          <h2 className=" text-white font-semibold mb-4">
            Update Shipping Status
          </h2>
        </div>
        <div className="body bg-white p-4 rounded-b-lg">
          <label className="block mb-2 bg-white">Select Status:</label>
          <select
            className="border rounded px-3 py-2 w-full bg-white"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="delivered">Delivered</option>
            <option value="pending">Arrange Shipment</option>
          </select>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-[#0DCAF0] text-white rounded"
              onClick={handleSave}
            >
              Update
            </button>
            <button
              className="px-4 py-2 ml-2 bg-[#FFC107] rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateShipping;
