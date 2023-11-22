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
import { getOrders } from "../../../utils/ApiConfig";
import { Link } from "react-router-dom";
import { formatDate, getPaymentStatus, getStatus } from "../../../utils/utils";

const NewOrders = () => {
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [orderByCreatedAt, setOrderByCreatedAt] = useState("desc"); // Tambah state ini
  // ...

useEffect(()=>{
  getOrders().then((data)=>{
    setTransactions(data)
  })
})

  const sortedData = [...transactions].sort((a, b) => {
    if (orderBy === "created_at") {
      // Jika sedang mengurutkan berdasarkan "created_at"
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return orderByCreatedAt === "asc" ? dateA - dateB : dateB - dateA;
    }

    const valueA = a[orderBy];
    const valueB = b[orderBy];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return 0;
    }
  });

  return (
    <div>
      <h1 className="text-[20px] font-bold px-8">Recent Orders</h1>
      <Card className="mt-5 w-full">
        <CardContent className="sm:w-auto">
          <div className="overflow-x-auto">
            <TableContainer component={Paper} className="min-w-full">
              <Table aria-label="custom table" className="min-w-full">
                <TableHead className="text-black">
                  <TableRow className="text-black font-semibold">
                    <TableCell className="text-black ">ID</TableCell>
                    <TableCell>CREATED AT</TableCell>
                    <TableCell>CUSTOMER</TableCell>
                    <TableCell>PAYMENT</TableCell>
                    <TableCell>STATUS</TableCell>
                    <TableCell>TOTAL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.slice(0, 5).map((transaction) => (
                    <TableRow key={transaction?.id}>
                      <TableCell className="text-blue-500">
                        {transaction?.code}
                      </TableCell>
                      <TableCell>
                        {formatDate(transaction?.payment_order?.created_at)}
                      </TableCell>
                      <TableCell className="text-blue-500 font-bold">
                        {transaction?.order_addresses?.name}
                      </TableCell>

                      <TableCell>
                        {getPaymentStatus(transaction?.payment_order?.status)}
                      </TableCell>
                      <TableCell>{getStatus(transaction?.status)}</TableCell>
                      <TableCell>{transaction?.sub_total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
        <div className="p-4">
          <Link className="text-blue-400 font-semibold" to={"/venOrders"}>
            View Full Orders
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default NewOrders;
