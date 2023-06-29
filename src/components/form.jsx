
import Button from "./button";
import {wrapSwal} from '../helpers';
export default  function form() {
 const swal=  wrapSwal();
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
      
        // obtener los campos name, email, phone, message
        const { name, email, phone, message } = e.target;
        console.log(name.value, email.value, phone.value, message.value);
 swal.showSuccess('hola')
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="component-input" name="formContact" autoComplete="off">
                <h2 className='title mb-5'>
                    Get in touch <span className='subtitle d-block'>We are hiring!</span>
                </h2>
                <div className="group">
                    <input id="name" name="name" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label htmlFor="name">Name</label>
                    {/* <!-- <div className="error">
                            <small> *el dato es incorrecto</small>
                        </div> --> */}
                </div>

                <div className="group">
                    <input id="email" name="email" type="email" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Email</label>
                    {/* <!-- <div className="error">
                            <small> *el dato es incorrecto</small>
                        </div> --> */}
                </div>
                <div className="group">
                    <input id="phone" name="phone" type="tel" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label htmlFor="phone">Phone</label>
                    {/* <!-- <div className="error">
                            <small> *el dato es incorrecto</small>
                        </div> --> */}
                </div>

                <div className="group">
                    <textarea rows={3} id="message" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label htmlFor="message">Message</label>
                    {/* <!-- <div className="error">
                            <small> *el dato es incorrecto</small>
                        </div> --> */}
                </div>

                <Button type="submit" text='Send' clases='btn__primary mt-3' />
            </form>
        </>
    )
}
