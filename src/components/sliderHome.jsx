import { useEffect } from 'react';
import Swiper, { Navigation, Pagination, Autoplay, EffectFade, EffectCreative } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from "./button";
import { smoothScrollElement } from '../helpers';

export default function SliderHome() {
    useEffect(() => {

        // init Swiper:
        const swiperHome = new Swiper('.component-slider-home .swiper', {
            // configure Swiper to use modules
            modules: [Navigation, Pagination, Autoplay, EffectFade, EffectCreative],
            // effect: "fade",
            grabCursor: true,
            effect: "creative",
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
            autoplay: {
                delay: 5500,
                disableOnInteraction: true,
            },
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            // navigation: {
            //     nextEl: ".swiper-button-next",
            //     prevEl: ".swiper-button-prev",
            // },
        });

    }, []);
    const handleButton = (e) => {
        e.preventDefault();
        smoothScrollElement("#about");
    }


    return (
        <div className="component-slider-home bg-dark">
            <div className="swiper mySwiper relative">
                <div className="swiper-wrapper">
                    <div className="swiper-slide section-intro-slider-1">
                        <div className="container">
                            <div className="row hv-100 d-flex justify-content-start align-items-center">
                                <div className="col-12 col-md-8">
                                    <div className="d-flex flex-column">
                                        <h1 className='title-welcome'>Sed ut perspiciatis unde omnis iste natus 1 </h1>
                                        <p className='my-4 description-welcome'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.</p>
                                        <Button handleButton={handleButton} text='Read More' clases='btn__primary mt-3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide section-intro-slider-2">
                        <div className="container">
                            <div className="row hv-100 d-flex justify-content-start align-items-center">
                                <div className="col-12 col-md-8">
                                    <div className="d-flex flex-column">
                                        <h1 className='title-welcome'>Sed ut perspiciatis unde omnis iste natus 2 </h1>
                                        <p className='my-4 description-welcome'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.</p>
                                        <Button handleButton={handleButton} text='Read More' clases='btn__primary mt-3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide section-intro-slider-3">
                        <div className="container">
                            <div className="row hv-100 d-flex justify-content-start align-items-center">
                                <div className="col-12 col-md-8">
                                    <div className="d-flex flex-column">
                                        <h1 className='title-welcome'>Sed ut perspiciatis unde omnis iste natus 3 </h1>
                                        <p className='my-4 description-welcome'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.</p>
                                        <Button handleButton={handleButton} text='Read More' clases='btn__primary mt-3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div> */}
                <div className="swiper-pagination"></div>
            </div>
        </div>
    )
}