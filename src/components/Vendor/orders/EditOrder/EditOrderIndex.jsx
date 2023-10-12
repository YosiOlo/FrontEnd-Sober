import React from "react";
import OrderInformation from "./OrderInformation";
import SideMenu from "./SideMenu";
import TopBar from "../../TopBar/Topbar";
import { useParams } from "react-router-dom";
import { getOrdersById } from "../../../../utils/ApiConfig";
import { useEffect, useState } from "react";

function EditOrderIndex() {
  const [title, setTitle] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getOrdersById(id).then((data) => {
      setTitle([data.code]);
    });
  }, [id]);

  return (
    <div className="shadow-lg">
      <TopBar title={"edit Order " + title} />
      <div className="p-4 flex flex-wrap gap-4 text-black">
        <OrderInformation />
        <SideMenu />
      </div>
    </div>
  );
}

export default EditOrderIndex;
