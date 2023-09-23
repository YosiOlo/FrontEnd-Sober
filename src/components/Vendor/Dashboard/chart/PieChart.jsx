import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import {TbPlayerTrackNextFilled} from "react-icons/tb"

const data = [
  { name: "Pendapatan", value: 300 },
  { name: "Biaya", value: 300 },
  { name: "Penarikan", value: 200 },
];

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
  return (
    <div className="card p-4">
      <div className="header ml-10 mb-7">
        <h2 className="font-bold">Earnings</h2>
        <p className=" flex gap-1 text-[12px] font-medium text-blue-400">
          Revenues in Last 30 days{" "}<TbPlayerTrackNextFilled className='mt-1'/>
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
          <div className="balance">
            <h2 className="font-semibold text-[14px]">Balance</h2>
            <p className="flex text-[18px] font-bold"> <MdOutlineAccountBalanceWallet className="text-3xl"/>Rp.0</p>
          </div>


          <div className="grid grid-cols-4 mt-8">
            {data.map((item, index) => (
              <p key={index} className="cursor-pointer font-bold">
                {item.name}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-4">
            {COLORS.map((item, index) => (
              <div className="ml-5 h-[20px] w-[20px]" style={{backgroundColor:item}} key={index}>

              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
export default ChartTwo;
