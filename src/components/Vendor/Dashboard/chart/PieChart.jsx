import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { getVendorInfo } from "../../../../utils/ApiConfig";

const data = [
  { name: "Pendapatan", value: 300 },
  { name: "Biaya", value: 300 },
  { name: "Penarikan", value: 200 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

function ChartTwo() {
  const [balance, setBalance] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getVendorInfo()
      .then((data) => {
        setBalance(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor info:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when done (successful or failed)
      });
  }, []);

  return (
    <div className="card p-4 text-black">
      <div className="header ml-10 mb-7">
        <h2 className="font-bold text-[20px]">Earnings</h2>
        <p className="flex gap-1 text-[12px] font-medium text-blue-400 hover:text-[#FFC107] cursor-default">
          Revenues in Last 30 days
        </p>
      </div>
      <div className="">
        <PieChart width={400} height={250}>
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            labelLine={false}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        {/* Display balance only if it's available and loading has finished */}
        {!loading && balance && (
          <div className="balance">
            <h2 className="font-semibold text-[14px]">Balance</h2>
            <p className="flex text-[18px] font-bold">
              <MdOutlineAccountBalanceWallet className="text-3xl" />
              {`Rp. ${balance.vendor_info.balance}`}
            </p>
          </div>
        )}

        <div className="grid grid-cols-4 mt-8">
          {data.map((item, index) => (
            <p key={index} className="cursor-pointer font-bold">
              {item.name}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-4">
          {COLORS.map((item, index) => (
            <div
              className="ml-5 h-[20px] w-[20px]"
              style={{ backgroundColor: item }}
              key={index}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChartTwo;
