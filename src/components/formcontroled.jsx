
import { useState } from 'react';
import Button from "./button";
import { wrapSwal } from '../helpers';
export default function FormControled() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const [isNameTouch, setIsNameTouch] = useState(false);
    const [isEmailTouch, setIsEmailTouch] = useState(false);
    const [isPhoneTouch, setIsPhoneTouch] = useState(false);
    const [isMessageTouch, setIsMessageTouch] = useState(false);


    const handledChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'message':
                setMessage(value);
                break;
            default:
                break;
        }
    }
    const handledBlur = (e) => {
        const { name } = e.target;
        switch (name) {
            case 'name':
                setIsNameTouch(true);
                break;
            case 'email':
                setIsEmailTouch(true);
                break;
            case 'phone':
                setIsPhoneTouch(true);
                break;
            case 'message':
                setIsMessageTouch(true);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);

        // obtener los campos name, email, phone, message
        const { name, email, phone, message } = e.target;
        console.log(name.value, email.value, phone.value, message.value);
        wrapSwal.toogleLoading({});
        setTimeout(() => {
            wrapSwal.showToast({
                title: 'Message sent successfully',
                icon: 'success',
                position: wrapSwal.POSITION.BOTTOM_END
            });

        }, 2000);
    }
    const isNameValid = () => {
        if (!isNameTouch) return true;
        return name.trim().length > 0;
    }
    const isEmailValid = () => {
        // regix para validar email
        const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!isEmailTouch) return true;
        return regex.test(email.trim());
    }
    const isPhoneValid = () => {
        // regix para validar phone
        const regex = /^\d{7,14}$/;
        if (!isPhoneTouch) return true;
        return regex.test(phone.trim()) && phone.trim().length > 9;
    }

    const isMessageValid = () => {
        if (!isMessageTouch) return true;
        return message.trim().length > 0;
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="component-input" name="formContact" autoComplete="off">
                <h2 className='title mb-5'>
                    Get in touch <span className='subtitle d-block'>We are hiring!</span>
                </h2>
                <div className="group">
                    <input value={name} onBlur={handledBlur} onChange={handledChange} id="name" name="name" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label htmlFor="name">Name</label>
                    <div className={isNameValid() ? "error" : "error active"}>
                        <small> *el dato es obligatorio</small>
                    </div>
                </div>

                <div className="group">
                    <input value={email} onBlur={handledBlur} onChange={handledChange} id="email" name="email" type="email" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Email</label>
                    <div className={isEmailValid() ? "error" : "error active"}>
                        <small> *el dato es obligatorio</small>
                    </div>
                </div>
                <div className="group">
                    <input value={phone} onBlur={handledBlur} onChange={handledChange} id="phone" name="phone" type="tel" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label htmlFor="phone">Phone</label>
                    <div className={isPhoneValid() ? "error" : "error active"}>
                        <small> *el dato es obligatorio</small>
                    </div>
                </div>

                <div className="group">
                    <textarea onBlur={handledBlur} onChange={handledChange} rows={3} id="message" value={message} name="message" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label htmlFor="message">Message</label>
                    <div className={isMessageValid() ? "error" : "error active"}>
                        <small> *el dato es obligatorio</small>
                    </div>
                </div>

                <Button type="submit" text='Send' clases='btn__primary mt-3' />
            </form>
        </>
    )
}
