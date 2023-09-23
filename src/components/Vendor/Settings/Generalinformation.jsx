import React,{useEffect,useState} from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getVendorInfo } from '../../../utils/ApiConfig';

function Generalinformation() {
    const [general, setGeneral] = useState ("");
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


    useEffect(() => {
        getVendorInfo()
        .then((data) => {  
          // Assuming that the data data has the necessary fields
          setShopName(data?.store_info?.name || "");
          setCompanyName(data.store_info?.company || "");
          setPhoneNumber(data.store_info?.phone || "");
          setEmail(data?.store_info?.email || "");
          setLinkToko(data.linkToko || "");
          setAlamat(data.store_info?.address || "");
          setzipCode(data?.store_info?.zip_code || "");
          setKelurahan(data?.store_info?.kelurahan || "");
          setKecamatan(data?.store_info?.kecamatan || "");
          setKota(data.store_info?.city || "");
          setProvinsi(data.store_info?.state || "");
          setNoKtp(data.store_info.idktp || "");
          setDescription(data.store_info?.description || "");
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error fetching vendor data:', error);
        });
    }, []);
  
      



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
                  value={linkToko}
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
                  onChange={(e) => seAlamat(e.target.value)}
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
    </div>
  )
}

export default Generalinformation