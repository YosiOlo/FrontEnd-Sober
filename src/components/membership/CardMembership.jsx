import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'animate.css';
import SobermartLogo from '/logo-sober-mart-color-grey-1.png';
import 'tailwindcss/tailwind.css';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { memberShip } from '../../utils/ApiConfig';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function CardMembership() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await memberShip();
        setMembers(data);
        console.log('Status Keanggotaan:', data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Kesalahan saat memeriksa status keanggotaan:', error);
      }
    };
    fetchData();
  }, []);

  return (
    
    <div className="swiper">
      {/* <div className="contentright ">
                    <div className="inventory-swiper-button-prev">
                        <button className="bg-slate-600 hover:bg-blue-600 text-white px-2 py-1 rounded-lg focus:outline-none">
                            <AiOutlineArrowLeft />
                        </button>
                    </div>
                    <div className="inventory-swiper-button-next">
                        <button className="bg-slate-600 hover.bg-blue-600 text-white px-2 py-1 rounded-lg focus:outline-none">
                            <AiOutlineArrowRight />
                        </button>
                    </div>
                </div> */}
      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        autoplay={{
          delay: 50000,
          disableOnInteraction: false,
        }}

        navigation={{
          clickable: true,

        }}
        className="mySwiper bg-white"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,

          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,

          },
          720: {
            slidesPerView: 4,
            spaceBetween: 10,

          }
        }}
      >
        {isLoading ? (
          Array(12).fill().map((_, index) => (
            <SwiperSlide key={index}>
              <div key={index} className='mx-1 flex-col'>
                <div className="animate__animated animate__flash animate__infinite animate__slow">
                  <img src={SobermartLogo} alt="Sobermart Logo" width={300} height={400} />
                </div>
                <Skeleton count={6} />
              </div>
            </SwiperSlide>
          ))
        ) : (

          members.map((member) => (
            <SwiperSlide key={member.id}>
              <div className="mx-1 flex-col bg-white shadow-lg rounded-md p-4 mb-4">
                <div className="list-images rounded-lg">
                  <img className="rounded-lg" src={"https://kuro.asrofur.me/sober/" + member.image} alt={member.name} />
                </div>
                <h2 className="text-xl font-semibold mt-4 h-8 overflow-hidden">{member.name}</h2>
                <p className="text-gray-500 text-sm h-8 overflow-hidden">{member.description}</p>
                <p className="text-blue-500 text-sm">Keuntungan hingga {member.fee_commissions}%</p>
                <p className="text-green-500 text-sm">Nominal: Rp {member.nominal}</p>
              </div>
            </SwiperSlide>



          ))
        )}
      </Swiper>
    </div>
  );
}

export default CardMembership;
