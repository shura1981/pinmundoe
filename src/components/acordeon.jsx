import { useState } from 'react';
const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const data = [
        {
            title: '¿Qué es un acordeón?',
            content: 'El acordeón es un instrumento musical aerófono de viento, de origen alemán, compuesto por un fuelle, un diapasón y dos cajas armónicas de madera. El fuelle es el encargado de hacer circular el aire por el instrumento, mientras que el diapasón es el que produce el sonido. Las cajas armónicas son las que amplifican el sonido.'
        },
        {
            title: '¿Qué es un acordeón?',
            content: 'El acordeón es un instrumento musical aerófono de viento, de origen alemán, compuesto por un fuelle, un diapasón y dos cajas armónicas de madera. El fuelle es el encargado de hacer circular el aire por el instrumento, mientras que el diapasón es el que produce el sonido. Las cajas armónicas son las que amplifican el sonido.'
        },
        {
            title: '¿Qué es un acordeón?',
            content: 'El acordeón es un instrumento musical aerófono de viento, de origen alemán, compuesto por un fuelle, un diapasón y dos cajas armónicas de madera. El fuelle es el encargado de hacer circular el aire por el instrumento, mientras que el diapasón es el que produce el sonido. Las cajas armónicas son las que amplifican el sonido.'
        }

    ];
    const handleAccordionClick = (index) => {
        if (activeIndex === index) {
            // Si se hace clic en un elemento activo, se cierra
            setActiveIndex(null);
        } else {
            // Si se hace clic en un elemento inactivo, se abre
            setActiveIndex(index);
        }
    };

    return (
        <div className='componente-accordeon'>
            {data.map((item, index) => (
                <div key={index}>
                    <div
                        className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => handleAccordionClick(index)}
                    >
                        <p className='accordion-item-title'>{item.title}</p> <img
                        style={activeIndex === index ? { transition: "transform .3s ease" ,transform: "rotate(180deg)"} : {} }
                        className='arrow' src="img/feather-chevron-down.svg" alt="indicador de acordeon" />
                    </div>
                    {/* {activeIndex === index && <div className="accordion-content">{item.content}</div>} */}
                    <div className={activeIndex === index ? "accordion-content active" : "accordion-content"}>{item.content}</div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;