import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./plistage.css";
import Rnbview from './genreview/Rnbview';
import KpopView from './genreview/KpopView';
import IndieView from './genreview/IndieView';
import HiphopView from './genreview/HiphopView';
import BalladView from './genreview/BalladView';
import PopView from './genreview/PopView';

const Plistage = () => {

   const navigate = useNavigate();

   const [isPopupVisible, setIsPopupVisible] = useState(false);

   const goTo = (path) => {
    navigate(path);
   };

   const openPopup = () => {
      setIsPopupVisible(true);
   };

   const closePopup = () => {
      setIsPopupVisible(false);
   };
   return(
    <div className='stageMain'>

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className='plistageInfo'>
           
         {/* <button type="button" onClick={openPopup} id="plistagePopupBtn" className="metal linear">NOTICE</button> */}
         <span className='pliNoticeSpan'>Navigate to a genre page, click the button on the left!</span>
     
         <br/><br/><br/><br/><br/><br/><br/><br/><br/>

         <div style={{float:"left", fontSize:"24px"}}>
            <b>
                To view the most recently updated list, hover your cursor over the image.
            </b>
         </div>
         
         <br/><br/><br/><br/>

         <div className='pliInfoDiv'>
            <Rnbview />
            <KpopView />
            <IndieView />
            <HiphopView />
            <BalladView />
            <PopView />
         </div>

      </div>

      <div className='sideMain'>
         <div className='sideContents'>
               <div className='sideBtnDiv'>
                  <button type='button' className='pliNaviBtn' onClick={() => goTo('/rnb')}><b>R&B</b></button>
                  <button type='button' className='pliNaviBtn' onClick={() => goTo('/kpop')}><b>K-POP</b></button>
                  <button type='button' className='pliNaviBtn' onClick={() => goTo('/indie')}><b>Indie</b></button>
                  <button type='button' className='pliNaviBtn' onClick={() => goTo('/hiphop')}><b>HIP HOP</b></button>
                  <button type='button' className='pliNaviBtn' onClick={() => goTo('/ballad')}><b>Ballad</b></button>
                  <button type='button' className='pliNaviBtn' onClick={() => goTo('/pop')}><b>POP</b></button>
               </div>
         </div>
      </div>
        
      {/* {isPopupVisible && (
            <div className="plistagePopupMain" onClick={closePopup}>
               <div className="plistagePopup" onClick={(e) => e.stopPropagation()}>
                  <h2> Click Button! <img src='/images/logo.png' width={"30px"} height={"30px"} /> </h2>
                  <div className="pliStageInfo" style={{ float: 'left', width: '90%', height: 'auto', paddingLeft: '5%' }}>
                     <p>
                        <video width="420" height="340" controls>
                           <source src="/images/clickButton.mov" type="video/mp4" />
                        </video>
                     </p> 
                     <button onClick={closePopup} className='plistagePopupClose'>CLOSE</button>
                  </div>
                 
               </div>
            </div>
         )} */}
    </div>
   )
}

export default Plistage;