import React, { useState } from "react";

function AddCoupons() {
  const [selectedOption, setSelectedOption] = useState("amount-fixed");
  const [inputValue, setInputValue] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const [couponCode, setCouponCode] = useState("");

  const generateCouponCode = () => {
    // Menghasilkan kode kupon acak, misalnya, dengan panjang 8 karakter
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    const codeLength = 12;

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    setCouponCode(code);
  };

  return (
    <div >
      <div className="card bg-white p-4 text-black">
        <div className="header flex justify-between mb-3">
          <p>Create coupon code </p>
          <button className="font-semibold" onClick={generateCouponCode}>Generate Code</button>
        </div>
        <input
          type="text"
          id="coupon"
          value={couponCode ||""}
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
          className="block text-black w-full mt-1 p-2 border bg-[#f9f9f9] border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />


<div className="border-t-[1px] border-slate-200 mt-6">
          <label htmlFor="dropdown" className="block mt-5 font-medium text-gray-700">
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
              value={inputValue}
              onChange={handleInputChange}
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
              value={inputValue}
              onChange={handleInputChange}
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
            value={inputValue}
            onChange={handleInputChange}
            className="block w-full mt-1 p-2 border bg-[#f9f9f9] border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        )}
      </div>
        
      </div>
  );
}

export default AddCoupons;
