import React, { useState, useContext } from 'react';
import "./posting.css";
import { AuthContext } from '../../context/AuthContext';

const Posting = () => {
   const [isPopupVisible, setIsPopupVisible] = useState(false);

   const { user } = useContext(AuthContext);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const postData = {
         userid: formData.get('userid'),
         artist: formData.get('artist'),
         title: formData.get('title'),
         genre: formData.get('genre'),
         link: formData.get('link'),
      };

      try {
         const apiUrl = process.env.REACT_APP_API_URL;

         console.log(postData);
         const response = await fetch(`${apiUrl}/musicinfo/musicpost`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
         });

         if (!response.ok) {
            throw new Error("Network response was not ok");
         }

         const data = await response.json();
         console.log('Post successful:', data);
         alert('Music posted successfully!');
      } catch (error) {
         console.error('There was an error with your POST request:', error);
         alert('Failed to post music. Please try again.');
      }
   };

   const openPopup = () => {
      setIsPopupVisible(true);
   };

   const closePopup = () => {
      setIsPopupVisible(false);
   };

   return (
      <div className='postingMain'>
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <form className="postingForm" onSubmit={handleSubmit}>
            <h4><strong style={{ float: "left", color:"snow" }}><b>Add Music➕</b></strong></h4>
            <button type="button" onClick={openPopup} id="postPopupBtn" className="metal linear">NOTICE</button>
            <div className='postingInputDiv'>
               <input name="artist" className='postingInput' placeholder="Artist Name" required />
               <input name="title" className='postingInput' placeholder="Title Name" required />

               <input name="userid" defaultValue={user?._id} style={{ display: 'none' }} />

               <select name="genre" style={{float:"left",width:"75px", height:"27px"}}>
                  <option value="장르" disabled selected>장르</option>
                  <option value="R&B">R&B</option>
                  <option value="K-POP">K-POP</option>
                  <option value="인디">인디</option>
                  <option value="힙합">힙합</option>
                  <option value="발라드">발라드</option>
                  <option value="POP">POP</option>
               </select>
               <input name="link" className='postingInput' placeholder="Link bio" style={{float:"left",width:"420px", marginLeft:"1%"}} required />
               <button type="submit" className="postingBtn">POST</button>
            </div>
         </form>

         {isPopupVisible && (
            <div className="postingPopupMain" onClick={closePopup}>
               <div className="postingPopup" onClick={(e) => e.stopPropagation()}>
                  <h2>Post Manual <img src='/images/logo.png' width={"30px"} height={"30px"} /> </h2>
                  
                  <div className="postingInfo" style={{ float: 'left', width: '90%', height: 'auto', paddingLeft: '5%' }}>
                     <p>          
                        <br /><br />
                        <strong style={{ fontSize: '19px' }}>링크 작성 시 유의사항</strong>
                        <br/>
                        
                        
                        <br/>
                        <br/>
                        <a href="https://www.youtube.com/" target='_blank'>
                                <button className='postingPopupClose'>YouTube</button>
                        </a>
                        <button onClick={closePopup} className='postingPopupClose'>CLOSE</button> 
                        <br />
                        <img src="/uploadInfo1.png" alt="업로드 방법1" width="500" height="400" style={{ float: 'left', marginLeft: '13%', marginTop: '5%' }} />
                        <img src="/uploadInfo2.png" alt="업로드 방법2" width="300" height="210" style={{ float: 'left', marginLeft: '1%', marginTop: '5%' }} /><br />
                        <img src="/uploadInfo3.png" alt="업로드 방법3" width="300" height="170" style={{ float: 'left', marginLeft: '1%', marginTop: '2%' }} />           
                        
                     </p>
                 
                  
                  </div>
               </div>
                
            </div>
         )}
      </div>
   );
}

export default Posting;
