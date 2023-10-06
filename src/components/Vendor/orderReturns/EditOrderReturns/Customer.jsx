import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiMessageFill } from "react-icons/ri";
import { TbPhoneCall } from "react-icons/tb";
import {
  getOrderReturnById,
} from "../../../../utils/ApiConfig";

function Customer() {
  const { id } = useParams();
  const [orderReturn, setOrderReturn] = useState([]);

  useEffect(() => {
    getOrderReturnById(id).then((data) => {
      setOrderReturn([data]);
    });
  });

  return (
    <div>
      {orderReturn.map((customer) => (
        <div key={customer.id}>
          <div className="card bg-white p-6">
            <div className="customer flex justify-between">
              <h1>Customer</h1>
              <img
                className="h-10 w-10"
                src={
                  "https://kuro.asrofur.me/sober/" +
                  customer?.ec_order?.customer_order?.avatar
                }
                alt=""
              />
            </div>
            <div className="dataCust border-b-[1px] border-b-slate-500 p-4">
              <p>{customer?.ec_order?.customer_order?.name}</p>
              <div className="detailOrders flex gap-2">
                <RiMessageFill className="mt-[0.3em]" />
                <p>8 Orders</p>
              </div>
              <p>{customer?.ec_order?.customer_order?.email}</p>
              <p>Have an account already</p>
            </div>

            <div className="addres border-b-[1px] border-b-slate-500 p-4">
              <h1>Address</h1>
              <p>{customer?.ec_order?.customer_order?.name}</p>
              <div className="number flex gap-2">
                <TbPhoneCall className="mt-[0.3em]" />
                <p>{customer?.ec_order?.customer_order?.phone}</p>
              </div>
              <p>Jl Ahmad Yani, Wonocolo Surabaya Jawa Timur Indonesia</p>
              <a className="text-blue-500" href="">
                See On Map
              </a>
            </div>

            <div className="reason">
              <h1>Return Reason</h1>
              <p className="text-red-500">other</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Customer;
