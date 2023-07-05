import { useEffect, useState } from 'react';

const ButtonFixedBottom = () => {
    const [showButton, setShowButton] = useState(false);
    const height = document.documentElement.clientHeight;
    const handleButton = (e) => {
        e.preventDefault();
        document.querySelector("#home").scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        console.log('carga', showButton);
        const handleScroll = () => {

            if (window.pageYOffset > height) {
                if (!showButton) setShowButton(true);
            } else {
                if (showButton) setShowButton(false);
            }
        }


        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showButton]);



    return (
        <button onClick={handleButton} id="btn-scroll-top" className='button-fixed-bottom' style={{ opacity: showButton ? 1 : 0, transform: showButton ? 'scale(1)':  'scale(0.5)' }}>
            <span> &#8593; </span>
        </button>
    );
}

export default ButtonFixedBottom;


