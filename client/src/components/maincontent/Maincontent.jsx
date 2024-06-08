import React, { useEffect, useState } from 'react';
import "./maincontent.css";

const Maincontent = () => {
  // 음악 재생 여부와 팝업 표시 여부를 추적하는 상태
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("bgmAudio");
    const audioControlBtn = document.getElementById("audioControlBtn");

    // 버튼 클릭 시 음악 일시 중지 및 재개
    const handleAudioControl = () => {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    };

    // 음악이 끝나면 다시 시작
    const handleAudioEnd = () => {
      audio.play();
      setIsPlaying(true);
    };

    // 이벤트 리스너 추가
    audioControlBtn.addEventListener("click", handleAudioControl);
    audio.addEventListener("ended", handleAudioEnd);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      audioControlBtn.removeEventListener("click", handleAudioControl);
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, []); // 빈 배열을 전달하여 최초 렌더링 시에만 실행

  // 팝업 열기 함수
  const openPopup = () => {
    setIsPopupVisible(true);
  };

  // 팝업 닫기 함수
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className='contentMain'> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <p className='pContent1'>
          <span className='cd'></span>  
          <b>
            Share your playlist. <button onClick={openPopup} id="popupControlBtn" className="metal linear">MANUAL</button> <br/>
            Sync it right now!
          </b>

          <audio id="bgmAudio" controls className='audioBGM'>
            <source src="/audio/Quartz.mp3" type="audio/mpeg" />
          </audio>
          <button id="audioControlBtn" className="metal linear">BGM</button>
        </p>

      
      
      {/* <div className='MainImgDiv'>
        
        <img className="MusicImg" id="Album1" src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.namu.wiki%2Fi%2FkJtBvYJUGPz5ZynVjMk6RKGTBE2cIZetP8SVXdQEzd_ZX757nQJhTqPXE_WsUQmhIBbP4s0tNLVqIYh1n9D1vQ.webp&type=a340" alt="LP1"/>
        <img className="MusicImg" id="Album2" src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA2MDZfMjI1%2FMDAxNjIyOTU3OTE3NjA5.PT3Qic4vYoncWRKJqCFxlGIL6eOIoINX_MXOdquFi8cg.0FRLLSkkCXh_mfj0PKdyDmN6MhSy9FO9gqqydSGfKpgg.JPEG.jihye604012%2FKakaoTalk_20210606_142425959.jpg&type=a340" alt="LP2"/>
        <img className="MusicImg" id="Album3" src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F396%2F2014%2F07%2F22%2F20140722000849_0_99_20140722105407.jpg&type=a340" alt="LP3"/>
        <img className="MusicImg" id="Album4" src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MTlfMzYg%2FMDAxNjg5NzY4MTYzMzg2.feWn6plZhnZ1fZ7hB7UJDZYmqE3h6cIQ4ITyxMn6ZWIg.3Z2EXnsP1RTYa3IKBwWG-v1jJKAnT7DxJph5Q94CpHsg.JPEG.wwies%2FIMG_3578.jpg&type=a340" alt="LP4"/>
      </div> */}


      
      
      {isPopupVisible && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Sync Manual <img src='/images/logo.png' width={"30px"} height={"30px"}/> </h2>
            <p className='pContent2'> 
              ALL Sync로 즐기고<br/>
              UP Sync로 올리고<br/>
              RE Sync로 수정하고<br/>
              My Sync로 보관하고<br/>
            </p>
            <button onClick={closePopup} className='popupClose'>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maincontent;
