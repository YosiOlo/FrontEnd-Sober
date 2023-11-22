import React,{useState,useEffect} from 'react'
import { useFormAction } from 'react-router-dom';

function SideMenu() {
  const [productBrand, setProductBrand] = useState(""); // New state for the brand
  const [newArrival, setNewArrival] = useState(false);
  const [bestSellers, setBestSellers] = useState(false);
  const [specialOffer, setSpecialOffer] = useState(false);
  const [tags, setTags] = useState("");

  const {} = useFormAction();

  return (
    <div className="aside flex flex-col ">
        <div className="card-publish bg-white w-[300px] p-5 ">
          <h1 className="border-b-[1px] border-slate-200 text-[13px] mb-6 font-semibold">
            Publish
          </h1>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#0dcaf0] rounded-md w-[100px] h-[40px]"
            >
              Save{" "}
            </button>
            <button className="bg-[#198754] rounded-md w-[100px]">
              Save & edit{" "}
            </button>
          </div>
        </div>
        <div className=" bg-white mt-5 p-4">
          <label htmlFor="productBrand" className="block font-medium mb-2">
            Brand
          </label>
          <select
            id="productBrand"
            name="productBrand"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md border bg-[#f9f9f9] focus:outline-none focus:border-blue-500"
          >
            <option value="">Pilih Brand</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Sunco">Sunco</option>
            <option value="Indomie">Indomie</option>
          </select>
        </div>
        <div className="bg-white mt-5 p-4">
          <label className="block font-medium mb-2">Product Collections</label>

          <div className="flex">
            <input
              type="checkbox"
              id="newArrival"
              name="newArrival"
              checked={newArrival}
              onChange={() => setNewArrival(!newArrival)}
              className="mr-2"
            />
            <label htmlFor="newArrival" className="mr-4">
              New Arrival
            </label>
          </div>
          <div className="flex">
            <input
              type="checkbox"
              id="bestSellers"
              name="bestSellers"
              checked={bestSellers}
              onChange={() => setBestSellers(!bestSellers)}
              className="mr-2"
            />
            <label htmlFor="bestSellers" className="mr-4">
              Best Sellers
            </label>
          </div>
          <div className="flex">
            <input
              type="checkbox"
              id="specialOffer"
              name="specialOffer"
              checked={specialOffer}
              onChange={() => setSpecialOffer(!specialOffer)}
              className="mr-2"
            />
            <label htmlFor="specialOffer">Special Offer</label>
          </div>
        </div>
        <div className="card mt-5 p-4 bg-white">
          <h1 className="border-b-[1px] border-slate-200 text-[13px] mb-6 font-semibold">
            Tags
          </h1>
          <input
            type="text"
            id="specialOffer"
            name="specialOffer"
            checked={tags}
            onChange={setTags}
            placeholder="Write some tags"
            className="p-3 mr-2 h-10 border-slate-500 bg-[#f9f9f9]"
          />
        </div>
      </div>
  )
}

export default SideMenu