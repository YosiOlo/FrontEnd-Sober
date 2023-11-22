import React, { useEffect, useState } from "react";
import { addcoupons } from "../../../../utils/ApiConfig";
import SideCoupons from "./SideCoupons";

function AddCoupons() {
  const [selectedOption, setSelectedOption] = useState("amount-fixed");
  const [inputValue, setInputValue] = useState("");
  const [couponName, setCouponName] = useState("");
  const [dvalue, setdvalue] = useState("");
  const [maxDvalue, setMaxDvalue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleCouponNameChange = (e) => {
    setCouponName(e.target.value);
  };

  const handleDvalueChange = (e) => {
    setdvalue(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const [couponCode, setCouponCode] = useState("");

  const generateCouponCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    const codeLength = 12;

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    setCouponCode(code);
  };

  const saveCouponData = async () => {
    const couponData = {
      code: couponCode,
      title: couponName,
      type_option: selectedOption,
      value: dvalue,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      // Kirim permintaan POST ke API
      const response = await addcoupons(couponData);
      console.log("Coupon added successfully:", response.data);
    } catch (error) {
      console.error("Error adding coupon:", error);
      // Handle kesalahan dengan cara yang sesuai, misalnya menampilkan pesan kesalahan kepada pengguna
    }
  };
  return (
    <div className="flex justify-between">
      <div className="card bg-white p-4 text-black">
        <div className="header flex justify-between mb-3">
          <p>Create coupon code </p>
          <button className="font-semibold" onClick={generateCouponCode}>
            Generate Code
          </button>
        </div>
        <input
          type="text"
          id="coupon"
          value={couponCode || ""}
          className="block w-full mt-1 mb-1 p-2 border bg-[#f9f9f9] border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        <div className="notif bg-blue-200 p-2 mb-2">
          <p className="text-black">
            Customer will enter this coupon code when they checkout
          </p>
        </div>
        <input
          type="text"
          id="coupon"
          placeholder="Enter coupon name"
          value={couponName}
          onChange={handleCouponNameChange}
          className="block text-black w-full mt-1 p-2 border bg-[#f9f9f9] border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />

        <div className="border-t-[1px] border-slate-200 mt-6">
          <label
            htmlFor="dropdown"
            className="block mt-5 font-medium text-gray-700"
          >
            Coupon Type :
          </label>
          <div className="flex">
            <select
              id="dropdown"
              value={selectedOption}
              onChange={handleOptionChange}
              className="block  mt-1 p-2 border  bg-[#f9f9f9] border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="amount-fixed">Amount Fixed</option>
              <option value="discounts">Discounts</option>
              <option value="free-shipping">Free Shipping</option>
            </select>
          </div>
        </div>
        {selectedOption === "amount-fixed" && (
          <div className="mb-4">
            <label htmlFor="amount" className="block font-medium text-gray-700">
              Enter Amount Fixed:
            </label>
            <input
              type="text"
              id="amount"
              value={dvalue}
              onChange={handleDvalueChange}
              className="block w-full mt-1 p-2 border bg-[#f9f9f9] border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        )}
        {selectedOption === "discounts" && (
          <div className="mb-4">
            <label
              htmlFor="discount"
              className="block font-medium text-gray-700"
            >
              Enter Discounts:
            </label>
            <input
              type="text"
              id="discount"
              value={dvalue}
              onChange={handleDvalueChange}
              className="block w-full mt-1 p-2 border bg-[#f9f9f9] border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        )}
        {selectedOption === "free-shipping" && (
          <div className="mb-4">
            <label
              htmlFor="free-shipping"
              className="block font-medium text-gray-700"
            >
              when shipping fee less than
            </label>
            <input
              type="text"
              id="free-shipping"
              value={dvalue}
              onChange={handleDvalueChange}
              className="block w-full mt-1 p-2 border bg-[#f9f9f9] border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        )}
      </div>
      <div className="side">
      <SideCoupons
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onSave={saveCouponData}
      />
      </div>
    </div>
  );
}

export default AddCoupons;
