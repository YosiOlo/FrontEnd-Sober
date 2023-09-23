import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

function OrderStatus() {
  const statuses = ["pending", "processing", "canceled"];
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectStatus = (status) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false);
  };
  return (
    <div className="card bg-white rounded-lg w-[700px] mt-6 p-4 break-words">
      <p className="font-semibold">Change return order status</p>

      <div className="flex space-x-2 mt-4">
        <p className="text-gray-600">Status:</p>
        <div className="relative w-[600px] flex">
          <button
            onClick={toggleDropdown}
            className="block w-full py-2 px-4 rounded-md bg-white border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
          >
            {selectedStatus}
            <AiFillCaretDown className="flex items-center"/>
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="py-1">
                {statuses.map((status) => (
                  <li
                    key={status}
                    onClick={() => selectStatus(status)}
                    className="px-4 py-2 cursor-pointer hover:bg-indigo-50"
                  >
                    {status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
<div className="update flex justify-end mt-5">
<button className="bg-[#4d97c1] w-[70px] h-[30px] rounded-lg">update</button>
</div>
    </div>
  );
}

export default OrderStatus;
