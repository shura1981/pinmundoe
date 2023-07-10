import { useEffect } from 'react';
import Swiper, { Pagination, Autoplay, EffectFade } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import Button from "./button";
import { instersectionObserver, smoothScrollElement } from '../helpers';

export default function SliderHome() {
    let videoPlayer = null;
    let swiperHome = null;
    const loadVideo = () => {
        videoPlayer = document.getElementById('videoPlayer');
        if (videoPlayer) {
            let mql = window.matchMedia('(max-width: 600px)');
            function myFunction(x) {
                if (x.matches) { // If media query matches
                    videoPlayer.setAttribute("src", `videos/globosMobile.mp4`)
                    videoPlayer.muted = true;
                    videoPlayer.play();
                    videoPlayer.onloadstart = () => videoPlayer.dataset.load = 'true';
                } else {
                    videoPlayer.setAttribute("src", `videos/globos.mp4`);
                }
                x.onchange = () => {
                    myFunction(x);
                }
            }
            myFunction(mql);
        }
    }

    const insertsetionEnabled = (e) => {
        if (swiperHome.realIndex === 2) {
            videoPlayer?.play();
        }
        swiperHome.autoplay?.start();
    }
    const insertsetionDisabled = (e) =>{
        videoPlayer?.pause();
        swiperHome.autoplay?.stop();
    }






    useEffect(() => {
        // init Swiper:
        swiperHome = new Swiper('.component-slider-home .swiper', {
            // configure Swiper to use modules
            modules: [Pagination, Autoplay, EffectFade],
            effect: "fade",
            grabCursor: true,
            autoplay: {
                delay: 5500,
                disableOnInteraction: true,
            },
            loop: true,
            pagination: {
                el: ".component-slider-home .swiper-pagination",
                clickable: true,
            },
        });
        swiperHome.on('slideChange', function () {
            if (swiperHome.realIndex === 2) {
                videoPlayer?.play();
                swiperHome.autoplay.stop();
            } else {
                videoPlayer?.pause();
            }
        });
        loadVideo();
        instersectionObserver({
            classTarget: '#home',
            disconnect: false,
            callbackIntersecting: insertsetionEnabled,
            callbackNotIntersecting: insertsetionDisabled
        });


    }, []);
    const handleButton = (e) => {
        e.preventDefault();
        smoothScrollElement("#about");
    }


    return (
        <div className="component-slider-home bg-dark">
            <div className="swiper mySwiper ">
                <div className="swiper-wrapper">
                    <div className="swiper-slide section-intro-slider-1">
                        <div className="filter-darker"></div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide section-intro-slider-3 relative" >
                        <video height="1280" width="720" muted autoPlay data-load="true" data-canpause="false" id="videoPlayer"
                            className="video-intro" playsInline loop>
                        </video>
                        <div className="filter-darker"></div>
                        <div className="container">
                            <div className="row hv-100 d-flex justify-content-start align-items-center">
                                <div className="col-12 col-md-8">
                                    <div className="d-flex flex-column">
                                        <h1 className='title-welcome'>Sed ut perspiciatis unde omnis iste natus 3 </h1>
                                        <p className='my-4 description-welcome'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </div>
    )
}
