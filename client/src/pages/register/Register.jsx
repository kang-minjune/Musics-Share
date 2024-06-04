import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "./register.css";

const Register = () => {
   const [ credentials, setCredentials ] = useState({
        username: '',
        password: '',
        realname: '',
        email : '',
        phone : '',
        country: '',
        city : ''
   })

   const navigate = useNavigate();

   const handleRegisterClick = async (e) => {
       e.preventDefault();
       try{
           const apiUrl = process.env.REACT_APP_API_URL;
           const res = await axios.post(`${apiUrl}/auth/register`, credentials);
           console.log(res.data);
           navigate('/login');
       } catch (err) {
           console.error(err.response.data);
       }
   }

   const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
   }
   return(
      <div className='RegisterMain'>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <fieldset className='RegisterField'>

          <div className='RegisterDiv'>

              <form className='RegisterForm'>
                  <span className='RegisterSpan'>ID </span>
                  <input type="text" id='username' className='RegisterWrite' placeholder='User ID' onChange={handleChange} required />

                  <span className='RegisterSpan'>PW </span>
                  <input type='password' id='password' className='RegisterWrite' placeholder='User Password' onChange={handleChange} required />

                  <span className='RegisterSpan'>User Name </span>
                  <input type='text' id='realname' className='RegisterWrite' placeholder='User Name' onChange={handleChange} required />

                  <span className='RegisterSpan'>E-Mail </span>
                  <div>
                      <input type='email' id='email' className='RegisterEmail' placeholder='User E-mail' onChange={handleChange} required />
                      <button type='button' className='EmailConfirmBtn'>Confirm Email</button>
                  </div>

                  <span className='RegisterSpan'>Phone </span>
                  <div>
                      <input type='tel' id='phone' className='RegisterPhone' placeholder='User Phone Number' onChange={handleChange} required />
                      <button type='button' className='EmailConfirmBtn'>Confirm Number</button>
                  </div>

                  <div className='RegisterSpan'>
                      <span className='RegisterSpan'>Address </span>
                  </div>

                  <div className='GenderAddress'>
                      <input type='text' id='country' className='CountryWrite' placeholder='User Country' onChange={handleChange} required />
                      <input type='text' id='city' className='CityWrite' placeholder='User City' onChange={handleChange} required />
                      <button type='button' className='AddressConfirmBtn'>Confirm Address</button>
                  </div>


                  <div className='RegisterBtnForm'>
                      <button type='submit' className='RegisterBtn' onClick={handleRegisterClick} >JOIN</button>
                  </div>

              </form>

          </div>
      </fieldset>
  </div>
   )
}

export default Register;