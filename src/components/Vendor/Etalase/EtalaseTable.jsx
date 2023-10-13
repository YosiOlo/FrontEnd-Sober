import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { getDataEtalase } from "../../../utils/ApiConfig";
import { Link } from "react-router-dom";
import { TablePagination, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

import ClipLoader from "react-spinners/ClipLoader";

const EtalaseTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataEtalase().then((data) => {
      const groupedData = data.reduce((acc, item) => {
        const key = item.etalase;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});

      const formattedData = Object.keys(groupedData).map((key) => {
        return {
          etalase: key,
          products: groupedData[key],
        };
      });

      setData(formattedData);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = data.slice(startIndex, endIndex);
  const filteredData = displayedData.filter((etalase) => {
    return (
      etalase.etalase.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etalase.products.some((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const handleEdit = (data) => {
    console.log("Edit clicked for", data);
  };

  const handleDeleteClick = (data, product) => {
    console.log("Delete clicked for", data, product);
  };

  return (
    <div className="p-4 rounded-md shadow-lg">
      <div className="mb-4">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginLeft: "auto", marginRight: "16px" }}
          InputProps={{
            endAdornment: <Search />,
          }}
        />
      </div>
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
            filteredData.map((etalase, index) => (
              <tr key={index}>
                <td className="border-b border-gray-300 mt-[-30px]">
                  {index + 1}
                </td>
                <td className="border-b border-gray-300">
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-4">
                      <h2 className="text-blue-500">{etalase.etalase}</h2>
                      <div className="flex gap-2">
                        <Link to={`/VenEtalase/edit/${etalase.id}`}>
                          <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                            <MdEdit />
                          </button>
                        </Link>

                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                          onClick={() => confirmDelete(etalase.id)}
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
                                src={`https://kuro.asrofur.me/sober/${product.images[0]}`}
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
              <td colSpan="2">
                <ClipLoader
                  color={"#0DCAF0"}
                  loading={loading}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length} // Use data.length as the total count
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </div>
  );
};

export default EtalaseTable;
