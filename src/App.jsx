import { useEffect, useState } from 'react'
import Header from './components/header';
import Slider from './components/slider';
import Accordion from './components/acordeon';
import BackgroundColors from './components/backgroundcolors';
import Form from './components/form';
import FormCotroled from './components/formcontroled';
import Button from './components/button';
import Footer from './components/footer';
import SliderHome from './components/sliderHome';
import ButtonFixedBottom from './components/buttonfixedbottom';
import { instersectionObserver, restarScroll, smoothScrollElement } from './helpers'
function App() {

  // evento scroll
  const [scroll, setScroll] = useState(0)
  // evento resize
  const [width, setWidth] = useState(window.innerWidth);

  const insertsetionEnabled = (e) => console.log(e);
  const insertsetionDisabled = (e) => console.log(e);

  useEffect(() => {
    restarScroll();
    instersectionObserver({
      classTarget: '.section-secundary',
      disconnect: true,
      callbackIntersecting: insertsetionEnabled,
      callbackNotIntersecting: insertsetionDisabled
    });
    window.addEventListener('scroll', () => {
      const position = window.scrollY;
      // console.log(position);
      setScroll(window.scrollY)
    })
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    });


  }, [])

  const handleButton = (e) => {
    e.preventDefault();
    smoothScrollElement("#about");
  }



  return (
    <>
      <Header isDark={scroll > 80} />
      <main>
        <section id='home' className='vh-100'>
          <SliderHome />

          {/* <div className="container">
            <div className="row hv-100 d-flex justify-content-start align-items-center">
              <div className="col-12 col-md-8">
                <div className="d-flex flex-column">
                  <h1 className='title-welcome'>Sed ut perspiciatis unde omnis iste natus </h1>
                  <p className='my-4 description-welcome'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.</p>
                  <div>
                    <button onClick={handleButton} className='btn__primary'>Read More</button>
                  </div>
                  <Button handleButton={handleButton} text='Read More' clases='btn__primary mt-3' />
                </div>
              </div>
            </div>
          </div> */}



        </section>
        <section id='about' className='section-secundary p-section'>
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-8">
                <h2 className='title '>
                  We Help Businesses <span className='subtitle d-block'>Grow and Innovate</span>
                </h2>
                <p className='mt-5 text '>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id='products' className='d-flex align-items-center justify-content-center p-section'>
          <BackgroundColors />
          <div className="container  relative " style={{ paddingLeft: '0', paddingRight: '0', height: '552px' }}>
            <div className=" image-products">
              <div className="full grid-container-slider">
                <div className='container-slider aspec-ratio ratio-responsive'>
                  <Slider className="ratio_img" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className='min-h100'>
          <div className="bg-services">
            <div></div><div></div>
          </div>
          <div className="container">
            <div className="row  align-items-center" style={{ height: "100vh" }}>
              <div className="col-12 col-md-8">
                <div className="card" style={{ border: "none", borderRadius: ".5rem" }}>
                  <Accordion />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" >
          <BackgroundColors />
          <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div className="row align-items-center">
              <div className="col-12 col-md-6 order-2 order-md-1">
                {/* <Form /> */}
                <FormCotroled />
              </div>
              <div className="col-12 col-md-6 order-1 order-md-2 mb-5 mb-md-0">
                <picture>
                  <source media="(min-width: 600px)" srcSet="img/contact-image@2x.webp" type="image/webp" />
                  <img src="img/contact-image.webp" className="img-fluid" alt="contact image" />
                </picture>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer>
        <ButtonFixedBottom />
      </Footer>
    </>
  )
}

export default App
