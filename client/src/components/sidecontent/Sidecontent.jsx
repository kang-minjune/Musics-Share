import React , { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import "./sidecontent.css";

const Sidecontent = () => {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [mpData, setMpData] = useState({
        username:'',
     });

     useEffect(() => {
        if(user) {
           setMpData({
              username: user.username,
           });
        }
     }, [user]);

    const { username } = mpData;
    
    //로그인 안하면 다른 페이지 못가게
    const goTo = (path) => {
        if(username){
            navigate(path);
        } else{
            navigate('/login', { replace: true });
        }
        
    }

   return(
    <div className='sideMain'>
        <div className='sideContents'>
            <div className='sideBtnDiv'>
               <button type='button' className='naviBtn' onClick={() => goTo('/plistage')}><b>ALL Sync</b></button>
               <button type='button' className='naviBtn' onClick={() => goTo('/posting')}><b>UP Sync</b></button>
               <button type='button' className='naviBtn' onClick={() => goTo('/edit')}><b>RE Sync</b></button>
               <button type='button' className='naviBtn' onClick={() => goTo('/mypage')}><b>MY Sync</b></button>
            </div>
        </div>
       
    </div>
   )
}

export default Sidecontent;