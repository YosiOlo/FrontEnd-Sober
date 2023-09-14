import Healt from '../../../public/bottom-health.png';
import Ios from '../../../public/app-ios.png';
import Android from '../../../public/app-android.png';
import { Link } from 'react-router-dom';

const BottomBlog = () => {
    return (
        <div className="bottom-blog py-5 bg-slate-400">
            <div className="rows-bottom-blog flex flex-col lg:flex-row gap-10 py-8 px-2">
                <div className="blog-left basis-2/3">
                    <div className="blog-left-top flex justify-between my-3">
                        <div className="blog-left-title text-3xl font-bold">
                            <h6>Health Daily</h6>
                        </div>
                        <div className="blog-left-content">
                            <Link to="/articles" className="hover:text-blue-600 text-center mt-2">All Articles</Link>
                        </div>
                    </div>
                    <div className="blog-left-bottom bg-slate-200 p-6 rounded-md">

                    </div>

                </div>
                <div className="blog-right flex-1 bg-slate-200 rounded-lg justify-center flex flex-col items-center"> 
                    <div className="right-top text-center">
                        <div className="top-title my-10">
                            <h6 className="text-2xl font-bold">Shop faster with Sobermart</h6>
                            <p>Shop faster with Sobermart</p>
                        </div>
                        <div className="bottom-image flex justify-center flex-col items-center "> 
                            <div className="image-ios mb-4"> 
                                <img src={Ios} alt="Join" className="object-cover" />
                            </div>
                            <div className="image-android">
                                <img src={Android} alt="Join" className="object-cover" />
                            </div>
                        </div>

                    </div>
                    <div className="right-bottom">
                        <img src={Healt} alt="Join" className="w-full h-full rounded-lg object-cover" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default BottomBlog;