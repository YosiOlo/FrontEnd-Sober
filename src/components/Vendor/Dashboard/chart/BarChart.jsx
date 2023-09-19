import React from 'react'
import { dataBar } from '../../../../utils/data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MdNavigateNext } from "react-icons/md";

function Barchart() {
    const data= dataBar();
  return (
  <div className="card p-4">
  <div className="header ml-10">
    <h2 className="font-bold">Sales Reports</h2>
    <p className=" flex text-[12px] font-medium text-blue-400">
      Revenues in Last 30 days{" "}
      <MdNavigateNext className="mt-1 text-blue-400" />
      <MdNavigateNext className="mt-1 ml-[-8px] text-blue-400" />
    </p>
  </div>
  <div className="flex ">
      <BarChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>
  </div>
  )
}

export default Barchart