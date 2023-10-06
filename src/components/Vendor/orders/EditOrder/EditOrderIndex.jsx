import React from "react";
import OrderInformation from "./OrderInformation";
import SideMenu from "./SideMenu";

function EditOrderIndex() {
  return (
    <div className="p-4 flex flex-wrap gap-4 text-black">
      <OrderInformation />
      <SideMenu />
    </div>
  );
}

export default EditOrderIndex;
