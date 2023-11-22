import React from 'react';
import { FaFacebook } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="mt-4">
      <div className="border-y border-gray-400 p-4"></div>
      <div className="text-start justify-between md:flex">
        <div className="text flex justify-center md:ml-4">
          <p>© 2023 Your Company. All right reserved.</p>
        </div>
        <div className="icon mt-4 flex justify-center md:mt-0 md:mr-4">
          <div className="text">Tetap terhubung:</div>
          <div className="icon-text">
            <FaFacebook className="text-2xl ml-2 text-blue-600 cursor-pointer" />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
