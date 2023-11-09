import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, FormEvent, useState} from 'react';

import styles from './ContactForm.module.css';


const ContactForm = () => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });
  const [inputs, setInputs] = useState({
    email: '',
    message: '',
  });
  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setInputs({
        email: '',
        message: '',
      });
    } else {
      setStatus({
        info: { error: true, msg: msg },
        submitting: false,
        submitted: false,
      });
    }
  };
  const handleOnChange = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
  };

  const handleOnSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    const formData = new FormData();
    formData.append('email', inputs.email);
    formData.append('message', inputs.message);

    axios({
      method: 'POST',
      url: 'https://formspree.io/f/meqbddgw',
      data: formData,
    })
      .then((_response: AxiosResponse) => {
        handleServerResponse(
          true,
          'There it is! I don\'t know what got you this far, but I\'m glad you\'re here.',
        );
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error);
      });
  };

  const emailLabelColor = inputs.email.length == 0 ? 'text-white': 'text-gray-700';
  const messageLabelColor = inputs.message.length == 0 ? 'text-white': 'text-gray-700';
  return (
    <div className={`flex flex-col max-w-xs ${styles.contactForm}`}>
      <h3 className='mb-3 text-xl'>I&apos;m All... I&apos;m Mostly Ears</h3>
      <hr />
      <form onSubmit={handleOnSubmit} className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <div className="mb-4">
        <label className={`transition duration-500 ease-in-out transform ${emailLabelColor}`} htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="_replyto"
          placeholder="Email"
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={handleOnChange}
          required
          value={inputs.email}
        />
        </div>
        <div className="mb-4">
        <label className={`transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none ${messageLabelColor}`} htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Message"
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={handleOnChange}
          required
          value={inputs.message}
        />
        </div>
        <button 
          className='bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type="submit" 
          disabled={status.submitting}>
          {!status.submitting
            ? !status.submitted
              ? 'Submit'
              : 'Submitted'
            : 'Submitting...'}
        </button>
      </form>
      {status.info.error && (
        <div className="error">Error: {status.info.msg}</div>
      )}
      {!status.info.error && status.info.msg && <p>{status.info.msg}</p>}
    </div>
  );
};

export default ContactForm;
