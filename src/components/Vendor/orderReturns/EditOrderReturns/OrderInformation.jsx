import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthToken, getOrderReturnById, getOrderReturns } from "../../../../utils/ApiConfig";
import axios from "axios";

function OrderInformation() {
  const { id } = useParams();
  const [orderReturn, setOrderReturn] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      const authToken = getAuthToken();
      try {
        const response = await axios.get(
          `https://kuro.asrofur.me/sober/api/transaction/vendor/returns/details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setOrderReturn([response.data.data]);
        console.log("Order Data:", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrderData();
  }, [id]);

  return (
    <div>
      <div className="card bg-white rounded-lg w-[700px] gap-3 break-words">
        <div className="header p-4 border-b-[1px] border-black">
          <p className="font-semibold">Order information</p>
        </div>
        {orderReturn.length > 0 && orderReturn.map((orderReturnItem) => (
          <div key={orderReturnItem.id}>
            <div className="description flex p-4 ">
              <img
                className="h-10 w-10"
                src={`https://kuro.asrofur.me/sober/${orderReturnItem?.ec_order?.order_product?.product_image}`}
                alt=""
              />
              <div className="orders w-[65%] ml-3">
                <p className="font-medium">
                  {orderReturnItem?.ec_order?.order_product?.product_name}
                </p>
                <p className="text-[12px]">Size Sepatu: 36, Color: Maroon</p>
              </div>
              <p className="ml-4">
                {`Rp. ${orderReturnItem?.ec_order?.order_product?.price}`} <span className="text-red-500">{`x ${orderReturnItem?.ec_order?.order_product?.qty}`}</span> Rp. {parseInt(orderReturnItem?.ec_order?.sub_total)}
              </p>
            </div>
            <div className="total flex justify-end p-4">
              <div className="kolom">
                <p>Total return amount</p>
                <p>Status</p>
              </div>
              <div className="kolom ml-4">
                <p>: {`Rp. ${parseInt(orderReturnItem?.ec_order?.sub_total)}`}</p>
                <p>: {orderReturnItem?.return_status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderInformation;
