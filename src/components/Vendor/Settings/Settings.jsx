import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Generalinformation from "./Generalinformation";
import PayoutInfo from "./PayoutInfo";

function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [shopName, setShopName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [linkToko, setLinkToko] = useState("");
  const [alamat, setAlamat] = useState("");
  const [zipCode, setzipCode] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kota, setKota] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [noKtp, setNoKtp] = useState("");
  const [description, setDescription] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer, Paypal");
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [upiId, setUpiId] = useState("");
  const [descriptionPayout, setDescriptionPayout] = useState("");

  return (
    <div className="text-black">
      <div className="flex space-x-4">
        <button
          className={`${
            activeTab === "general" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded`}
          onClick={() => setActiveTab("general")}
        >
          General Information
        </button>
        <button
          className={`${
            activeTab === "tax" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded`}
          onClick={() => setActiveTab("tax")}
        >
          Tax Info
        </button>
        <button
          className={`${
            activeTab === "payout" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded`}
          onClick={() => setActiveTab("payout")}
        >
          Payout Info
        </button>
      </div>

      {activeTab === "general" && (
        <Generalinformation/>
      )}

      {activeTab === "tax" && (
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
        </div>
      )}

      {activeTab === "payout" && (
        <PayoutInfo/>
      )}
    </div>
  );
}

export default Settings;
