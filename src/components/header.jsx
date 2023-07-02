import { useEffect } from 'react'
import { smoothScrollElement } from '../helpers'
import Sidenavbar from './sidenavbar';

export default function Header({ isDark }) {

    let show = false;
    useEffect(() => {
        const links = document.querySelectorAll('[href]');
        const menuToggle = document.querySelector('.menu-toggle .menu');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                smoothScrollElement(href);
            })
        }
        );


        const modal = document.querySelector(".modal");


        modal.addEventListener("click", modalMenu);
        menuToggle.addEventListener("click", modalMenu);
        document.getElementById("collapse").addEventListener("click", collapse);

        function collapse() {
            document.getElementById("Linklist-6").classList.toggle("is-open");
            document.querySelector(".icon").classList.toggle("icon-chevron-down");
        }

        function checkClass(target) {
            return target.classList.contains("menu") || target.classList.contains("modal") ||
                !target.classList.contains("is-open") || target.nodeName == 'SPAN' || target.nodeName == 'LI' ||
                target.nodeName == 'UL' || (target.nodeName == 'svg' && target.classList.contains("icon"));
        }

        async function modalMenu(evt) {
            const target = evt.target;
            if (!checkClass(target)) return null;
            if (target.classList.contains("menu-panel")) return null;
            if (target.nodeName == 'IMG') return null;

            const list = document.querySelectorAll(".appear-animation");
            const active = modal.classList.toggle("active");
            // setShow(active);
            show = active;
            document.querySelector("body").classList.toggle("noscroll");
            // console.log(modal.classList.contains("active") ? 'se abre' : 'se cierra');
            await pause(100);
            document.querySelector(".menu-panel").classList.toggle("show");
            if (modal.classList.contains("active")) {//Se abre
                await pause(10);
                for (let index = 0; index < list.length; index++) {
                    const i = list[index];
                    const delay = i.dataset.classAppear;
                    if (!i.classList.contains(delay)) i.classList.add(delay);
                    i.classList.add("show");
                }
            } else {
                //Se cierra
                list.forEach(i => i.classList.remove("show"));
                document.getElementById("Linklist-6").classList.remove("is-open");
                document.querySelector(".icon").classList.remove("icon-chevron-down");
            }
        }
        const pause = (miliseconds) => new Promise((resolve, reject) => setTimeout(() => resolve("terminado"), miliseconds));
    }, []);

    return (
        <>
            <header className={isDark ? 'header-dark' : null} >
                <div className="logo-top">
                    <img className='img-fluid ml-3' src="img/top-logo.svg" alt="logo superiror" />
                </div>
                <nav className='nav-not-mobile'>
                    <ul>
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#about">About us</a>
                        </li>
                        <li>
                            <a href="#products">Products</a>
                        </li>
                        <li>
                            <a href="#services">Services</a>
                        </li>
                        <li>
                            <a href="#contact">Contact us</a>
                        </li>
                    </ul>
                </nav>
                <div className="menu-toggle">
                    <div className="menu">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
            </header>
            <Sidenavbar show={show} />
        </>
    )
}
