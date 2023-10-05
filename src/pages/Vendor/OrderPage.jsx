import React from "react";
import TopBar from "../../components/Vendor/TopBar/Topbar";
import OrdersTable from "../../components/Vendor/orders/OrdersTable";

function OrdersPage() {
  return (
    <div className="bg-[#f9f9f9] text-black">
      <TopBar title="Orders" />
      <div className="container p-4">
        <div className="card">
          <OrdersTable
          />
          
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
