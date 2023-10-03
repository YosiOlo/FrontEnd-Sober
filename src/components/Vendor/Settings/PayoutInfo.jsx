import React, { useState, useEffect } from "react";
import { getVendorInfo, putPayout } from "../../../utils/ApiConfig";
import Swal from "sweetalert2";

function PayoutInfo() {
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer", "Paypal");
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [upiId, setUpiId] = useState("");
  const [paypalId, setPaypalId] = useState("");
  const [descriptionPayout, setDescriptionPayout] = useState("");

  useEffect(() => {
    getVendorInfo()
      .then((data) => {
        setBankName(data?.vendor_info?.bank_info.name || "");
        setBankCode(data?.vendor_info?.bank_info.code || "");
        setAccountNumber(data?.vendor_info?.bank_info?.number || "");
        setUpiId(data?.vendor_info?.bank_info.upi_id || "");
        setDescriptionPayout(data?.vendor_info.description || "");
        setPaypalId(data?.vendor_info?.bank_info.paypal_id || "");
        setPaymentMethod(
          data?.vendor_info?.payout_payment_method || ""
        );
      })
      .catch((error) => {
        console.error("Error fetching vendor data:", error);
      });
  }, []);

  const handleSaveData = () => {
    const updatedData = {
      name: bankName,
      code: bankCode,
      number: accountNumber,
      upi_id: upiId,
      description: descriptionPayout,
      paypal_id: paypalId,
      method: paymentMethod,
    };

    putPayout(updatedData)
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
      <div className="mt-4">
        <div className="space-y-2">
          <div>
            <label className="block font-medium">Payment Method</label>
            <select
              className="border rounded px-3 py-2 w-full bg-white"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="bank_transfer">Bank Transfer</option>
              <option value="paypal">Paypal</option>
            </select>
          </div>

          {paymentMethod === "bank_transfer" && (
            <>
              <div>
                <label className="block font-medium">Bank Name</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  value={bankName}
                  placeholder="Bank Name"
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium">Bank Code/IFSC</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  value={bankCode}
                  placeholder="Bank Code/IFSC"
                  onChange={(e) => setBankCode(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium">Account Number</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  value={accountNumber}
                  placeholder="Account Number"
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium">Account Holder Name</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  value={accountHolder}
                  placeholder="Account Holder Name"
                  onChange={(e) => setAccountHolder(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium">UPI ID</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  value={upiId}
                  placeholder="UPI ID"
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium">Description</label>
                <input
                  className="border rounded h-[100px] px-3 py-2 w-full bg-white"
                  type="text"
                  value={descriptionPayout}
                  placeholder="Description"
                  onChange={(e) => setDescriptionPayout(e.target.value)}
                />
              </div>
            </>
          )}

          {paymentMethod === "paypal" && (
            <>
              <div>
                <label className="block font-medium">PayPal Email ID:</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  value={paypalId}
                  onChange={(e) => setPaypalId(e.target.value)}
                />
              </div>
            </>
          )}
          <button
            className="bg-[#80bc00] text-white px-4 py-2 rounded mt-9"
            onClick={handleSaveData}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayoutInfo;
