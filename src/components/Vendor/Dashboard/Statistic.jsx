import React, { useEffect, useState } from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { HiOutlineDatabase } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { getOrderDashboard, getProductDashboard, getVendorInfo} from '../../../utils/ApiConfig';

const Statistic = () => {
  const [order, setOrder] = useState("");
  const [revenue, setRevenue] = useState("");
  const [product, setProduct] = useState("");

  useEffect(() => {
    getOrderDashboard().then((data) => {
      setOrder(data);
    });

    getVendorInfo().then((data) => {
      setRevenue(`Rp. ${parseInt(data.vendor_info.total_revenue)}`);
    });

    getProductDashboard().then((count) => {
      setProduct(count);
    });
  }, []);

  const cardData = [
    {
      title: 'Orders',
      image: 'https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png',
      description: order,
      icon: <BiShoppingBag size={40} className='text-[#FFC107]' />,
      link: '/VenOrders' 
    },
    {
      title: 'Revenue',
      image: 'https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png',
      description: revenue,
      icon: <AiOutlineDollarCircle size={40} className='text-[#FFC107]' />,
      link: '/VenRevenue' 
    },
    {
      title: 'Products',
      image: 'https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png',
      description: product,
      icon: <HiOutlineDatabase size={40} className='text-[#FFC107]'/>,
      link: '/VenProducts' 
    },
  ];

  return (
    <div>
      <div className="header ml-10 mb-7">
        <h2 className="font-bold text-[20px]">Statictic</h2>
        <p className=" flex text-[12px] font-medium text-blue-400 hover:text-[#FFC107] cursor-default">
          Statistics in Last 30 days
        </p>
      </div>
      <div className="w-[300px] border-l-[1px] border-sky-800">
        {cardData.map((card, index) => (
          <Link to={card.link} key={index}> {/* Wrap the card with Link */}
            <div
              className={`card-green max-w-xs mx-auto ml-8 rounded overflow-hidden mb-5  drop-shadow-md`}
            >
              <div className="shadow-lg bg-[#f0f5e7] rounded overflow-hidden flex p-5">
                <div className="icon mr-5 bg-[#f9f9f9] rounded-md p-2">{card.icon}</div>
                <div className="px-2 py-2">
                  <div className="font-semibold text-[16px] mb-2 text-green-500">{card.title}</div>
                  <p className="text-gray-700 text-xl font-semibold">{card.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Statistic;
