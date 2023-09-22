import React from "react";
import { RiMessageFill } from "react-icons/ri";
import { TbPhoneCall } from "react-icons/tb";

function Customer() {
  return (
    <div>
      <div className="card bg-white p-6">
        <div className="customer flex justify-between">
          <h1>Customer</h1>
          <img
            className="h-10 w-10"
            src="https://res.cloudinary.com/dap6ohre8/image/upload/v1692042539/roady/download_uqwfbi.png"
            alt=""
          />
        </div>
        <div className="dataCust border-b-[1px] border-b-slate-500 p-4">
          <p>Reziq Vins</p>
          <div className="detailOrders flex">
            <RiMessageFill />
            <p>8 Orders</p>
          </div>
          <p>bivoda1228@nmaller.com</p>
          <p>Have an account already</p>
        </div>

        <div className="addres border-b-[1px] border-b-slate-500 p-4">
            <h1>Address</h1>
          <p>Reziq Vins</p>
          <div className="number flex">
            <TbPhoneCall />
            <p>08123456789</p>
          </div>
          <p>Jl Ahmad Yani, Wonocolo Surabaya Jawa Timur Indonesia</p>
          <a className="text-blue-500" href="">See On Map</a>
        </div>
      <div className="reason">
        <h1>Return Reason</h1>
        <p className="text-red-500">other</p>
      </div>
      </div>
    </div>
  );
}

export default Customer;
