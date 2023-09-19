import React from 'react';
import {BiShoppingBag} from 'react-icons/bi'
import {AiOutlineDollarCircle} from 'react-icons/ai'
import {HiOutlineDatabase} from 'react-icons/hi'


const Statistic = () => {
  const cardData = [
    {
      title: 'Orders',
      image: 'https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png',
      description: '10',
      icons: BiShoppingBag
    },
    {
      title: 'Revenue',
      image: 'https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png',
      description: '2',
      icons: AiOutlineDollarCircle
    },
    {
      title: 'Products',
      image: 'https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png',
      description: '25',
      icons:HiOutlineDatabase
    },
  ];

  return (
    <div className=" w-[300px] border-l-[1px] border-sky-800 ">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`card-green max-w-xs mx-auto ml-8 rounded overflow-hidden mb-5  drop-shadow-md`}
        >
          <div className="shadow-lg bg-[#f0f5e7] rounded overflow-hidden flex p-5">
            <div className="px-2 py-2">
              <div className="font-normal text-xs  mb-2 text-green-500">{card.title}</div>
              <p className="text-gray-700 text-xl font-semibold">{card.description}</p>
            </div>
            <div className="icon p-3">{card.icons}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistic;
