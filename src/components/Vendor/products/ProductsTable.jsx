import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TextField,
} from "@mui/material";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { MdOutlineArrowDropDown, MdEdit, MdDelete } from "react-icons/md";
import { TbFileExport, TbReload } from "react-icons/tb";
import { FaFileCsv } from "react-icons/fa";
import { ArrowUpward, ArrowDownward, Search } from "@mui/icons-material";
import axios from "axios";
import { deleteProducts, getProducts } from "../../../utils/ApiConfig";
import Swal from "sweetalert2";
import { formatDate, getStatusProducts } from "../../../utils/utils";

const ProductsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [exportOpen, setexportOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [limit, setLimit] = useState(1000); // State untuk menyimpan nilai limit produk yang ditampilkan
  const [orderByOptions, setOrderByOptions] = useState([
    "termurah",
    "termahal",
    "terbaru",
    "terlaris",
    "etalase",
  ]);

  const [selectedOrderBy, setSelectedOrderBy] = useState("termurah"); // Nilai orderby default

  // useEffect(() => {
  //   getProducts().then((data) => {
  //     setProducts(data);
  //   });
  // }, []);

  const toggleExport = () => {
    setexportOpen(!exportOpen);
  };

  const handleChangeLimit = (event) => {
    setLimit(event.target.value);
  };

  const handleSort = (property) => {
    let orderByValue = property;

    // Jika properti yang di-pass sama dengan orderBy yang sedang digunakan, ubah urutan (asc/desc)
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");

    // Atur orderByValue sesuai dengan nama kolom yang diperlukan untuk API request
    switch (property) {
      case "no":
        orderByValue = "id";
        break;
      case "thumbnail":
        orderByValue = "thumbnail";
        break;
      case "name":
        orderByValue = "name";
        break;
      case "price":
        orderByValue = "price";
        break;
      case "quantity":
        orderByValue = "quantity";
        break;
      case "sku":
        orderByValue = "sku";
        break;
      case "order":
        orderByValue = "order";
        break;
      case "CreatedAt":
        orderByValue = "created_at";
        break;
      case "status":
        orderByValue = "status";
        break;
      default:
        break;
    }

    setOrderBy(orderByValue);
    setLoading(true); // Set loading ke true saat proses fetching data baru
    getProductsData(); // Ambil produk berdasarkan orderBy yang baru
  };

  useEffect(() => {
    setLoading(true);
    getProductsData(); // Fetch products on initial load
  }, []);

  const getProductsData = () => {
    let orderBy = "id"; // Orderby default jika tidak ada yang dipilih

    switch (selectedOrderBy) {
      case "termurah":
        orderBy = "termurah";
        break;
      case "termahal":
        orderBy = "termahal";
        break;
      case "terbaru":
        orderBy = "terbaru";
        break;
      case "terlaris":
        orderBy = "terlaris";
        break;
      case "etalase":
        orderBy = "etalase";
        break;
      default:
        orderBy = "id";
        break;
    }

    getProducts(limit, searchTerm, orderBy)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleOrderByChange = (event) => {
    setSelectedOrderBy(event.target.value);
    setLoading(true); // Set loading to true while fetching new data
    getProductsData(); // Fetch products based on the selected orderby
  };
  const handleReloadClick = () => {
    getProductsData(); // Fetch products based on
  };

  const filteredData = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const etalaseName = product.etalase ? product.etalase.toLowerCase() : "";
    return (
      etalaseName.includes(searchTerm.toLowerCase()) ||
      productName.includes(searchTerm.toLowerCase())
    );
  });

  const headers = [
    {
      label: "id",
      key: "id",
    },
    {
      label: "Thumbnail",
      key: "thumbnail",
    },
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Price",
      key: "price",
    },
    {
      label: "Quantity",
      key: "quantity",
    },
    {
      label: "SKU",
      key: "SKU",
    },
    {
      label: "Order",
      key: "order",
    },
    {
      label: "Created At",
      key: "created_at",
    },
    {
      label: "Status",
      key: "status",
    },
  ];

  const DataSet = [
    {
      data: filteredData.map((data) => ({
        id: data?.id,
        thumbnail: "https://kuro.asrofur.me/sober/" + data.images,
        name: data?.name,
        price: data?.price,
        quantity: data?.quantity,
        sku: data?.sku,
        order: data?.order,
        created_at: data?.created_at,
        status: data?.status,
      })),
    },
  ];

  const csvLinkProps = {
    filename: "Products.csv",
    headers: headers,
    data: DataSet[0].data, // Access the data property from DataSet
  };
  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(DataSet[0].data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Products.xlsx");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Fungsi untuk mengubah jumlah baris per halaman
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (rowId) => {
    deleteProducts(rowId)
      .then(() => {
        // Perbarui daftar transaksi setelah penghapusan berhasil
        setProducts((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.id !== rowId)
        );
        Swal.fire("Success", "Transaction deleted successfully", "success");
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error", "Failed to delete transaction", "error");
      });
  };

  const confirmDelete = (rowId) => {
    Swal.fire({
      title: "Are You sure, want to delete?",
      text: "Row will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      cancelButtonColor: "#FFC107",
      confirmButtonColor: "#0DCAF0",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(rowId); //
      }
    });
  };

  return (
    <Card className="mt-5 w-full">
      <div className="p-2 flex flex-col md:flex-row justify-between">
        <div className="relative">
          <select
            value={selectedOrderBy}
            onChange={handleOrderByChange}
            className="px-4 py-2 bg-white rounded-lg border border-gray-300"
          >
            {orderByOptions.map((option, index) => (
              <option key={index} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
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
        <div className="action flex text-white flex-col sm:w-[100%] md:flex-row space-x-0 md:space-x-3 font-semibold text-[12px] ">
          <div className="relative">
            <button
              className="flex px-4 py-2 bg-[#36C6D3] rounded-lg"
              onClick={toggleExport}
            >
              <TbFileExport className="mr-1 mt-[2px] bg-[#36C6D3]" />
              Export <MdOutlineArrowDropDown className="bg-[#36C6D3]" />
            </button>
            {exportOpen && (
              <div className="absolute w-[100px] text-black p-2 right-0 mt-2 border border-gray-300 rounded-lg">
                <ul className="p">
                  <li className=" p-1 font-medium items-center hover:bg-[#36C6D3] rounded-lg ">
                    {" "}
                    <CSVLink className="flex" {...csvLinkProps}>
                      <FaFileCsv className="mr-1" />
                      <p className="mt-[-2px]">Csv</p>
                    </CSVLink>
                  </li>
                  <li className="flex cursor-pointer p-1 font-medium items-center hover:bg-[#36C6D3] rounded-lg ">
                    <FaFileCsv className="mr-1" />
                    <p onClick={handleExportToExcel}>Excel</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
            className="bg-[#36C6D3] flex justify-between p-2 h-[2.5rem] w-full md:w-[6rem] rounded-md mt-2 md:mt-0"
            onClick={handleReloadClick}
          >
            <TbReload className="text-lg mt-1" />
            Reload
          </button>

          <Link to="/VenCreateProduct">
            <button className="bg-[#36C6D3] flex justify-between p-2 h-[2.5rem] w-full md:w-[6rem] rounded-lg mt-2 md:mt-0">
              <TbReload className="text-lg mt-1" />
              Create
            </button>
          </Link>
        </div>
      </div>

      <CardContent className="sm:w-auto">
        <div className="overflow-x-auto">
          <TableContainer component={Paper} className="min-w-full">
            <Table aria-label="custom table" className="min-w-full">
              <TableHead className="text-black">
                <TableRow className="text-black">
                  <TableCell className="text-black ">
                    <Button onClick={() => handleSort("no")}>
                      No
                      {orderBy === "no" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button onClick={() => handleSort("thumbnail")}>
                      Thumbnail
                      {orderBy === "thumbnail" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleSort("name")}>
                      Name
                      {orderBy === "name" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleSort("price")}>
                      Price
                      {orderBy === "price" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleSort("quantity")}>
                      Quantity
                      {orderBy === "quantity" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleSort("sku")}>
                      Sku
                      {orderBy === "sku" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleSort("order")}>
                      Order
                      {orderBy === "order" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleSort("CreatedAt")}>
                      Created At
                      {orderBy === "CreatedAt" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleSort("status")}>
                      Status
                      {orderBy === "status" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <TableRow key={product?.id}>
                      <TableCell className="whitespace-nowrap">
                        {product?.id}
                      </TableCell>
                      <TableCell>
                        <img
                          className="h-14 w-14"
                          src={
                            "https://kuro.asrofur.me/sober/" + product.images
                          }
                          alt=""
                        />
                      </TableCell>
                      <TableCell>{product?.name}</TableCell>
                      <TableCell>{product?.price}</TableCell>
                      <TableCell>{product?.quantity}</TableCell>
                      <TableCell>{product?.sku}</TableCell>
                      <TableCell>{product?.order}</TableCell>
                      <TableCell>{formatDate(product?.created_at)}</TableCell>
                      <TableCell>
                        {getStatusProducts(product?.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Link to={`/VenProducts/edit/${product.id}`}>
                            <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                              <MdEdit />
                            </button>
                          </Link>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded-md"
                            onClick={() => confirmDelete(product.id)} // Implement the handleDelete function
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length} // Sementara ini menggunakan panjang data lokal, akan diperbarui
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsTable;
