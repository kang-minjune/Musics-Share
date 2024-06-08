import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./plistage.css";
import Sidecontent from '../../components/sidecontent/Sidecontent';

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
           
           <button type="button" onClick={openPopup} id="plistagePopupBtn" className="metal linear">NOTICE</button>
           <span className='pliNoticeSpan'>To navigate to a genre page, click the button on the left!</span>
           
           <p>
           <br/><br/>
            <img src='/images/MusicBox.png' className='CDGIF'/><span className='pliInfoSpan'>R&B</span> <br/>
            <img src='/images/MusicBox.png' className='CDGIF'/><span className='pliInfoSpan'>K-POP</span> <br/>
            <img src='/images/MusicBox.png' className='CDGIF'/><span className='pliInfoSpan'>Indie</span> <br/>
            <img src='/images/MusicBox.png' className='CDGIF'/><span className='pliInfoSpan'>HIPHOP</span> <br/>
            <img src='/images/MusicBox.png' className='CDGIF'/><span className='pliInfoSpan'>Ballad</span> <br/>
            <img src='/images/MusicBox.png' className='CDGIF'/><span className='pliInfoSpan'>POP</span> <br/>
           </p>
      </div>

      <div className='sideMain'>
         <div className='sideContents'>
               <div className='sideBtnDiv'>
                  <button type='button' className='pliNaviBtn' onClick={() => goTo('/rnb')}><b>R&B</b></button>
                  <button type='button' className='pliNaviBtn' onClick={() => goTo('/kpop')}><b>K-POP</b></button>
                  <button type='button' className='pliNaviBtn' onClick={() => goTo('/indie')}><b>Indie</b></button>
                  <button type='button' className='pliNaviBtn' onClick={() => goTo('/hiphop')}><b>HIPHOP</b></button>
                  <button type='button' className='pliNaviBtn' onClick={() => goTo('/ballad')}><b>Ballad</b></button>
                  <button type='button' className='pliNaviBtn' onClick={() => goTo('/pop')}><b>POP</b></button>
               </div>
         </div>
      </div>
        
      {isPopupVisible && (
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
         )}
    </div>
   )
}

export default Plistage;