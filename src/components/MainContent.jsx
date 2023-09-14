import React from 'react';

import Join from '../../public/join-sober.png';
import Hero from './Hero';

function MainContent() {
    return (
        <div className="main-content">
            <Hero />
            <div className="ck-content">
                <div className="widget-categories mt-10  bg-slate-600">
                    <div className="col-categories">
                        <div className="row-align-items flex justify-between">
                            <div className="title-categories">Category</div>
                            <div className="arrows-categories flex ">
                                <div className="arows-left"><a href="#item1" className="btn btn-xs mr-2">Kiri</a></div>
                                <div className="arrows-right"><a href="#item7" className="btn btn-xs mr-2">Kanan</a></div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            {/* <div className="row-align-products">
                
                <div className="carousel carousel-center max-w-full m-4 p-4 space-x-4 rounded-box">
                    <div className="carousel-item mx-2 px-2">
                        <img id="item1" src={Join} alt="Join" className="rounded-box h-60 w-60" />
                    </div>
                    <div className="carousel-item mx-2 px-2">
                        <img id="item2" src={Join} alt="Join" className="rounded-box h-60 w-60" />
                    </div>
                    <div className="carousel-item mx-2 px-2">
                        <img id="item3" src={Join} alt="Join" className="rounded-box h-60 w-60" />
                    </div>
                    <div className="carousel-item mx-2 px-2">
                        <img src={Join} id="item4" alt="Join" className="rounded-box h-60 w-60" />
                    </div>
                    <div className="carousel-item mx-2 px-2">
                        <img id="item5" src={Join} alt="Join" className="rounded-box h-60 w-60" />
                    </div>
                    <div className="carousel-item mx-2 px-2">
                        <img id="item6" src={Join} alt="Join" className="rounded-box h-60 w-60" />
                    </div>
                    <div className="carousel-item mx-2 px-2">
                        <img id="item7" src={Join} alt="Join" className="rounded-box h-60 w-60" />
                    </div>
                </div>
                
            </div> */}
        </div>
    );
}

export default MainContent;
// breakpoints={{
//     0: {
//         slidesPerView: 1,
//         spaceBetween: 10,
//         pagination: {
//             clickable: true,
//         }
//     },
//     640: {
//         slidesPerView: 2,
//         spaceBetween: 10,
//         pagination: {
//             clickable: true,
//         }
//     },
//     768: {
//         slidesPerView: 3,
//         spaceBetween: 15,
//         pagination: {
//             clickable: true,
//         }
//     },
//     1024: {
//         slidesPerView: 4,
//         spaceBetween: 15,
//     },
//     1280: {
//         slidesPerView: 5,
//         spaceBetween: 30,
//     },

// }}


{/* <SwiperSlide>
    <img src={Join} alt='' />
    <p>slide 1</p>
</SwiperSlide>
<SwiperSlide>
    <img src={Join} alt='' />
    <p>slide</p>
</SwiperSlide>
<SwiperSlide>
    <img src={Join} alt='' />
    <p>slide</p>
</SwiperSlide>
<SwiperSlide>
    <img src={Join} alt='' />
    <p>slide</p>
</SwiperSlide>
<SwiperSlide>
    <img src={Join} alt='' />
    <p>slide</p>
</SwiperSlide>
<SwiperSlide>
    <img src={Join} alt='' />
    <p>slide</p>
</SwiperSlide> */}
