import Minyak from '../../../public/carousel-minyak.png';
import Join from '../../../public/join-sober.png';

const Hero = () => {
    return (
        <div className="content-carousel-wrapaper">
            <div className="rows-carousel-wrapaper flex flex-col lg:flex-row gap-10 py-8 px-2">
                <div className="carousel-left basis-2/3">
                    <img src={Minyak} alt="Sobermart Minyak" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="carousel-right flex-1">
                    <img src={Join} alt="Join" className="w-full h-full rounded-lg object-cover lg:mb-32" />
                </div>
            </div>
        </div>
    );
}

export default Hero;