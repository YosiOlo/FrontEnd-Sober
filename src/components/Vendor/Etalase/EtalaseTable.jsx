import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { getDataEtalase } from "../../../utils/ApiConfig";
import { Link } from "react-router-dom";

const EtalaseTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataEtalase().then((data) => {
      // Kelompokkan data berdasarkan etalase
      const groupedData = data.reduce((acc, item) => {
        const key = item.etalase;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});

      // Ubah objek menjadi array
      const formattedData = Object.keys(groupedData).map((key) => {
        return {
          etalase: key,
          products: groupedData[key],
        };
      });

      setData(formattedData);
    });
  }, []);

  const handleEdit = (data) => {
    // Logika untuk handleEdit
    console.log("Edit clicked for", data);
  };

  const handleDeleteClick = (data, product) => {
    // Logika untuk handleDeleteClick
    console.log("Delete clicked for", data, product);
  };

  return (
    <div className="">
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>
              <div className="flex justify-between">
                <p>Etalase</p>
                <p>Operation</p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((etalase, index) => (
              <tr key={index}>
                <td className="border-b border-gray-300 mt-[-30px]">{index + 1}</td>
                <td className="border-b border-gray-300">
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-4">
                      <h2 className="text-blue-500">{etalase.etalase}</h2>
                      <div className="flex gap-2">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                          <MdEdit />
                        </button>

                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                          onClick={() => confirmDelete(orderReturn.id)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                    <table className="table">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th>No</th>
                          <th>Thumbnail</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>QTY</th>
                          <th>SKU</th>
                        </tr>
                      </thead>
                      <tbody>
                        {etalase.products.map((product, productIndex) => (
                          <tr key={productIndex}>
                            <td className="border-b border-gray-300 py-2 px-3">
                              {productIndex + 1}
                            </td>
                            <td className="border-b border-gray-300 py-2 px-3">
                              <img
                                className="h-14 w-14"
                                src={`https://kuro.asrofur.me/sober/${product.images}`}
                                alt=""
                              />
                            </td>
                            <td className="border-b border-gray-300 py-2 px-3 text-blue-500">
                              {product.name}
                            </td>
                            <td className="border-b border-gray-300 py-2 px-3">
                              {product.price}
                            </td>
                            <td className="border-b border-gray-300 py-2 px-3">
                              {product.quantity}
                            </td>
                            <td className="border-b border-gray-300 py-2 px-3">
                              {product.sku}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EtalaseTable;
