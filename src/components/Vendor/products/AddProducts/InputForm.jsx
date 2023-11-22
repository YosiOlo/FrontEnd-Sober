import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import React, { useEffect, useRef, useState } from "react";
import {
  createProducts,
  getCategories,
  getProducts,
} from "../../../../utils/ApiConfig";
import { createDataOptions } from "../../../../utils/data";
import axios from "axios";

const InputForm = () => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const [productShelf, setProductShelf] = useState("");
  const [etalase, setEtalase] = useState("");
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
  const [quantity, setQuantity] = useState(0);
  const [globalOptions, SetGlobalOptions] = useState("");
  const [allowCheckoutWhenOutOfStock, setAllowCheckoutWhenOutOfStock] =
    useState(false);
  const [attributes, setAttributes] = useState([{ name: "", value: "" }]);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const animatedComponents = makeAnimated();

  const [data, setData] = useState({
    specification: "",
    description: "",
    stockStatus: "",
    weight: "",
    length: "",
    wide: "",
    height: "",
    tags: [],
    image: null,
  });

  const fileRef = useRef();

  const handleDataChange = (value, name) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    // const file = e.target.files[0];

    const image = fileRef.current.files[0];

    setData((prev) => ({
      ...prev,
      [e.target.name]: image,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const getProductCollection = () => {
      let array = [];

      if (newArrival) array.push(1);
      if (bestSellers) array.push(2);
      if (specialOffer) array.push(3);

      return array;
    };
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("etalase", etalase);
    formData.append("images", data.image);
    formData.append("description", data.description);
    formData.append("content", data.specification);
    formData.append("sku", sku);
    formData.append("price", harga);
    formData.append("fee", feeAplikasi);
    formData.append("hpp", hargaTampil);
    formData.append("sale_price", pricesale);
    formData.append("cost_per_item", parseInt(costItem));
    formData.append("with_storehouse_management", storeHouse ? 1 : 0);
    formData.append("stock_status", data.stockStatus);
    formData.append("wide", parseInt(data.wide));
    formData.append("length", parseInt(data.length));
    formData.append("height", parseInt(data.height));
    formData.append("weight", parseInt(data.weight));
    formData.append("barcodes", barcode);
    formData.append("is_variation", false);
    formData.append(
      "allow_checkout_when_out_of_stock",
      allowCheckoutWhenOutOfStock ? 1 : 0
    );
    formData.append("stock", parseInt(quantity));
    formData.append("kategori_1", parseInt(listCategorySelected.first.id));
    formData.append("kategori_2", parseInt(listCategorySelected.second.id));
    formData.append("kategori_3", parseInt(listCategorySelected.third.id));
    formData.append(
      "related_products",
      selectedRelatedProducts.map((item) => item.id)
    );
    formData.append(
      "cross_sale",
      selectedCrossProducts.map((item) => item.id)
    );
    formData.append("brand_id", parseInt(productBrand));
    formData.append("product_collections", getProductCollection());
    formData.append("tags", tags);
    formData.append("attributes", [1]);
    formData.append("options", createDataOptions);

    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]} ${typeof pair[1]}`);
    // }
    const relatedString = JSON.stringify(selectedRelatedProducts.map((item) => item.id))
    const crossString = JSON.stringify(selectedCrossProducts.map((item) => item.id))
    const tagsString = JSON.stringify(data.tags)
    const ProductColString = JSON.stringify(getProductCollection())


    const body = {
      name: productName,
      etalase: etalase,
      images: data.image,
      description: data.description,
      content: data.specification,
      sku: sku,
      price: harga,
      fee: feeAplikasi,
      hpp: hargaTampil,
      sale_price: parseInt(pricesale),
      cost_per_item: parseInt(costItem),
      with_storehouse_management: storeHouse ? 1 : 0,
      stock_status: data.stockStatus,
      wide: parseInt(data.wide),
      length: parseInt(data.length),
      height: parseInt(data.height),
      weight: parseInt(data.weight),
      barcodes: barcode,
      is_variation: false,
      allow_checkout_when_out_of_stock: allowCheckoutWhenOutOfStock ? 1 : 0,
      stock: parseInt(quantity),
      kategori_1: parseInt(listCategorySelected.first.id),
      kategori_2: parseInt(listCategorySelected.second.id),
      kategori_3: parseInt(listCategorySelected.third.id),
      related_products: relatedString,
      cross_sale: crossString,
      brand_id: parseInt(productBrand),
      product_collections: ProductColString,
      tags: tagsString,
      attributes: JSON.stringify([1]),
      options: JSON.stringify(createDataOptions),
    };

    createProducts(body);

    setProductName("");
    setProductImage(null);
    setProductCategory("");
    setProductShelf("");
    setProductBrand("");
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

  const handleHargaChange = (e) => {
    const newHarga = parseInt(e.target.value, 10); // Mengubah newHarga menjadi integer dengan basis 10
    setHarga(newHarga);

    // Menghitung nilai Fee Aplikasi (harga * 0.2) dan mengatur nilainya
    const calculatedFee = parseFloat(newHarga) * 0.2;
    setFeeAplikasi(calculatedFee); // Membulatkan ke 0 desimal
    setHargaTampil(calculatedFee + newHarga); // Membulatkan ke 0 desimal
  };

  // category;
  const [listCategory, setListCategory] = useState({
    first: [],
    second: [],
    third: [],
  });
  const [listCategorySelected, setListCategorySelected] = useState({
    first: { id: "", name: "" },
    second: { id: "", name: "" },
    third: { id: "", name: "" },
  });

  useEffect(() => {
    getCategories().then((data) => {
      setListCategory((prev) => ({
        ...prev,
        first: data.rows,
      }));
    });

    const idBarcode = Date.now()
    setBarcode(idBarcode);
  }, []);

  const handleCategory = (e) => {
    console.log(e.target.value);
    const splitWord = e.target.value.split("-");

    setListCategorySelected((prev) => ({
      ...prev,
      [e.target.name]: { id: splitWord[0], name: splitWord[1] },
    }));

    if (e.target.name === "first") {
      const { category_child_1 } = listCategory.first.find(
        (item) => item.name === splitWord[1]
      );

      setListCategory((prev) => ({ ...prev, second: category_child_1 }));
    }

    if (e.target.name === "second") {
      const { category_child_2 } = listCategory.second.find(
        (item) => item.name === splitWord[1]
      );
      setListCategory((prev) => ({ ...prev, third: category_child_2 }));
    }
  };

  //etalase
  const [listEtalase, setListEtalase] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      const etalaseMap = {};
      data.forEach((product) => {
        etalaseMap[product.etalase] = true;
      });
      const uniqueEtalases = Object.keys(etalaseMap);
      setListEtalase(uniqueEtalases);
      // console.log(uniqueEtalases);
    });
  }, []);

  const handleEtalaseChange = (e) => {
    setEtalase(e.target.value);
  };

  //Related products
  const [listRelatedProduct, setListRelatedProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState("");
  const [selectedRelatedProducts, setSelectedRelatedProducts] = useState([]);
  const [listCrossProduct, setListCrossProduct] = useState([]);
  const [crossProduct, setCrossProduct] = useState("");
  const [selectedCrossProducts, setSelectedCrossProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setListRelatedProduct(data);
      setListCrossProduct(data);
    });
  }, []);

  const handleRealtedChange = (e) => {
    const selectedProduct = listRelatedProduct.find(
      (product) => product.name === e.target.value
    );

    if (selectedProduct) {
      setSelectedRelatedProducts([...selectedRelatedProducts, selectedProduct]);
    }
    setRelatedProduct(""); // Clear input setelah produk terkait dipilih
  };

  const handleRemoveRelatedProduct = (index) => {
    const updatedRelatedProducts = [...selectedRelatedProducts];
    updatedRelatedProducts.splice(index, 1);
    setSelectedRelatedProducts(updatedRelatedProducts);
  };
  //cross
  const handleCrossChange = (e) => {
    const crossProduct = listCrossProduct.find(
      (product) => product.name === e.target.value
    );

    if (crossProduct) {
      setSelectedCrossProducts([...selectedCrossProducts, crossProduct]);
    }
    setCrossProduct(""); // Clear input setelah produk terkait dipilih
  };

  const handleRemoveCrossProduct = (index) => {
    const updatedRelatedProducts = [...selectedCrossProducts];
    updatedRelatedProducts.splice(index, 1);
    setSelectedCrossProducts(updatedRelatedProducts);
  };
  const collection = [
    { value: 1, label: "Electronic" },
    { value: 8, label: "Strawberry" },
    { value: 2, label: "Mobile" },
    { value: 3, label: "Iphone" },
    { value: 4, label: "Printer" },
    { value: 5, label: "Office" },
    { value: 6, label: "IT" },
    { value: 7, label: "Milna" },
    { value: 9, label: "Bubur" },
    { value: 10, label: "Bubur Bayi" },
  ];

  return (
    <div className="flex flex-wrap gap-5 justify-evenly p-4 text-black">
      <div className=" mx-auto mt-8 p-6 bg-white rounded-md shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Tambah Produk</h1>
        <form>
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
              id="image"
              name="image"
              accept="image/*"
              ref={fileRef}
              onChange={handleImageChange}
              required
              className="w-full px-4 py-2 rounded-md border bg-[#f9f9f9] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Kategori1" className="block font-medium mb-2">
              Kategori1
            </label>
            <select
              id="first"
              name="first"
              value={listCategorySelected.first.name}
              onChange={handleCategory}
              required
              className="w-full px-4 py-2 rounded-md border bg-[#f9f9f9] focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              {listCategory.first &&
                listCategory.first.map((category, i) => (
                  <option key={i} value={category.id + "-" + category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          {listCategory.second.length !== 0 && (
            <div className="mb-4">
              <label htmlFor="Kategori2" className="block font-medium mb-2">
                Kategori ke-2
              </label>
              <select
                id="second"
                name="second"
                value={listCategorySelected.second.name}
                onChange={handleCategory}
                required
                className="w-full px-4 py-2 rounded-md border bg-[#f9f9f9] focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled>
                  Pilih Kategori
                </option>
                {listCategory.second.map((category, i) => (
                  <option key={i} value={category.id + "-" + category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {listCategory.third.length !== 0 && (
            <div className="mb-4">
              <label htmlFor="Kategori2" className="block font-medium mb-2">
                Kategori ke-3
              </label>
              <select
                id="third"
                name="third"
                value={listCategorySelected.third.name}
                onChange={handleCategory}
                required
                className="w-full px-4 py-2 rounded-md border bg-[#f9f9f9] focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled>
                  Pilih Kategori
                </option>
                {listCategory.third.map((category, i) => (
                  <option key={i} value={category.id + "-" + category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="etalase" className="block font-semibold mb-2">
              Etalase
            </label>
            <input
              type="text"
              id="etalase"
              name="etalase"
              value={etalase}
              onChange={handleEtalaseChange}
              list="etalaseOptions" // Menghubungkan input dengan elemen datalist
              className="w-[250px] px-4 py-2  rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500"
            />
            <datalist id="etalaseOptions">
              {listEtalase.map((etalase, i) => (
                <option key={i} value={etalase}>
                  {etalase}
                </option>
              ))}
            </datalist>
          </div>

          <div className="mb-4">
            <label htmlFor="spesification" className="block font-semibold mb-2">
              Spesification
            </label>
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleDataChange(data, "specification");
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold mb-2">
              Description
            </label>
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleDataChange(data, "description");
              }}
            />
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
                onChange={(e) =>
                  setHargaTampil(e.target.value.replace(/0-9/ ^ g, ""))
                }
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
                disabled
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
              name="stockStatus"
              value={data.stockStatus}
              onChange={(e) => handleDataChange(e.target.value, e.target.name)}
              required
              className="w-full px-4 py-2 rounded-md border bg-[#f9f9f9] focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Pilih status
              </option>
              <option value="in_stock">in Stock</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="on_backorder">On BackOrder</option>
            </select>
          </div>
          <div className="shipping mb-4">
            <p>Shipping</p>
            <div className="flex">
              <div className="weight flex flex-col">
                <label htmlFor="">Weight (g)</label>
                <input
                  type="text"
                  name="weight"
                  value={data.weight}
                  onChange={(e) =>
                    handleDataChange(e.target.value, e.target.name)
                  }
                  className="mr-2 border h-9 rounded-md bg-[#f9f9f9]"
                />
              </div>
              <div className="Length flex flex-col">
                <label htmlFor="">Length (cm)</label>
                <input
                  type="text"
                  name="length"
                  value={data.length}
                  onChange={(e) =>
                    handleDataChange(e.target.value, e.target.name)
                  }
                  className="mr-2 border h-9 rounded-md bg-[#f9f9f9]"
                />
              </div>
            </div>
            <div className="flex">
              <div className="wide flex flex-col">
                <label htmlFor="">Wide (cm)</label>
                <input
                  type="text"
                  name="wide"
                  value={data.wide}
                  onChange={(e) =>
                    handleDataChange(e.target.value, e.target.name)
                  }
                  className="mr-2 border h-9 rounded-md bg-[#f9f9f9]"
                />
              </div>
              <div className="Length flex flex-col">
                <label htmlFor="">Height (cm)</label>
                <input
                  type="text"
                  name="height"
                  value={data.height}
                  onChange={(e) =>
                    handleDataChange(e.target.value, e.target.name)
                  }
                  className="mr-2 border h-9 rounded-md bg-[#f9f9f9]"
                />
              </div>
            </div>
          </div>

          {/* <div className="atributes p-4">
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
          </div> */}

          <div className="relatedProduct flex flex-col">
            <label htmlFor="relatedProduct">Related products</label>
            <input
              type="text"
              id="relatedProduct"
              name="relatedProduct"
              value={relatedProduct}
              onChange={handleRealtedChange}
              list="relatedOptions" // Menghubungkan input dengan elemen datalist
              className="w-[250px] px-4 py-2  rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500"
            />
            <datalist id="relatedOptions">
              {listRelatedProduct.map((related, i) => (
                <option key={i} value={related.name}></option>
              ))}
            </datalist>
            <div className="selected-related-products mt-5">
              <h2>Related Products Selected:</h2>
              <div className="p-5">
                {selectedRelatedProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-3"
                  >
                    <div className="flex gap-5 items-center">
                      <img
                        className="h-20 w-20 mr-3"
                        src={`https://kuro.asrofur.me/sober/${product.images}`}
                        alt=""
                      />
                      <h1 className="font-medium text-blue-400">
                        {product.name}
                      </h1>
                    </div>
                    <button
                      onClick={() => handleRemoveRelatedProduct(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <label htmlFor="Cross-selling">Cross-selling products</label>
            <input
              type="text"
              id="Cross-selling"
              name="Cross-selling"
              value={crossProduct}
              onChange={handleCrossChange}
              list="crossOptions" // Menghubungkan input dengan elemen datalist
              className="w-[250px] px-4 py-2  rounded-md bg-[#f9f9f9] border focus:outline-none focus:border-blue-500"
            />
            <datalist id="crossOptions">
              {listCrossProduct.map((cross, i) => (
                <option key={i} value={cross.name}></option>
              ))}
            </datalist>
            <div className="selected-cross-products mt-5">
              <h2>Cross Products Selected:</h2>
              <div className="p-5">
                {selectedCrossProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-3"
                  >
                    <div className="flex items-center">
                      <img
                        className="h-20 w-20 mr-3"
                        src={`https://kuro.asrofur.me/sober/${product.images}`}
                        alt=""
                      />
                      <h1 className="font-medium text-blue-400">
                        {product.name}
                      </h1>
                    </div>
                    <button
                      onClick={() => handleRemoveCrossProduct(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
              onClick={handleFormSubmit}
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
            <option value="6">Xiaomi</option>
            <option value="7">Sunco</option>
            <option value="8">Indomie</option>
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
          <Select
            className="max-w-sm"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={collection}
            onChange={(e) => {
              handleDataChange(
                e.map((item) => item.value),
                "tags"
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InputForm;
