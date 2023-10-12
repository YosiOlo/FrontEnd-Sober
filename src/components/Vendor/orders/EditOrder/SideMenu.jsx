import React, { useState, useEffect } from "react";
import { RiMessageFill } from "react-icons/ri";
import { BsPencil } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getOrdersById, putCustomerOrders } from "../../../../utils/ApiConfig";
import Swal from "sweetalert2";
import { getInitials } from "../../../../utils/utils";

function SideMenu() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    getOrdersById(id).then((data) => {
      const { name, phone, email, address, city, state, zip_code } =
  data.order_addresses || {};

      setShippingInfo({
        name,
        phoneNumber: phone,
        email,
        address,
        city,
        state,
        zipCode: zip_code,
      });
      setOrders([data]);
    });
  }, [id]);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Lakukan permintaan PUT ke server
    putCustomerOrders(id, shippingInfo)
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Data saved successfully", response);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          error,
        });
        console.error("Data save failed", error);
      });

    closeEditModal();
  };

  return (
    <div className="bg-white rounded-md p-4 h-[350px] shadow-lg">
      {orders.map((customer) => (
        <div key={customer.id}>
          <div className="customer border-b-[1px] border-slate-200 mb-7">
          <img
                className="h-10 w-10"
                src={
                  customer?.customer_order?.avatar
                    ? "https://kuro.asrofur.me/sober/" +
                      customer?.customer_order?.avatar
                    : `https://via.placeholder.com/40?text=${getInitials(
                        customer?.order_addresses?.name
                      )}`
                }
                alt=""
              />
            <p className="font-bold">{customer.order_addresses.name}</p>
            <div className="detailOrders flex gap-3">
              <RiMessageFill className="mt-1" />
              <p>8 Orders</p>
            </div>
            <p>{customer.order_addresses.email}</p>
            <p className="mb-8">Have an account already</p>
          </div>

          {/* Bagian alamat pengiriman */}
          <div className="shippingAddress">
            <div className="header flex justify-between">
              <p className="font-bold"> Shipping Address</p>
              <BsPencil onClick={openEditModal} className="cursor-pointer" />
            </div>
            <p>{customer.order_addresses.name}</p>
            <div className="call flex gap-3 hover:text-yellow-300">
              <MdCall className="mt-1 hover:text-yellow-300" />
              <p className="hover:text-yellow-300 cursor-pointer">
                {customer.order_addresses.phone}
              </p>
            </div>
            <p>
              {customer.order_addresses.address}
              <br />
              {customer.order_addresses.city}
              <br />
              {customer.order_addresses.state}
              <br />
              {customer.order_addresses.zip_code}
            </p>
            <a className="hover:text-yellow-300" href="">
              See on Maps
            </a>
          </div>

          {/* Modal untuk mengedit informasi pengiriman */}
          {isEditModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-[#e9e9e9] p-4 rounded-md w-[60%]">
                <div className="header ">
                  <h2 className="text-lg font-semibold mb-4">Update Address</h2>
                </div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  className="w-full mb-2 bg-slate-300 p-2 rounded-md border-2"
                />
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={shippingInfo.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full mb-2  bg-slate-300 p-2 rounded-md"
                />
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  className="w-full mb-2 bg-slate-300 p-2 rounded-md"
                />
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className="w-full mb-2 bg-slate-300 p-2 rounded-md"
                />
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  className="w-full mb-2 bg-slate-300 p-2 rounded-md"
                />
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  className="w-full mb-2 bg-slate-300 p-2 rounded-md"
                />
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleInputChange}
                  className="w-full mb-2 bg-slate-300 p-2 rounded-md"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-[#0DCAF0] hover:bg-[#29D4F7] text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={closeEditModal}
                  className="bg-[#FFC107] hover:bg-[#efdba0] text-white px-4 py-2 rounded-lg ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {/* Bagian informasi pelanggan */}
    </div>
  );
}

export default SideMenu;
