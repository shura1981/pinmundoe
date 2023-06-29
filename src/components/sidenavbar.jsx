import { useEffect, useState } from "react"
import Swiper, { EffectCube, Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import 'swiper/css/autoplay';
export default function Sidenavbar({ show = false }) {
    const [autoplay, setAutoplay] = useState(show);
    useEffect(() => {
        console.log("show", show);
        const myswiper = new Swiper(".modal-sidenavbar .mySwiper", {
            modules: [ Pagination],
            loop: false,
            // effect: "cube",
            grabCursor: true,
            // autoplay: autoplay ? {
            //     delay: 5000,
            //     disableOnInteraction: true,
            // } : false,
            cubeEffect: {
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            },
            pagination: {
                el: ".swiper-pagination",
                // dynamicBullets: true,
                clickable: true
            },
        });
        myswiper.on('click', function () {
            setAutoplay(false);
        });

    }, [])

    return (
        <div className="modal-sidenavbar">
            <div className="modal">
                <div className="menu-panel">
                    <div className="ratio ratio16x9 mb-4 appear-animation" data-class-appear="appear-delay-2">
                        <div className="swiper mySwiper ">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide"
                                    style={{ backgroundImage: "url('img/slider-1.webp')", backgroundSize: "cover", backgroundPosition: "top center" }}>

                                </div>
                                <div className="swiper-slide"
                                    style={{ backgroundImage: "url('img/slider-1.webp')", backgroundSize: "cover", backgroundPosition: "top center" }}>


                                </div>
                                <div className="swiper-slide"
                                    style={{ backgroundImage: "url('img/slider-1.webp')", backgroundSize: "cover", backgroundPosition: "top center" }}>


                                </div>
                                <div className="swiper-slide"
                                    style={{ backgroundImage: "url('img/slider-1.webp')", backgroundSize: "cover", backgroundPosition: "top center" }}>


                                </div>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                    <ul className=" ">
                        <li id="inicio" className="appear-animation py-1" data-class-appear="appear-delay-2"><a className="py-1 "
                            href="#home">HOME</a> </li>
                        <li className="appear-animation py-1" data-class-appear="appear-delay-3"><a className="py-1 "
                            href="#about">ABOUT US </a></li>
                        <li className="appear-animation py-1" data-class-appear="appear-delay-4"><a className="py-1 "
                            href="#contact">CONTACT</a></li>
                        <li className="appear-animation" data-class-appear="appear-delay-5"> <a className="py-1 "
                            href="#services">SERVICES</a></li>
                        <li className="appear-animation" data-class-appear="appear-delay-6">
                            <div className="mobile-nav__has-sublist ">
                                <button id="collapse" type="button" aria-controls="Linklist-6"
                                    className=" py-3 mobile-nav__link--button mobile-nav__link--top-level collapsible-trigger collapsible--auto-height is-open"
                                    aria-expanded="true">
                                    <span className="mobile-nav__faux-link">
                                        PRODUCTOS
                                    </span>
                                    <div className="mobile-nav__toggle">
                                        <span className="faux-button"><span
                                            className="collapsible-trigger__icon collapsible-trigger__icon--open"
                                            role="presentation">
                                            <svg aria-hidden="true" focusable="false" role="presentation"
                                                className="icon icon--wide " viewBox="0 0 28 16">
                                                <path d="M1.57 1.59l12.76 12.77L27.1 1.59" strokeWidth="2" fill="none"
                                                    fillRule="evenodd"></path>
                                            </svg>
                                        </span>
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </li>
                    </ul>

                    <div id="Linklist-6" className="mb-4 mobile-nav__sublist collapsible-content collapsible-content--all">
                        <div className="collapsible-content__inner">
                            <ul className="mobile-nav__sublist">
                                <li className="mobile-nav__item">
                                    <div className="mobile-nav__child-item">
                                        <a className="py-1 " href="#products">Control de peso </a>
                                    </div>
                                </li>
                                <li className="mobile-nav__item">
                                    <div className="mobile-nav__child-item">

                                        <a className="py-1 " href="/products?category=modulosproteicos">Ganar masa muscular </a>
                                    </div>
                                </li>
                                <li className="mobile-nav__item">
                                    <div className="mobile-nav__child-item">
                                        <a className="py-1 " href="/products?category=hipercaloricos">Hipercalóricos</a>
                                    </div>
                                </li>
                                <li className="mobile-nav__item">
                                    <div className="mobile-nav__child-item">
                                        <a className="py-1 " href="/products?category=energiarecuperacion">Aminoácidos</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <ul className="mobile-nav__social appear-animation " data-class-appear="appear-delay-7">
                        <li className="mobile-nav__social-item">
                            <a target="_blank" rel="noopener" href="https://www.instagram.com/mulatafit/"
                                title="silBe by Silvy en Instagram">
                                <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-instagram"
                                    viewBox="0 0 32 32">
                                    <path fill="#00BF40"
                                        d="M16 3.094c4.206 0 4.7.019 6.363.094 1.538.069 2.369.325 2.925.544.738.287 1.262.625 1.813 1.175s.894 1.075 1.175 1.813c.212.556.475 1.387.544 2.925.075 1.662.094 2.156.094 6.363s-.019 4.7-.094 6.363c-.069 1.538-.325 2.369-.544 2.925-.288.738-.625 1.262-1.175 1.813s-1.075.894-1.813 1.175c-.556.212-1.387.475-2.925.544-1.663.075-2.156.094-6.363.094s-4.7-.019-6.363-.094c-1.537-.069-2.369-.325-2.925-.544-.737-.288-1.263-.625-1.813-1.175s-.894-1.075-1.175-1.813c-.212-.556-.475-1.387-.544-2.925-.075-1.663-.094-2.156-.094-6.363s.019-4.7.094-6.363c.069-1.537.325-2.369.544-2.925.287-.737.625-1.263 1.175-1.813s1.075-.894 1.813-1.175c.556-.212 1.388-.475 2.925-.544 1.662-.081 2.156-.094 6.363-.094zm0-2.838c-4.275 0-4.813.019-6.494.094-1.675.075-2.819.344-3.819.731-1.037.4-1.913.944-2.788 1.819S1.486 4.656 1.08 5.688c-.387 1-.656 2.144-.731 3.825-.075 1.675-.094 2.213-.094 6.488s.019 4.813.094 6.494c.075 1.675.344 2.819.731 3.825.4 1.038.944 1.913 1.819 2.788s1.756 1.413 2.788 1.819c1 .387 2.144.656 3.825.731s2.213.094 6.494.094 4.813-.019 6.494-.094c1.675-.075 2.819-.344 3.825-.731 1.038-.4 1.913-.944 2.788-1.819s1.413-1.756 1.819-2.788c.387-1 .656-2.144.731-3.825s.094-2.212.094-6.494-.019-4.813-.094-6.494c-.075-1.675-.344-2.819-.731-3.825-.4-1.038-.944-1.913-1.819-2.788s-1.756-1.413-2.788-1.819c-1-.387-2.144-.656-3.825-.731C20.812.275 20.275.256 16 .256z">
                                    </path>
                                    <path fill="#00BF40"
                                        d="M16 7.912a8.088 8.088 0 0 0 0 16.175c4.463 0 8.087-3.625 8.087-8.088s-3.625-8.088-8.088-8.088zm0 13.338a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 1 1 0 10.5zM26.294 7.594a1.887 1.887 0 1 1-3.774.002 1.887 1.887 0 0 1 3.774-.003z">
                                    </path>
                                </svg>

                            </a>
                        </li>
                        <li className="mobile-nav__social-item">
                            <a target="_blank" rel="noopener" href="https://www.facebook.com/mulatafit"
                                title="silBe by Silvy en Facebook">
                                <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-facebook"
                                    viewBox="0 0 32 32">
                                    <path fill="#1E85FF"
                                        d="M18.56 31.36V17.28h4.48l.64-5.12h-5.12v-3.2c0-1.28.64-2.56 2.56-2.56h2.56V1.28H19.2c-3.84 0-7.04 2.56-7.04 7.04v3.84H7.68v5.12h4.48v14.08h6.4z">
                                    </path>
                                </svg>

                            </a>
                        </li>
                        <li className="mobile-nav__social-item">
                            <a target="_blank" rel="noopener" href="https://www.youtube.com/channel/UCCdilQ85P1s0zd_S_t928Jw"
                                title="silBe by Silvy en YouTube">
                                <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-youtube"
                                    viewBox="0 0 21 20">
                                    <path fill="#D00C00"
                                        d="M-.196 15.803q0 1.23.812 2.092t1.977.861h14.946q1.165 0 1.977-.861t.812-2.092V3.909q0-1.23-.82-2.116T17.539.907H2.593q-1.148 0-1.969.886t-.82 2.116v11.894zm7.465-2.149V6.058q0-.115.066-.18.049-.016.082-.016l.082.016 7.153 3.806q.066.066.066.164 0 .066-.066.131l-7.153 3.806q-.033.033-.066.033-.066 0-.098-.033-.066-.066-.066-.131z">
                                    </path>
                                </svg>

                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
