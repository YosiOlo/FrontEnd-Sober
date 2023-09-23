import { dataBar } from '../../../../utils/data';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import {TbPlayerTrackNextFilled} from "react-icons/tb"

const data = [
  {
    name: '18 Aug',
    uv: 2500000,
  },
  {
    name: '22 Aug',
    uv: 3000,
  },
  {
    name: '26 Aug',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '30 Aug',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '03 Sep',
    uv: 1890,
  },
  {
    name: '07 Sep',
    uv: 2390,
  },
  {
    name: '11 Sep',
    uv: 3490,
  },
];

function Barchart() {
    const data= dataBar();
  return (
  <div className="card p-4 w-[40%]">
  <div className="header ml-10 mb-7">
    <h2 className="font-bold text-[20px]">Sales Reports</h2>
    <p className=" flex text-[12px] font-medium text-blue-400 ">
      <Link className='flex gap-1 hover:text-[#FFC107]' to={"/historyRevenue"}>Pendapatan dalam Last 30 days <TbPlayerTrackNextFilled className='mt-1'/>
      </Link>
    </p>
  </div>
  <div className="flex ">
  <ResponsiveContainer  width="100%" height={300}>
          <LineChart
            width={600}
            height={400}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
    </div>
  </div>
  )
}

export default Barchart