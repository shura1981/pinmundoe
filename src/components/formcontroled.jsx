
import { useState } from 'react';
import Button from "./button";
import { wrapSwal, Http } from '../helpers';
const endpoint = 'https://api.mulata.fit/api/usuarios';
const endpointTest = 'http://localhost/backendmundoE/api/usuarios';
export default function FormControled() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const [isNameTouch, setIsNameTouch] = useState(false);
    const [isEmailTouch, setIsEmailTouch] = useState(false);
    const [isPhoneTouch, setIsPhoneTouch] = useState(false);
    const [isMessageTouch, setIsMessageTouch] = useState(false);

    const limitNumberCell = 6; // limite de caracteres para el numero de celular para Colombia son 10, lo dejo en 6 porque no sé en argentina cuantos son

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

    const clearForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setIsEmailTouch(false);
        setIsNameTouch(false);
        setIsPhoneTouch(false);
        setIsMessageTouch(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        wrapSwal.toogleLoading({});//mostrar el loading
        const headers = {
            'Content-Type': 'application/json',
            "Authorization": "Basic Y2tfZGJjMDI5ZTA2ZWJmZTdmNjg5YjJmZTRiOGJkNzhjNWEyNzlhN2IxYjpjc180ODhjOTNjOTlhOTE3OTc4NzU4N2Y0NmIzYmIyNWZkYzNmYzdlZDBj"
        }
        Http({
            url: endpoint,
            headers: headers,
            method: 'POST', body: { name, email, phone, message }
        })
            .then((response) => {
                clearForm();//limpiar el formulario
                wrapSwal.showToast({
                    title: 'Message sent successfully',
                    icon: 'success',
                    position: wrapSwal.POSITION.BOTTOM_END
                });
            }).catch((error) => {
                console.log(error);
                wrapSwal.showErrorFetch("Error al enviar el mensaje");
            });

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
        return regex.test(phone.trim()) && phone.trim().length > limitNumberCell;
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
