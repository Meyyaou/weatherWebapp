import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
const Contact = () => {
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_i3f9db8', 'template_rjgf559', form.current, {
        publicKey: 'HLOEbbNeSRmrDhvKt',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setSuccessMessage('Message successfully sent!');

        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className='form-container'>
    <h2>Contact Us</h2>
    <form ref={form} onSubmit={sendEmail}>
     <div className='user-box'>
      <input type="text" name="from_name"  id='name' required/>
      <label>Name</label>
      </div>
      <div className='user-box'>
      <input type="email" name="from_email" id='email' required/>
      <label>Email</label>
      </div>
      <div className='user-box'>
      <textarea name="message" id='msg' required/>
      <label>Message</label>
      </div>
      {successMessage && <p className="success-message" style={{fontSize: "1em"}}>{successMessage}</p>}
      <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <input type="submit" value="Send" id='send-button'/>
          </a>
          
    </form>
    
    </div>
  );
};
export default Contact;