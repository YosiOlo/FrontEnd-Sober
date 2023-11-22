import Minyak from '../../../public/carousel-minyak.png';
import Join from '../../../public/join-sober.png';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const Hero = () => {
    return (
        <div className="rows-carousel-wrapaper flex flex-col lg:flex-row gap-10 py-8 px-12 max-h-[50vh]">
            <div className="carousel-left max-w-[60vw]">
                <Swiper
                    spaceBetween={1}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                    }}
                    className="!h-full !w-full"
                >
                    <SwiperSlide>
                        <img src={"left.png"} alt="Sobermart Minyak" className="w-full h-full object-cover rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={"left2.png"} alt="Sobermart Minyak" className="w-full h-full object-cover rounded-lg" />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="carousel-right flex-1">
                <img src={"right.png"} alt="Join" className="w-full h-full rounded-lg object-cover lg:mb-32" />
            </div>
        </div>
    );
}

export default Hero;