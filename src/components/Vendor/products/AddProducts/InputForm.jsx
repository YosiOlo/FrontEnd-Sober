import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useState } from "react";

const InputForm = () => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const [productShelf, setProductShelf] = useState("");
  const [sku, setSku] = useState("");
  const [costItem, setCostItem] = useState("");
  const [feeAplikasi, setFeeAplikasi] = useState("");
  const [pricesale, setPricesale] = useState("");
  const [barcode, setBarcode] = useState("");
  const [harga, setHarga] = useState("");
  const [hargaTampil, setHargaTampil] = useState("");
  const [productBrand, setProductBrand] = useState(""); // New state for the brand
  const [newArrival, setNewArrival] = useState(false);
  const [bestSellers, setBestSellers] = useState(false);
  const [specialOffer, setSpecialOffer] = useState(false);
  const [tags, setTags] = useState("");
  const [storeHouse, setStoreHouse] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [globalOptions, SetGlobalOptions] = useState("");
  const [allowCheckoutWhenOutOfStock, setAllowCheckoutWhenOutOfStock] =
    useState("");
  const [attributes, setAttributes] = useState([
    { name: "", value: "" }, // Default attribute
  ]);
  const [showAttributes, setShowAttributes] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Lakukan logikanya di sini, misalnya mengirim data ke server

    // Setelah berhasil, kosongkan form
    setProductName("");
    setProductImage(null);
    setProductCategory("");
    setProductShelf("");
    setProductBrand(""); // Clear brand selection
    setNewArrival(false);
    setBestSellers(false);
    setSpecialOffer(false);
    setAttributes([{ name: "", value: "" }]);
    setHarga("");
    setHargaTampil("");
    setFeeAplikasi("");
    setCostItem("");
    setPricesale("");
    setBarcode("");
  };
  const handleAddAttribute = () => {
    setShowAttributes(true);
  };
  const handleAddMoreAttribute = () => {
    setAttributes([...attributes, { name: "", value: "" }]);
  };

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(index, 1);
    setAttributes(updatedAttributes);
  };

  const handleAttributeChange = (index, field, newValue) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][field] = newValue;
    setAttributes(updatedAttributes);
  };

  const handleHargaChange = (e) => {
    const newHarga = parseInt(e.target.value, 10); // Mengubah newHarga menjadi integer dengan basis 10
    setHarga(newHarga);

    // Menghitung nilai Fee Aplikasi (harga * 0.2) dan mengatur nilainya
    const calculatedFee = parseFloat(newHarga) * 0.2;
    setFeeAplikasi(calculatedFee); // Membulatkan ke 0 desimal
    setHargaTampil(calculatedFee + newHarga); // Membulatkan ke 0 desimal
  };
  return (
    <div className="flex flex-wrap gap-5 justify-evenly p-4 text-black">
      <div className=" mx-auto mt-8 p-6 bg-white rounded-md shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Tambah Produk</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block font-medium mb-2">
              Nama Produk
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#f9f9f9f9] rounded-md border focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productImage" className="block font-medium mb-2">
              Upload Gambar
            </label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
              required
              className="w-full px-4 py-2 rounded-md border bg-[#f9f9f9] focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <h2 className="block font-semibold mb-2">Overview</h2>
            <label htmlFor="productCategory" className="block font-medium mb-2">
              Kategori
            </label>
            <select
              id="productCategory"
              name="productCategory"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border bg-[#f9f9f9] focus:outline-none focus:border-blue-500"
            >
              <option value="">Pilih Kategori</option>
              <option value="rumah_tangga">Rumah Tangga</option>
              <option value="audio_kamera">Audio & Kamera</option>
              <option value="elektronik_lainnya">Elektronik Lainnya</option>
              <option value="fashion_muslim">Fashion Muslim</option>
              <option value="fashion_wanita">Fashion Wanita</option>
              <option value="ibu_bayi">Ibu & Bayi</option>
              <option value="kecantikan">Kecantikan</option>
              <option value="kesehatan">Kesehatan</option>
              <option value="komputer_laptop">Komputer & Laptop</option>
              <option value="makan_minum">Makanan & Minuman</option>
              <option value="perawatan_tubuh">Perawatan Tubuh</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="productShelf" className="block font-semibold mb-2">
              Etalase
            </label>
            <input
              type="text"
              id="productShelf"
              name="productShelf"
              value={productShelf}
              onChange={(e) => setProductShelf(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="spesification" className="block font-semibold mb-2">
              Spesification
            </label>
            <CKEditor editor={ClassicEditor} onInit={(editor) => {}} />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold mb-2">
              Description
            </label>
            <CKEditor editor={ClassicEditor} onInit={(editor) => {}} />
          </div>
          <div className="mb-4">
            <label htmlFor="sku" className="block font-semibold mb-2">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="harga1 flex justify-between">
            <div className="mb-4">
              <label htmlFor="harga" className="block font-semibold mb-2">
                Harga
              </label>
              <input
                type="text"
                id="harga"
                name="harga"
                value={harga}
                onChange={handleHargaChange}
                className="w-[250px] px-4 py-2 rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="feeAplikasi" className="block font-semibold mb-2">
                Fee Aplikasi
              </label>
              <input
                type="text"
                id="feeAplikasi"
                name="feeAplikasi"
                value={feeAplikasi}
                readOnly // Mengatur input menjadi read-only untuk mencegah pengguna mengeditnya
                className="w-[250px] px-4 py-2 rounded-md bg-[#f9f9f9] border"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="hargaTampil" className="block font-semibold mb-2">
                Harga yang ditampilkan
              </label>
              <input
                type="text"
                id="hargaTampil"
                name="hargaTampil"
                value={hargaTampil}
                readOnly
                onChange={(e) => setHargaTampil(e.target.value)}
                className="w-[250px] px-4 py-2 rounded-md bg-[#f9f9f9] border"
              />
            </div>
          </div>
          <div className="harga1 flex justify-between">
            <div className="mb-4">
              <label
                htmlFor="productShelf"
                className="block font-semibold mb-2"
              >
                Price sale
              </label>
              <input
                type="text"
                id="priceSale"
                name="pricesale"
                value={pricesale}
                onChange={(e) => setPricesale(e.target.value)}
                className="w-[250px] px-4 py-2 rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="costItem" className="block font-semibold mb-2">
                Cost per item
              </label>
              <input
                type="text"
                id="costItem"
                name="costItem"
                value={costItem}
                onChange={(e) => setCostItem(e.target.value)}
                className="w-[250px] px-4 py-2 rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="barcode" className="block font-semibold mb-2">
                Barcode (ISBN, UPC, GTIN, etc.)
              </label>
              <input
                type="text"
                id="barcode"
                name="barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="w-[250px] px-4 py-2 rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex mb-4">
            <input
              type="checkbox"
              id="storeHouse"
              name="storeHouse"
              checked={storeHouse}
              onChange={() => {
                setStoreHouse(!storeHouse);
                setShowAdditionalFields(!showAdditionalFields);
              }}
              className="mr-2"
            />
            <label htmlFor="storeHouse" className="mr-4">
              With storehouse management
            </label>
          </div>
          {showAdditionalFields && (
            <div className="additional-fields">
              <div className="mb-4">
                <label htmlFor="quantity" className="block font-semibold mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="allowCheckoutWhenOutOfStock"
                  name="allowCheckoutWhenOutOfStock"
                  checked={allowCheckoutWhenOutOfStock}
                  onChange={() =>
                    setAllowCheckoutWhenOutOfStock(!allowCheckoutWhenOutOfStock)
                  }
                  className="mr-2"
                />
                <label htmlFor="allowCheckoutWhenOutOfStock">
                  Allow customer checkout when this product is out of stock
                </label>
              </div>
            </div>
          )}
          <div className="stock mb-4">
            <p>Stock status</p>
            <select
              id="productBrand"
              name="productBrand"
              value={productBrand}
              onChange={(e) => setProductBrand(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border bg-[#f9f9f9] focus:outline-none focus:border-blue-500"
            >
              <option value="">in Stock</option>
              <option value="Xiaomi">Out of Stock</option>
              <option value="Sunco">On BackOrder</option>
            </select>
          </div>
          <div className="shipping mb-4">
            <p>Shipping</p>
            <div className="flex">
              <div className="weight flex flex-col">
                <label htmlFor="">Weight (g)</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  className="mr-2 border h-9 rounded-md bg-[#f9f9f9]"
                />
              </div>
              <div className="Length flex flex-col">
                <label htmlFor="">Length (cm)</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  className="mr-2 border h-9 rounded-md bg-[#f9f9f9]"
                />
              </div>
            </div>
            <div className="flex">
              <div className="wide flex flex-col">
                <label htmlFor="">Wide (cm)</label>
                <input
                  type="text"
                  id="Wide"
                  name="weight"
                  className="mr-2 border h-9 rounded-md bg-[#f9f9f9]"
                />
              </div>
              <div className="Length flex flex-col">
                <label htmlFor="">Height (cm)</label>
                <input
                  type="text"
                  id="Height"
                  name="weight"
                  className="mr-2 border h-9 rounded-md bg-[#f9f9f9]"
                />
              </div>
            </div>
          </div>

          <div className="atributes p-4">
            <div className="header flex justify-between mb-6 border-b-[1px] border-slate-200">
              <p className="mb-6">Atributes</p>
              <button
                type="button"
                onClick={handleAddAttribute}
                className="px-4 py-2 rounded-md mr-2"
              >
                Add New Attributes
              </button>
            </div>
          </div>
          {showAttributes && (
            <div>
              {attributes.map((attribute, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <input
                    type="text"
                    placeholder="Attribute Name"
                    value={attribute.name}
                    onChange={(e) =>
                      handleAttributeChange(index, "name", e.target.value)
                    }
                    className="w-[250px] px-4 py-2 rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500 mr-2"
                  />
                  <select
                    value={attribute.value}
                    onChange={(e) =>
                      handleAttributeChange(index, "value", e.target.value)
                    }
                    className="w-[250px] px-4 py-2 rounded-md border bg-[#f9f9f9] focus:outline-none focus:border-blue-500 mr-2"
                  >
                    <option value="">Select Value</option>
                    <option value="kf_96">kf 96</option>
                    <option value="garnier">garnier</option>
                    <option value="shinzui">shinzui</option>
                  </select>

                  {index !== attributes.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAttribute(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                      Remove
                    </button>
                  )}
                  {index === attributes.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddMoreAttribute}
                      className="bg-[#0DCAF0] hover:bg-[#08AFD0] text-white px-4 py-2 rounded-md mr-2"
                    >
                      Add More Attribute
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="productOptions mb-4">
            <p className="font-medium p-3 border-b-[1px] border-slate-200">
              Product options
            </p>
            <div className="flex justify-between mt-5">
              <button className="bg-[#0DCAF0] hover:bg-[#08AFD0] text-white px-4 py-2 rounded-md">
                Add New Options
              </button>
              <div className="globalOptions flex gap-4">
                <select
                  id="globalOptions"
                  name="globalOptions"
                  value={globalOptions}
                  onChange={(e) => setGlobalOptions(e.target.value)}
                  required
                  className=" px-4 py-2 rounded-md border bg-[#f9f9f9] focus:outline-none focus:border-blue-500"
                >
                  <option value="">Sellect Global Options</option>
                  <option value="Warranty">Warranty</option>
                  <option value="Ram">Ram</option>
                  <option value="CPU">CPU</option>
                  <option value="HDD">HDD</option>
                </select>

                <button className="bg-[#0DCAF0] hover:bg-[#08AFD0] text-white px-4 py-2 rounded-md">
                  Add Global Options
                </button>
              </div>
            </div>
          </div>
          <div className="relatedProduct flex flex-col">
            <p className="font-medium p-3 border-b-[1px] border-slate-200">
              Related products
            </p>
            <label htmlFor="relatedProduct">relatedProduct</label>
            <input
              type="text"
              placeholder="Search Products"
              onChange={(e) =>
                handleAttributeChange(index, "name", e.target.value)
              }
              className=" px-4 py-2 rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500 mr-2"
            />
            <label htmlFor="Cross-selling products">Cross-selling products</label>
            <input
              type="text"
              placeholder="Cross-selling products"
              onChange={(e) =>
                handleAttributeChange(index, "name", e.target.value)
              }
              className="px-4 py-2 rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500 mr-2"
            />
          </div>
        </form>
      </div>

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
    </div>
  );
};

export default InputForm;
