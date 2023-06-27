import { useEffect, useState } from 'react'
import { smoothScrollElement } from '../helpers'
import Sidenavbar from './sidenavbar';

export default function Header({ isDark }) {
    const [show, setShow] = useState(false);


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
        async function modalMenu(evt) {
            const target = evt.target;
            console.log(target.nodeName);
            if ((target.nodeName == "DIV" && !target.classList.contains("modal"))
                || target.nodeName == 'SPAN' || target.nodeName == 'LI' ||
                target.nodeName == 'UL' || (target.nodeName == 'svg' && target.classList.contains("icon"))) return null;

            const list = document.querySelectorAll(".appear-animation");
         const active=   modal.classList.toggle("active");
            setShow(active);
            document.querySelector("body").classList.toggle("noscroll");
            console.log(modal.classList.contains("active") ? 'se abre' : 'se cierra');
            await pause(100);
            document.querySelector(".menu-panel").classList.toggle("show");
            if (modal.classList.contains("active")) {//Se abre

                await pause(10);
                for (let index = 0; index < list.length; index++) {
                    const i = list[index];
                    const delay = i.dataset.classAppear;
                    // i.style.animation = `reveal-y 1s ${delay} ease forwards`;
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


        // menuToggle.addEventListener('click', () => {
        //     setShow(current => !current);
        //     setShow(true);
        //     // document.body.classList.toggle('menu-open');
        // }
        // );


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
