import React, { useContext } from 'react';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import "./login.css";

const Login = () => {
   const navigate = useNavigate();

   const handleSignupClick = (e) => {
        e.preventDefault();
        navigate('/register');
   };

   const [ credentials, setCredentials ] = useState({
        username: undefined,
        password: undefined,
   });

   const { loading, error, dispatch } = useContext(AuthContext);

   const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
   };

   const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START"});
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            console.log(`API URL: ${apiUrl}`);
            const res = await axios.post(`${apiUrl}/auth/login`, credentials, { withCredentials: true });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                // 서버로부터 받은 응답의 메시지를 alert으로 표시
                alert(err.response.data.message);
            } else {
                // 서버로부터 받은 응답에 메시지가 없는 경우
                alert("Something went wrong!");
            }
            dispatch({ 
                type: "LOGIN_FAILURE", 
                payload: err.response && err.response.data ? err.response.data : { message: "Something went wrong!" } 
            });
            window.location.reload();
        }
    };


   return(
      <div className='LoginMain'>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <fieldset className='LoginField'>
          <div className='LoginDiv'>
              <form action="" className='LoginForm'>
                  
                  <input 
                         type="text" 
                         id='username' 
                         className='loginId' 
                         placeholder='User ID' 
                         onChange={handleChange} 
                         autocomplete="current-username"
                  />
                  <input 
                         type='password' 
                         id='password' 
                         className='loginPwd' 
                         placeholder='User Password' 
                         onChange={handleChange}
                         autocomplete="current-password"
                  />


                  <div className='LoginBtnForm'>
                      <button 
                             type='button' 
                             className='SignupGoBtn' 
                             onClick={handleSignupClick}>SIGN UP
                      </button>
                      <button 
                             type='submit' 
                             className='loginBtn' 
                             onClick={handleClick} 
                             disabled={loading}>LOGIN
                      </button>
                      {error && <span>{error.message}</span>}
                  </div>
              </form>
          </div>
      </fieldset>
    </div>
   );
};

export default Login;