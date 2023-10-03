import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getVendorInfo, putGeneralInformation } from "../../../utils/ApiConfig";
import Swal from "sweetalert2";
function Generalinformation() {
  const [general, setGeneral] = useState("");
  const [shopName, setShopName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [alamat, setAlamat] = useState("");
  const [zipCode, setzipCode] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kota, setKota] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [noKtp, setNoKtp] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [logo, setLogo] = useState("");
  const [ktp, setKtp] = useState("");
  const [covers, setCovers] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const fileRef = useRef()

 useEffect(() => {
    getVendorInfo()
      .then((data) => {
        // Assuming that the data data has the necessary fields
        setShopName(data?.store_info?.name || "");
        setCompanyName(data.store_info?.company || "");
        setPhoneNumber(data.store_info?.phone || "");
        setEmail(data?.store_info?.email || "");
        setCountry(data.country || "");
        setAlamat(data.store_info?.address || "");
        setzipCode(data?.store_info?.zip_code || "");
        setKelurahan(data?.store_info?.kelurahan || "");
        setKecamatan(data?.store_info?.kecamatan || "");
        setKota(data.store_info?.city || "");
        setProvinsi(data.store_info?.state || "");
        setNoKtp(data.store_info.idktp || "");
        setDescription(data.store_info?.description || "");
        setLogo(data.store_info?.logo || "");
        setCovers(data.store_info?.covers || "");
        setKtp(data.store_info?.ktp || "");
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching vendor data:", error);
      });
  }, []);

  const handleImageChange = (e) => {
    // const file = e.target.files[0];
    
    const image = fileRef.current.files[0]
    console.log(image)
    setSelectedImage(image);
  };

  const handleSaveData = () => {
    const formData = new FormData();

    formData.append("ktp", selectedImage);
    formData.append("cover", selectedImage);
    formData.append("logo", selectedImage);
    formData.append("description", description);

    formData.forEach(data => {
      console.log(data)
    })
// shopName,
// email,
// phoneNumber,
// alamat,
// country,
// provinsi,
// kota,
// zipCode,
// description,
// content,
// companyName,
// kelurahan,
// kecamatan,
// noKtp,
// ktp,
// logo,
// covers
    putGeneralInformation(formData)
      .then((response) => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        })
        console.log("Data saved successfully", response);
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
      <div className="mt-4">
        <div className="space-y-2">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block font-medium">Shop Name</label>
              <input
                className="border rounded px-3 py-2 w-full bg-white"
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium">Company Name</label>
              <input
                className="border rounded px-3 py-2 w-full bg-white"
                type="text"
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium">Link Toko</label>
              <input
                className="border rounded px-3 py-2 w-full bg-white"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
                onChange={(e) => setAlamat(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium">Zip Code</label>
              <input
                className="border rounded px-3 py-2 w-full bg-white"
                type="text"
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
                onChange={(e) => setKelurahan(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium">Kecamatan</label>
              <input
                className="border rounded px-3 py-2 w-full bg-white"
                type="text"
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
                onChange={(e) => setKota(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium">Provinsi</label>
              <input
                className="border rounded px-3 py-2 w-full bg-white"
                type="text"
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
          <div className="flex justify-between">
            <div>
              <label className="block font-medium">Foto KTP</label>
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={handleImageChange}
              />
            </div>
            <div>
              <label className="block font-medium">Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <label className="block font-medium">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <input
              className="border rounded h-[100px] px-3 py-2 w-full bg-white"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium">Content</label>

            <CKEditor
              className="h-[100px]"
              editor={ClassicEditor}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onInit={(editor) => {}}
            />
          </div>
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

export default Generalinformation;
