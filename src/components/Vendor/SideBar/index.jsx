import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { VscSignOut } from "react-icons/vsc";
import { MdStorefront, MdClose } from "react-icons/md";
import { RiProductHuntLine, RiCoupon2Fill } from "react-icons/ri";
import { FiMoreVertical } from "react-icons/fi";
import {
  BiHome,
  BiDollarCircle,
  BiMoneyWithdraw,
  BiStar,
} from "react-icons/bi";
import { BsChatDots, BsHandbag, BsBagX, BsBagPlus } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useRoutes } from "react-router-dom";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "30rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "30rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: 0,
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div className="sidebar-container flex no-underline text-black">
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0  z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className={` bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
        overflow-hidden md:relative fixed no-underline
        `}
      >
        <div className="flex items-center gap-2.5 font-medium  py-3  mx-3">
          <img
            src="https://res.cloudinary.com/dap6ohre8/image/upload/v1692042539/roady/sob-logos-1_i6ship.png"
            width={100}
            alt=""
          />
        </div>
        <div className="profile flex p-3 mb-5">
          <img
            className="w-[20%] h-[20%] "
            src="https://res.cloudinary.com/dap6ohre8/image/upload/v1692042539/roady/download_uqwfbi.png"
            alt=""
          />
          <div className="identitas ml-3">
            <p className="text-[14px] text-[#666666]">
              Hello, Sobermart Official
            </p>
            <p className="text-[12px] text-[#333333]">Joined on Mei 22, 2023</p>
          </div>
          <VscSignOut size={25} />
        </div>

        <div className="earnings border-b border-slate-300 mb-5 p-3">
          <p className="font-semibold text-[#666666]">Earnings</p>
          <p className="font-bold">Rp.0</p>
        </div>

        <div className="flex flex-col  no-underline text-[12px]">
          <ul className=" no-underline whitespace-pre px-2.5 ml-1 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              <NavLink to={"/VenDashboard"} className="link">
                <BiHome size={18} className="no-underline min-w-max" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/VenProducts"} className="link">
                <RiProductHuntLine size={18} className="min-w-max" />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to={"/VenChats"} className="link">
                <BsChatDots size={18} className="min-w-max" />
                Chats
              </NavLink>
            </li>
            <li>
              <NavLink to={"/VenOrders"} className="link">
                <BsBagPlus size={18} className="min-w-max" />
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to={"/VenOrderReturns"} className="link">
                <BsBagX size={18} className="min-w-max" />
                Order Returns
              </NavLink>
            </li>
            <li>
              <NavLink to={"/VenRevenue"} className="link">
                <BiDollarCircle size={18} className="min-w-max" />
                Revenue
              </NavLink>
            </li>
            <li>
              <NavLink to={"/VenEtalase"} className="link">
                <MdStorefront size={18} className="min-w-max" />
                Etalase
              </NavLink>
            </li>
            <li>
              <NavLink to={"/VenCoupons"} className="link">
                <RiCoupon2Fill size={18} className="min-w-max" />
                Coupons
              </NavLink>
            </li>
            <li>
              <NavLink to={"/VenWithdrawals"} className="link">
                <BiMoneyWithdraw size={18} className="min-w-max" />
                Withdrawals
              </NavLink>
            </li>
            <li>
              <NavLink to={"/VenReviews"} className="link">
                <BiStar size={18} className="min-w-max" />
                Reviews
              </NavLink>
            </li>
            <li>
              <NavLink to={"/VenSettings"} className="link">
                <SlSettings size={18} className="min-w-max" />
                Settings
              </NavLink>
            </li>
          </ul>
          <div className="border-t flex p-3 align-bottom  sm:hidden ">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${open ? "w-52 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
              </div>
              <FiMoreVertical size={20} />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        onClick={() => {
          setOpen(!open);
        }}
        animate={
          open
            ? {
                x: 0,
                y: 0,
                rotate: 0,
              }
            : {
                x: -10,
                y: -200,
                rotate: 180,
              }
        }
        transition={{ duration: 0 }}
        className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer py-4"
      >
        <MdClose size={25} />
      </motion.div>

      <div className="m-3 md:hidden my-auto" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
