import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderInformation from "./OrderInformation";
import OrderStatus from "./OrderStatus";
import Customer from "./Customer";
import TopBar from "../../TopBar/Topbar";
import {
  getOrderReturnById,
} from "../../../../utils/ApiConfig";

function EditOrderReturnsIndex() {
  const { id } = useParams();
  const [title, SetTitle] = useState(null);

  useEffect(() => {
    getOrderReturnById(id).then((data) => {
      SetTitle([data.ec_order?.code]);
    });
  });

  return (
    <div className="text-black">
      <TopBar title={"edit Order " + title} />
      <div className="flex justify-center items-center gap-5 sm:flex-wrap md:flex-wrap lg:flex-wrap">
        <div className="dataOrder">
          <OrderInformation />
          <OrderStatus />
        </div>
        <Customer />
      </div>
    </div>
  );
}

export default EditOrderReturnsIndex;
