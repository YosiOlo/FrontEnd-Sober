import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { getVendorInfo } from "../../../../utils/ApiConfig";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function ChartTwo() {
  const [data, setData] = useState([
    { name: "Pendapatan", value: 0 },
    { name: "Biaya", value: 0 },
    { name: "Penarikan", value: 0 },
  ]);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVendorInfo()
      .then((response) => {
        const { vendor_info } = response;
        setBalance(vendor_info.balance);
        setData([
          { name: "Pendapatan", value: parseInt(vendor_info.total_revenue) },
          { name: "Biaya", value: parseInt(vendor_info.total_fee) },
          { name: "Penarikan", value: parseInt(vendor_info.balance) },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching vendor info:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Log data for debugging
  useEffect(() => {
    console.log("Data:", data);
    console.log("Balance:", balance);
  }, [data, balance]);

  // Add a condition to render the chart only when data is available
  if (loading || data.some((item) => isNaN(item.value))) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card p-4">
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
            label={renderCustomizedLabel}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        {!loading && balance !== null && (
          <div className="balance">
            <h2 className="font-semibold text-[14px]">Balance</h2>
            <p className="flex text-[18px] font-bold">
              <MdOutlineAccountBalanceWallet className="text-3xl" />
              {`Rp. ${balance}`}
            </p>
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <div>
            <div className="grid">
              {COLORS.map((item, index) => (
                <div
                  className="ml-5 h-[20px] w-[20px] rounded-full"
                  style={{ backgroundColor: item }}
                  key={index}
                ></div>
              ))}
            </div>
          </div>
          <div>
            <div className="grid">
              {data.map((item, index) => (
                <p key={index} className="cursor-pointer font-semibold">
                  {item.name}
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="grid">
              {data.map((item, index) => (
                <p key={index} className="cursor-pointer  font-bold">
                  {`Rp. ${item.value}`}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartTwo;
