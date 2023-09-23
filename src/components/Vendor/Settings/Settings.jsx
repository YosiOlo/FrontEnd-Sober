import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
        <div className="mt-4">
          <div className="space-y-2">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block font-medium">Shop Name</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  value={shopName}
                  placeholder="Shop Name"
                  onChange={(e) => setShopName(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium">Company Name</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block font-medium">Phone Number</label>
              <input
                className="border rounded px-3 py-2 w-full bg-white"
                type="text"
                value={phoneNumber}
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block font-medium">Email Toko</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  value={email}
                  placeholder="Email Toko"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium">Link Toko</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  value={linkToko}
                  placeholder="Link Toko"
                  onChange={(e) => setLinkToko(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block font-medium">Alamat</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  value={alamat}
                  placeholder="Alamat"
                  onChange={(e) => seAlamat(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium">Zip Code</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(e) => setzipCode(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block font-medium">Kelurahan</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  value={kelurahan}
                  placeholder="Kelurahan"
                  onChange={(e) => setKelurahan(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium">Kecamatan</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  placeholder="Kecamatan"
                  value={kecamatan}
                  onChange={(e) => setKecamatan(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block font-medium">Kota/Kabupaten</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  value={kota}
                  placeholder="Kota / Kabupaten"
                  onChange={(e) => setKota(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium">Provinsi</label>
                <input
                  className="border rounded px-3 py-2 w-full bg-white"
                  type="text"
                  placeholder="Provinsi"
                  value={provinsi}
                  onChange={(e) => setProvinsi(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block font-medium">No KTP</label>
              <input
                className="border rounded px-3 py-2 w-full bg-white"
                type="text"
                value={noKtp}
                placeholder="No KTP"
                onChange={(e) => setNoKtp(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium">Description</label>
              <input
                className="border rounded h-[100px] px-3 py-2 w-full bg-white"
                type="text"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium">Content</label>

              <CKEditor
                className="h-[100px]"
                editor={ClassicEditor}
                onInit={(editor) => {}}
              />
            </div>
          </div>
        </div>
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
        <div className="mt-4">
          <div className="space-y-2">
            <div>
              <label className="block font-medium">Payment Method</label>
              <select
                className="border rounded px-3 py-2 w-full bg-white"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Paypal">Paypal</option>
              </select>
            </div>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
