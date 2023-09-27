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
    IDR: 2500000,
  },
  {
    name: '22 Aug',
    IDR: 3500000,
  },
  {
    name: '26 Aug',
    IDR: 8500000,
  },
  {
    name: '30 Aug',
    IDR: 5800000,
  },
  {
    name: '03 Sep',
    IDR: 2900000,
  },
  {
    name: '07 Sep',
    IDR: 2100000,
  },
  {
    name: '11 Sep',
    IDR: 2500000,
  },
];

function Barchart() {
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
            <Line type="monotone" dataKey="IDR" stroke="#F0B608" fill="#F0B608" />
          </LineChart>
        </ResponsiveContainer>
    </div>
  </div>
  )
}

export default Barchart