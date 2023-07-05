
export default function Footer({ children}) {
    return (
        
        <div className="footer">
            {children}
            <footer className='container py-4'>
                <div className="row">
                    <div className="col-12 d-flex justify-content-between">
                        <p className='m-0'>
                            2020 © All rights reserved.
                        </p>
                        <img src="img/footer-logo.svg" className='img-fluid' alt="logo footer" />
                    </div>
                </div>
            </footer>
        </div>

    )
}
