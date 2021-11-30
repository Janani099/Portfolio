
import React, { useRef,useState } from 'react';
import emailjs from 'emailjs-com';
import './Contactus.css';

const Result =() => {
  return(
   <p>Your message is sent successfully</p>
  );
 };

  const Contactus = () => {
    const [result,showResult] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_6yuv1hx', 'template_kwnppma', form.current, 'user_6N9lEf7b7bsZcDB0BZh9e')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    e.target.reset();
    showResult(true);
};

//hide result
setTimeout(() => {
 showResult(false);
},5000);

  return (
    <div className="contactus">
    <div className = "container">
      <div className = "row">
        <div className = "col.md-8 m-auto">
          <h1 className = "label">Contact Us</h1>
          <hr />
          <p className = "content">Get in Touch</p>
    <form ref={form} onSubmit={sendEmail} className="form-control">
      <span className="label01">Name</span><br />
      <input className = "label1" type="text" name="fullname" /><br />

      <span className="label01"> Email</span><br />
      <input className = "label1" type="email" name="email" /><br />

      <span className="label01">Phone Number</span><br />
      <input className="label1" type="phno" name="phno" /><br />

      <span className="label01">Message</span><br />
      <textarea className = "label1" name="message" /><br />

      <input type = "submit" className = "cont btn-info btn-block mt-4"></input>
        
      <div className = "row">
      {result ? <Result /> : null}
     </div>
    </form>
    </div>
    </div>
    </div>
   </div>
     );
};

export default Contactus;