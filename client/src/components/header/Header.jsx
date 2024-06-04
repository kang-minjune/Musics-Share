import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./header.css";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);

    const goToHome = () => {
        navigate('/');
    };

    const goToLogin = () => {
      navigate('/login');
    };

    const goToRegister = () => {
      navigate('/register');
    };

    const handleLogoutButton = async () => {
      try{
        const apiUrl = process.env.REACT_APP_API_URL;
        await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials:  true });
        dispatch({ type: "LOGOUT" });
        window.location.reload();
      } catch(err){
        console.log(err);
      }
    };

    return(
      
     <div className='headerMain'>
       <div className='headerContents'>
         <div className='headerLogo'>
                  <button className='HomeBtn' onClick={goToHome}>
                       <strong>
                           <h1>Sync
                               <img src="/images/logo.png" width={"40px"} height={"40px"}/>
                           </h1>
                       </strong>
                  </button>
         </div>
         
         
            <div className='headerBtnDiv'>
              {user ? <button className='headerBtn' onClick={handleLogoutButton} style={{marginLeft:"40%"}}>LOGOUT</button> : (
                <div className='headerBtnDiv'>
                    <button className='headerBtn' onClick={goToRegister}>REGISTER</button>
                    <button className='headerBtn' onClick={goToLogin}>LOGIN</button>   
                </div>
              )}            
            </div>
          
       </div>
     </div>
    )
 }
 
 export default Header;