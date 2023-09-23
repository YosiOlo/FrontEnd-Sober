import React from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { HiOutlineDatabase } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import {TbPlayerTrackNextFilled} from "react-icons/tb"


const Statistic = () => {
  const cardData = [
    {
      title: 'Orders',
      image: 'https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png',
      description: '10',
      icon: <BiShoppingBag size={40} className='text-[#FFC107]' /> // Menggunakan komponen ikon
    },
    {
      title: 'Revenue',
      image: 'https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png',
      description: '2',
      icon: <AiOutlineDollarCircle size={40} className='text-[#FFC107]' /> // Menggunakan komponen ikon
    },
    {
      title: 'Products',
      image: 'https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png',
      description: '25',
      icon: <HiOutlineDatabase size={40} className='text-[#FFC107]'/> // Menggunakan komponen ikon
    },
  ];

  return (
    <div>
      <div className="header ml-10 mb-7">
    <h2 className="font-bold">Sales Reports</h2>
    <p className=" flex text-[12px] font-medium text-blue-400">
      <Link className='flex gap-1' to={"/historyRevenue"}>Pendapatan dalam Last 30 days <TbPlayerTrackNextFilled className='mt-1'/>
      </Link>
    </p>
  </div>
      <div className="w-[300px] border-l-[1px] border-sky-800">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`card-green max-w-xs mx-auto ml-8 rounded overflow-hidden mb-5  drop-shadow-md`}
        >
          <div className="shadow-lg bg-[#f0f5e7] rounded overflow-hidden flex p-5">
          <div className="icon mr-5 bg-[#f9f9f9] rounded-md p-2">{card.icon}</div>
            <div className="px-2 py-2">
              <div className="font-normal text-xs mb-2 text-green-500">{card.title}</div>
              <p className="text-gray-700 text-xl font-semibold">{card.description}</p>
               {/* Menampilkan ikon di sini */}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Statistic;
