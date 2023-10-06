import React, { useState } from "react";
import { RxUpdate } from "react-icons/rx";

const UpdateShipping = ({ isOpen, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState("Delivered");
  const statusOptions = ["Delivered", "Arrange Shipment"];

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = () => {
    // Kirim data status yang diperbarui ke backend atau lakukan aksi yang diperlukan
    console.log("Status updated:", selectedStatus);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0" />
      <div className=" w-[500px] rounded-lg shadow-md z-10">
        <div className="header bg-[#0DCAF0] p-2 flex gap-3 rounded-t-lg">
          <RxUpdate className="text-white mt-2 font-bold" />
          <h2 className=" text-white font-semibold mb-4">
            Update Shipping Status
          </h2>
        </div>
        <div className="body bg-white p-4 rounded-b-lg">
        <label className="block mb-2 bg-white">Select Status:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-[#0DCAF0] text-white rounded"
            onClick={handleSubmit}
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
