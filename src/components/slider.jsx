// core version + navigation, pagination modules:
import { useEffect } from 'react';
import Swiper, { Navigation, Pagination } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function Slider({ className }) {
    useEffect(() => {

        // init Swiper:
        const swiper = new Swiper('.swiper', {
            // configure Swiper to use modules
            modules: [Navigation, Pagination],
            loop: true,
            navigation: {
                nextEl: '.nav-swiper-button-next',
                prevEl: '.nav-swiper-button-prev',
            },
        });

    }, []);

    return (
        <div className={`${className ? className : null} component-slider`}>
            <div className="swiper mySwiper">
                <div className="swiper-wrapper">
                    <div className="swiper-slide ">
                        <div>
                            <p className="description-slider-item">
                                Sed ut perspiciatis
                            </p>
                            <h2 className="title-slider-item">
                                Nemo Enim 1
                            </h2>
                            <p className="description-slider-item mt-3">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                            </p>
                        </div>
                    </div>
                    <div className="swiper-slide ">
                        <div>
                            <p className="description-slider-item">
                                Sed ut perspiciatis
                            </p>
                            <h2 className="title-slider-item">
                                Nemo Enim 2
                            </h2>
                            <p className="description-slider-item mt-3">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                            </p>
                        </div>
                    </div>
                    <div className="swiper-slide ">
                        <div>
                            <p className="description-slider-item">
                                Sed ut perspiciatis
                            </p>
                            <h2 className="title-slider-item">
                                Nemo Enim 3
                            </h2>
                            <p className="description-slider-item mt-3">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='container-navigation'>
                    <div className='nav-swiper-button-prev'>
                        <img src="/img/arrow-left-circle.svg" alt="slider derecho" />
                    </div>
                    <div className='nav-swiper-button-next'>
                        <img src="/img/arrow-right-circle.svg" alt="slider derecho" />
                    </div>

                </div>


            </div>

        </div>
    )
}

export default Slider;