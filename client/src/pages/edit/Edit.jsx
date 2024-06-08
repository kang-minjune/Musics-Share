import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "./edit.css";
import { AuthContext } from '../../context/AuthContext';

const Edit = () => {
   const { user } = useContext(AuthContext);

   const [popupVisibility, setPopupVisibility] = useState({
      rnb: false,
      kpop: false,
      indie: false,
      hiphop: false,
      ballad: false,
      pop: false,
   });

   const [mpData, setMpData] = useState([]);
   const [editData, setEditData] = useState(null);

   const apiUrl = process.env.REACT_APP_API_URL;

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`${apiUrl}/musicinfo/`);
            if (response && response.data) {
               setMpData(response.data);
            }
         } catch (error) {
            console.error('Error fetching the music data', error);
         }
      };
   
      if (apiUrl) {
         fetchData();
      } else {
         console.error('API URL is not defined');
      }
   }, [apiUrl]);

   const handleEditChange = (field, value) => {
      setEditData((prevState) => ({
         ...prevState,
         [field]: value,
      }));
   };

   const handleSave = async () => {
      try {
         const response = await axios.put(`${apiUrl}/musicinfo/edit/${editData._id}`, editData);
         setMpData((prevState) =>
            prevState.map((music) => (music._id === editData._id ? response.data : music))
         );
         setEditData(null);
      } catch (error) {
         console.error('Error updating the music data', error);
      }
   };

   const handleDelete = async (music) => {
      try {
         await axios.delete(`${apiUrl}/musicinfo/delete/${music._id}`);
         setMpData((prevState) => prevState.filter((item) => item._id !== music._id));
      } catch (error) {
         console.error('Error deleting music data', error);
      }
   };

   const togglePopup = (genre) => {
      setPopupVisibility((prevState) => ({
         ...prevState,
         [genre]: !prevState[genre],
      }));
      setEditData(null);
   };

   const filterDataByUser = (data) => {
      return data.filter((music) => music.userid === user._id);
   };

   const renderMusicList = (genre) => {
      return filterDataByUser(mpData)
         .filter((music) => music.genre === genre)
         .map((music) => (
            <div className="uploadInfo" key={music._id}>
               {editData && editData._id === music._id ? (
                  <>
                     <input
                        type="text"
                        value={editData.artist}
                        onChange={(e) => handleEditChange('artist', e.target.value)}
                        style={{ marginBottom: '2%' }}
                        required
                     />
                     <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => handleEditChange('title', e.target.value)}
                        style={{ marginBottom: '2%' }}
                        required
                     />
                     <input
                        type="text"
                        value={editData.genre}
                        onChange={(e) => handleEditChange('genre', e.target.value)}
                        style={{ marginBottom: '2%' }}
                        required
                     />
                     <input
                        type="text"
                        value={editData.link}
                        onChange={(e) => handleEditChange('link', e.target.value)}
                        style={{ marginBottom: '2%' }}
                        required
                     />
                     <div className="editBtnDiv1">
                        <button onClick={handleSave} className="editSaveBtn">
                           Save
                        </button>
                        <button onClick={() => setEditData(null)} className="editCancelBtn">
                           Cancel
                        </button>
                     </div>
                  </>
               ) : (
                  <>
                     <span className="uploadInfoSpan">아티스트: {music.artist}</span>
                     <span className="uploadInfoSpan">제목: {music.title}</span>
                     <span className="uploadInfoSpan">장르: {music.genre}</span>
                     <span className="uploadInfoSpan">링크: {music.link}</span>
                     <div className="editBtnDiv2">
                        <button onClick={() => setEditData(music)} className="musicEditBtn">
                           Edit
                        </button>
                        <button onClick={() => handleDelete(music)} className="musicEditBtn">
                           Delete
                        </button>
                     </div>
                  </>
               )}
            </div>
         ));
   };

   const renderPopup = (genre, genreName) => (
      popupVisibility[genre] && (
         <div className="mypagePopupMain" onClick={() => togglePopup(genre)}>
            <div className="mypagePopupDetail" onClick={(e) => e.stopPropagation()}>
               <h2>
                  Posted My {genreName} <img src="/images/CDPlay.gif" width={"35px"} height={"35px"} alt="CD Play" />
               </h2>
               <br />
               <button onClick={() => togglePopup(genre)} className="mypagePopupClose">
                  CLOSE
               </button>
               <br />
               <br />
               <div className="uploadInfoScrollable">{renderMusicList(genreName)}</div>
               <br />
               <br />
               <br />
            </div>
         </div>
      )
   );

   return (
      <div className="editMain">
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <div className="editForm">
            <div className="editInputDiv">
               <div className="mypagePopup" onClick={(e) => e.stopPropagation()}>
                  <h1>Edit My Music</h1>
                  <br />
                  <br />
                  <div className="uploadInfoMain" style={{ float: 'left', width: '90%', height: 'auto', paddingLeft: '5%' }}>
                     <button className="mySyncBtn" onClick={() => togglePopup('rnb')}>
                        <b>R&B</b>
                     </button>
                     <button className="mySyncBtn" onClick={() => togglePopup('kpop')}>
                        <b>K-POP</b>
                     </button>
                     <button className="mySyncBtn" onClick={() => togglePopup('indie')}>
                        <b>K인디</b>
                     </button>
                     <button className="mySyncBtn" onClick={() => togglePopup('hiphop')}>
                        <b>K힙합</b>
                     </button>
                     <button className="mySyncBtn" onClick={() => togglePopup('ballad')}>
                        <b>K발라드</b>
                     </button>
                     <button className="mySyncBtn" onClick={() => togglePopup('pop')}>
                        <b>KPOP</b>
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {renderPopup('rnb', 'R&B')}
         {renderPopup('kpop', 'K-POP')}
         {renderPopup('indie', '인디')}
         {renderPopup('hiphop', '힙합')}
         {renderPopup('ballad', '발라드')}
         {renderPopup('pop', 'POP')}
      </div>
   );
};

export default Edit;
