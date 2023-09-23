import React from "react";

function OrderInformation() {
  return (
    <div>
      <div className="card bg-white rounded-lg w-[700px] gap-3 break-words">
        <div className="header p-4 border-b-[1px] border-black">
          <p className="font-semibold">Order information</p>
        </div>
        <div className="description flex p-4 ">
          <img
            className="h-10 w-10"
            src="https://res.cloudinary.com/dap6ohre8/image/upload/v1692042539/roady/download_uqwfbi.png"
            alt=""
          />
          <div className="orders w-[65%] ml-3">
            <p className="font-medium">
              MKT , Sepatu Sneakers Garis Korea/ Sepatu Sneakers Wanita Garis
              Korea, SW05
            </p>
            <p className="text-[12px]">Size Sepatu: 36, Color: Maroon</p>
          </div>
          <p className="ml-4">
            Rp50.400 <span className="text-red-500">x 105</span> Rp5.292.000
          </p>
        </div>
        <div className="total flex justify-end p-4">
          <div className="kolom">
            <p>Total return amount</p>
            <p>Status</p>
          </div>
          <div className="kolom ml-4">
            <p>: Rp5.292.000</p>
            <p>: Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderInformation;
