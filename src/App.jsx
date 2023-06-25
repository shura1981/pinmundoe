import { useEffect, useState } from 'react'
import Header from './components/header'
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
        <section id='home' className='section-intro'>
          <div className="container">
            <div className="row hv-100 d-flex justify-content-start align-items-center">
              <div className="col-12 col-md-8">
                <div className="d-flex flex-column">
                  <h1 className='title-welcome'>Sed ut perspiciatis unde omnis iste natus </h1>
                  <p className='my-4 description-welcome'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.</p>
                  <div>
                    <button onClick={handleButton} className='btn__primary'>Read More</button>
                  </div>
                </div>

              </div>

            </div>



          </div>
        </section>
        <section id='about' className='section-secundary '>
          <div className="container">
            <div className="row  hv-100 justify-content-center align-items-center">
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
        <section id='products' className='d-flex align-items-center justify-content-center'>
          <div className="bg-products">
            <div></div><div></div>
          </div>
          <div className="container image-products relative my-5" style={{paddingLeft: '0', paddingRight:'0'}}>
            <div className="aspec-ratio ratio16x9">
              <div className="full grid-container-slider">
                <div className='container-slider'>
                </div>
              </div>
            </div>

          </div>
        </section>
        <section id="services">
          <h2>section 4 </h2>
        </section>
        <section id="contact">
          <h2>section 5 </h2>
        </section>
      </main>
      <footer>
        <p>React App</p>
      </footer>

    </>
  )
}

export default App
