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
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { AiTwotoneReconciliation } from "react-icons/ai";
import { MdOutlineArrowDropDown, MdEdit, MdDelete } from "react-icons/md";
import { TbFileExport, TbReload } from "react-icons/tb";
import { FaFileCsv } from "react-icons/fa";
import { ArrowUpward, ArrowDownward, Search } from "@mui/icons-material";
import { deleteOrders, getOrders } from "../../../utils/ApiConfig";
import Swal from "sweetalert2";
import {
  formatDate,
  getPaymentMethod,
  getPaymentStatus,
  getStatus,
} from "../../../utils/utils";

const OrdersTable = () => {
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [exportData, setExportData] = useState([]);
  const [exportOpen, setexportOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getOrders()
      .then((data) => {
        setExportData(data);
        setTransactions(data);
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

  const sortedData = [...transactions].sort((a, b) => {
    const valueA = a[orderBy];
    const valueB = b[orderBy];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return 0; // Handle other data types or return 0 if no data type matches
    }
  });

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setPage(0); // Reset the page to the first page when searching
  };

  const filteredData = sortedData.filter((row) => {
    const valuesToSearch = [
      row.id.toString(),
      row.order_addresses?.name,
      row?.amount,
      row?.shipping_amount,
      row?.payment_order?.payment_channel,
      row?.payment_order?.status,
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

  const headers = [
    {
      label: "id",
      key: "id",
    },
    {
      label: "customer",
      key: "customer",
    },
    {
      label: "amount",
      key: "amount",
    },
    {
      label: "Shipping Amount",
      key: "shipping_amount",
    },
    {
      label: "Payment Method",
      key: "payment_channel",
    },
    {
      label: "Payment Status",
      key: "payment_status",
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
        customer: data?.order_addresses?.name,
        amount: data?.amount,
        shipping_amount: data?.shipping_amount,
        payment_channel: data?.payment_order?.payment_channel,
        payment_status: data?.payment_order?.status,
        status: data?.status,
        created_at: data?.payment_order?.created_at,
      })),
    },
  ];

  const csvLinkProps = {
    filename: "Orders.csv",
    headers: headers,
    data: DataSet[0].data, // Access the data property from DataSet
  };

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(DataSet[0].data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Orders.xlsx");
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();

    // Define columns for the table
    const columns = [
      { title: "ID", dataKey: "id" },
      { title: "Customer", dataKey: "customer" },
      { title: "Amount", dataKey: "amount" },
      { title: "Shipping Amount", dataKey: "shipping_amount" },
      { title: "Payment Method", dataKey: "payment_channel" },
      { title: "Payment Status", dataKey: "payment_status" },
      { title: "Status", dataKey: "status" },
      { title: "Created At", dataKey: "created_at" },
    ];

    // Define rows for the table
    const rows = paginatedData.map((transaction) => ({
      id: transaction?.id,
      customer: transaction?.order_addresses?.name,
      amount: transaction?.amount,
      shipping_amount: transaction?.shipping_amount,
      payment_channel: transaction?.payment_order?.payment_channel,
      payment_status: transaction?.payment_order?.status,
      status: transaction?.status,
      created_at: formatDate(transaction?.payment_order?.created_at),
    }));

    // Convert rows into a format compatible with autoTable
    const tableRows = rows.map((row) => Object.values(row));

    doc.autoTable({
      head: [columns.map((column) => column.title)],
      body: tableRows,
      startY: 20, // Start the table 20 units from the top
    });


    doc.save("Orders.pdf");

  };

  const handleDelete = (rowId) => {
    deleteOrders(rowId)
      .then(() => {
        // Perbarui daftar transaksi setelah penghapusan berhasil
        setTransactions((prevTransactions) =>
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
        <div className="action text-white flex flex-col sm:w-[100%] md:flex-row space-x-0 md:space-x-3 font-semibold text-[12px] ">
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
          <button
            className="bg-[#36C6D3] h-[2.5rem]  rounded-lg mt-2 md:mt-0"
            onClick={handleExportToPDF}
          >
            <a className="flex gap-2 p-2 " href="#">
              {" "}
              <AiTwotoneReconciliation className=" mt-[2px]  text-lg" />
              Rekap Pesanan
            </a>
          </button>
        </div>
      </div>

      <CardContent className="sm:w-auto">
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
                    <Button onClick={() => handleSort("Amount")}>
                      Amount
                      {orderBy === "Amount" ? (
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
                    <Button onClick={() => handleSort("ShippingAmount")}>
                      Shipping Amount
                      {orderBy === "ShippingAmount" ? (
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
                    <Button onClick={() => handleSort("PaymentMethod")}>
                      Payment Method
                      {orderBy === "PaymentMethod" ? (
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
                    <Button onClick={() => handleSort("PaymentStatus")}>
                      Payment Status
                      {orderBy === "PaymentStatus" ? (
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
                {paginatedData.map((transaction) => (
                  <TableRow key={transaction?.id}>
                    <TableCell className="whitespace-nowrap">
                      {transaction?.id}
                    </TableCell>
                    <TableCell>{transaction?.order_addresses?.name}</TableCell>
                    <TableCell>{transaction?.amount}</TableCell>
                    <TableCell>{transaction?.shipping_amount}</TableCell>
                    <TableCell>
                      {getPaymentMethod(
                        transaction?.payment_order?.payment_channel
                      )}
                    </TableCell>
                    <TableCell>
                      {getPaymentStatus(transaction?.payment_order?.status)}
                    </TableCell>
                    <TableCell>{getStatus(transaction?.status)}</TableCell>
                    <TableCell>
                      {formatDate(transaction?.payment_order?.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/VenOrder/edit/${transaction.id}`}>
                          <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                            <MdEdit />
                          </button>
                        </Link>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                          onClick={() => confirmDelete(transaction.id)} // Implement the handleDelete function
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
    </Card>
  );
};

export default OrdersTable;
