import React, { useState } from "react";
import InputForm from "./InputForm";
import TopBar from "../../TopBar/Topbar";
import SideMenu from "./Sidemenu";

function AddProductIndex() {
  return (
    <div className=" text-black">
      <TopBar title={"Add Products"} />
      <div className="flex">
        <InputForm />
      </div>
    </div>
  );
}

export default AddProductIndex;
