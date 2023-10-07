import React, { useState, useEffect } from "react";
import { GrCompliance } from "react-icons/gr";
import UpdateShipping from "./UpdateShippingButton";
import { FaShippingFast } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { getOrdersById } from "../../../../utils/ApiConfig";
import { formatDate1, getOrderConfirm } from "../../../../utils/utils";
import HistoryShipment from "./HistoryShipment";

function OrderInformation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  const historyData = [
    "Order was verified by System",
    "Order confirmed",
    "Order confirmed by",
    "New order #10000312 from adam",
    "The email confirmation was sent to customer",
  ];

  useEffect(() => {
    getOrdersById(id).then((data) => {
      setOrders([data]);
    });
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="shadow-lg">
      {orders.length > 0 &&
        orders.map((order) => (
          <div key={order.id}>
            <div className="card bg-white rounded-lg  text-[12px] ">
              <p className="font-semibold p-4">
                Order information {order?.code}
              </p>
              <div className="status flex p-4 gap-2 border-b-[1px] border-slate-200">
                <GrCompliance />
                <p className="font-bold text-[12px]">{order?.status}</p>
              </div>
              <div className="orders flex gap-3 p-4">
                <img
                  className="h-10 w-10 border"
                  src={
                    "https://kuro.asrofur.me/sober/" +
                    order?.order_product?.product_image
                  }
                  alt=""
                />
                <div className="detail">
                  <p>{order?.order_product?.product_name}</p>
                  <p className="text-[10px]">(Liter:2 lt)</p>
                  <p className="text-slate-300">150 completed</p>
                  <p>
                    Shipping{" "}
                    <span className="text-slate-400 font-bold">Default</span>{" "}
                  </p>
                </div>
                <p>
                  (SKU: <span className="font-semibold">1686191911-Liter</span>){" "}
                </p>
                <p>
                  Rp. {parseInt(order?.order_product?.price)} x{" "}
                  {order?.order_product?.qty}
                </p>
                <p>Rp. {parseInt(order?.sub_total)}</p>
              </div>
              <div className="rincian-harga flex justify-end gap-10 p-4">
                <div className="kolomKiri">
                  <p>Sub amount </p>
                  <p>Discount</p>
                  <div className="shippingFee">
                    <p>Shipping fee</p>
                    <p className="text-[10px]">Default</p>
                    <p className="text-[10px]">0.01 grams</p>
                  </div>
                  <div className="totalPayment">
                    <p>Total Amount</p>
                    <p className="text-[10px]">
                      {order?.payment_order?.payment_channel}
                    </p>
                  </div>
                </div>
                <div className="kolomKanan">
                  <p>Rp. {parseInt(order?.sub_total)}</p>
                  <p>Rp. {parseInt(order?.discount_amount)}</p>
                  <p className="mt-5">Rp. {parseInt(order?.shipping_amount)}</p>
                  <p className="mt-5">Rp. {parseInt(order?.amount)}</p>
                </div>
              </div>
              <div className="paidAmount flex justify-end gap-10 p-4 border-t-[1px] border-slate-200">
                <p>Paid Amount</p>
                <p>Rp. {parseInt(order?.payment_order?.amount)}</p>
              </div>
              <div className="invoice flex justify-end px-4">
                <button className="bg-[#0DCAF0] w-[150px] h-[30px] rounded-lg text-white">
                  Download Invoice
                </button>
              </div>
              <div className="notes">
                <p>Note</p>
              </div>

              <div className="confirmationOrders">
                {getOrderConfirm(order?.payment_order?.payment_type)}
              </div>
              <div className="deliveryStatus border-t-[1px] border-slate-200 p-4 flex gap-3">
                <AiFillCloseCircle className="text-white text-3xl bg-red-500 rounded-3xl p-1 " />
                <p className="mt-1">DELIVERY</p>
                <div className="id flex gap-4">
                  <h1>#10000312</h1>
                  <p className="bg-yellow-400 text-yellow-800 p-1 rounded-md ">
                    delivered
                  </p>
                </div>
              </div>
              <div className="desc p-4">
                <div className="shipping flex gap-9">
                  <p>Shipping method: {order?.shipping_method}</p>
                  <p>Weight (g): {order?.order_product?.weight} g</p>
                </div>
                <p>Last Update: {formatDate1(order?.updated_at)}</p>
              </div>
              <div className="bg-[#e6e5e5] p-2">
                <button
                  className="bg-[#0DCAF0] ml-2 text-white px-4 py-2 rounded flex gap-3"
                  onClick={openModal}
                >
                  <FaShippingFast className="text-white mt-1" />
                  Update Shipping Status
                </button>

                <UpdateShipping isOpen={isModalOpen} onClose={closeModal} />
              </div>
            </div>
            <div className="history mt-5 bg-white">
              <HistoryShipment historyData={historyData} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default OrderInformation;
