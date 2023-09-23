import React from "react";
import TopBar from "../../components/Vendor/TopBar/Topbar";
import Barchart from "../../components/Vendor/Dashboard/chart/BarChart";
import PieChart from "../../components/Vendor/Dashboard/chart/PieChart";
import Statistic from "../../components/Vendor/Dashboard/Statistic";
import { recentOrders } from "../../utils/data";
import NewOrders from "../../components/Vendor/Dashboard/NewOrders";


function DashboardPage() {
  const data= recentOrders();
  return (
    <div className="bg-[#f9f9f9]">
      <TopBar title="Dashboard" />
      <div className="flex flex-wrap">
      <Barchart/>
      <PieChart/>
      <Statistic/>
      </div>
      <div className="card p-4 text-[12px]">
          <NewOrders/>
          
        </div>
    </div>
  );
}

export default DashboardPage;
