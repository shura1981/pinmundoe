import { useEffect } from 'react'
import { smoothScrollElement } from '../helpers'

export default function Header({ isDark }) {

    useEffect(() => {
        const menuToggle = document.querySelector('.menu-toggle');
        const links = document.querySelectorAll('header [href]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                smoothScrollElement(href);
            })
        }
        )
    }, []);


    return (
        <header className={isDark ? 'header-dark' : null} >
            <div className="logo-top">
                <img className='img-fluid ml-3' src="/img/top-logo.svg" alt="logo superiror" />
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
    )
}
