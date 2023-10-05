import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { MdOutlineArrowDropDown, MdEdit, MdDelete } from "react-icons/md";
import { TbFileExport, TbReload } from "react-icons/tb";
import { FaFileCsv } from "react-icons/fa";
import { ArrowUpward, ArrowDownward, Search } from "@mui/icons-material";
import { deleteOrderReturns, getOrderReturns } from "../../../utils/ApiConfig";
import Swal from "sweetalert2";
import { formatDate, getStatus } from "../../../utils/utils";

const OrderReturnsTable = (props) => {
  const [orderReturns, setOrderReturns] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [exportOpen, setexportOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null); // Store the ID of the row to delete

  useEffect(() => {
    // Panggil getOrders untuk mengambil data dari API saat komponen dimuat
    getOrderReturns()
      .then((data) => {
        
        // Gunakan data yang dikembalikan dari getOrders di sini
        console.log(data);
        setOrderReturns(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const toggleExport = () => {
    setexportOpen(!exportOpen);
  };



  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = orderBy
    ? [...orderReturns].sort((a, b) => {
        const valueA = a[orderBy];
        const valueB = b[orderBy];
        const comparison = order === "asc" ? -1 : 1;

        // Perform the comparison based on data types (numbers or strings)
        if (typeof valueA === "number" && typeof valueB === "number") {
          return (valueA - valueB) * comparison;
        } else {
          return valueA.localeCompare(valueB) * comparison;
        }
      })
    : orderReturns;

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setPage(0); // Reset the page to the first page when searching
  };

  const filteredData = sortedData.filter((row) => {
    const valuesToSearch = [
      row.id.toString(),
      row.ec_order?.code,
      row.ec_order?.customer_order?.name,
      row.ec_order?.order_product?.qty.toString(),
      row.ec_order?.status,
      formatDate(row.created_at), // Assuming formatDate returns a string
    ];

    // Check if any value contains the search term
    return valuesToSearch.some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const confirmDelete = async () => {
    if (rowToDelete !== null) {
      await deleteData(rowToDelete);
    }
    setRowToDelete(null); // Clear the rowToDelete
  };

  const deleteData = async (rowId) => {
    try {
      const apiUrl = `https://kuro.asrofur.me/sober/api/transaction/vendor/return/${rowId}`;
      const bearerToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJlbWFpbCI6InNvYmVyb2ZmaWNpYWxAZ21haWwuY29tIiwiaWF0IjoxNjk1Mjc4MDQ0LCJleHAiOjE2OTUzNjQ0NDR9.gTdleJdGE7IVNxnBzOvBGZGWg50yAB1pTbfOsLXF_7s";

      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (response.status === 200) {
        console.log("Success! Data deleted from API.");
        console.log("Response data:", response.data); // Cetak respons data
        // Data berhasil dihapus dari API, sekarang update state
        const updatedData = orderReturns.filter((row) => row.id !== rowId);
        setTransactions(updatedData);
        setRowToDelete(null); // Reset rowToDelete setelah berhasil dihapus
      } else {
        console.error(
          "Failed to delete data from API. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error deleting data:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const handleDeleteClick = (rowId) => {
    setRowToDelete(rowId); // Set ID baris yang akan dihapus saat tombol "Delete" pada baris diklik
  };
  const headers = [
    {
      label: "id",
      key: "id",
    },
    {
      label: "Order Id",
      key: "orderId",
    },
    {
      label: "Customer",
      key: "customer",
    },
    {
      label: "Product Item",
      key: "productItem",
    },
    {
      label: "Status",
      key: "status",
    },
    {
      label: "Created At",
      key: "created_at",
    },
  ];
  const DataSet = [
    {
      data: paginatedData.map((data) => ({
        id: data?.id,
        orderId: data?.ec_order?.code,
        customer: data?.ec_order?.customer_order?.name,
        productItem: data?.ec_order?.order_product?.qty,
        status: data?.ec_order?.status,
        created_at: data?.created_at,
      })),
    },
  ];

  const csvLinkProps = {
    filename: "OrderReturns.csv",
    headers: headers,
    data: DataSet[0].data, // Access the data property from DataSet
  };

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(DataSet[0].data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Order Returns.xlsx");
  };
  return (
    <Card className="mt-5 w-full text-[10px]">
      <div className="p-2 flex flex-col md:flex-row justify-between">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginLeft: "auto", marginRight: "16px" }}
          InputProps={{
            endAdornment: <Search />,
          }}
        />
        <div className="action text-white flex flex-col md:flex-row space-x-0 md:space-x-3 font-semibold text-[12px] ">
          <div className="relative">
            <button
              className="flex gap-2 px-4 py-2 bg-[#36C6D3] rounded-lg"
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
          <button className="bg-[#36C6D3] h-[2.5rem]  rounded-lg mt-2 md:mt-0">
            <a className="flex gap-2 p-2" href="">
              {" "}
              <TbReload className=" mt-[2px] text-lg" />
              Reload
            </a>
          </button>
        </div>
      </div>

      <CardContent>
        <div className="overflow-x-auto">
          <TableContainer component={Paper} className="min-w-full">
            <Table aria-label="custom table" className="min-w-full">
              <TableHead className="text-black">
                <TableRow className="text-black">
                  <TableCell className="text-black ">
                    <Button onClick={() => handleSort("id")}>
                      ID
                      {orderBy === "id" ? (
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
                  <TableCell className="text-black ">
                    <Button onClick={() => handleSort("OrderId")}>
                      Order Id
                      {orderBy === "OrderId" ? (
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
                    <Button onClick={() => handleSort("Customer")}>
                      Customer
                      {orderBy === "Customer" ? (
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
                    <Button onClick={() => handleSort("ProductItem")}>
                      Product Item
                      {orderBy === "ProductItem" ? (
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
                    <Button onClick={() => handleSort("Status")}>
                      Status
                      {orderBy === "Status" ? (
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
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((orderReturn) => (
                  <TableRow key={orderReturn.id}>
                    <TableCell className="whitespace-nowrap">
                      {orderReturn.id}
                    </TableCell>
                    <TableCell>{orderReturn.ec_order?.code}</TableCell>
                    <TableCell>
                      {orderReturn?.ec_order?.customer_order?.name}
                    </TableCell>
                    <TableCell>
                      {orderReturn?.ec_order?.order_product?.qty}
                    </TableCell>
                    <TableCell>
                      {getStatus(orderReturn?.ec_order?.status)}
                    </TableCell>
                    <TableCell>{formatDate(orderReturn?.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                          <MdEdit />
                        </button>

                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                          onClick={() => handleDeleteClick(orderReturn.id)}
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
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </div>
      </CardContent>
      {rowToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-[14]">
          <div className="bg-white p-6 rounded-lg">
            <p>Are you sure, you want to delete this row??</p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="bg-red-600 text-white px-3 py-1 rounded-md"
                onClick={confirmDelete}
              >
                delete
              </button>
              <button
                className="bg-gray-300 text-black px-3 py-1 rounded-md"
                onClick={() => setRowToDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default OrderReturnsTable;
