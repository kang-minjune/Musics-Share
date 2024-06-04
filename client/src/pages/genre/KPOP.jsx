import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

import "./kpop.css";

const Kpop = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [mpData, setMpData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {  
                const response = await axios.get(`${apiUrl}/musicinfo/`);
                if (response && response.data && response.data.length > 0) {
                    // 장르가 "R&B" 또는 "알앤비"인 곡만 필터링하여 가져옴
                    const filteredMusic = response.data.filter(item => item.genre === "K-POP");
                    setMpData(filteredMusic); // 필터링된 곡의 정보를 받아옴
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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
       const lowercasedSearchTerm = searchTerm.toLowerCase();
       const filterResults = mpData.filter(music =>
        music.artist.toLowerCase().includes(lowercasedSearchTerm) ||
        music.title.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredData(filterResults);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const goTo = (path) => {
        navigate(path);
    };

    return (
        <div className='KpopMain'>
            <div className='sideMain'>
                <div className='sideContents'>
                    <div className='sideBtnDiv'>
                        <button type='button' className='kpopNaviBtn' onClick={() => goTo('/rnb')}><b>R&B</b></button>
                        <button type='button' className='kpopNaviBtn' onClick={() => goTo('/kpop')}><b>K-POP</b></button>
                        <button type='button' className='kpopNaviBtn' onClick={() => goTo('/indie')}><b>Indie</b></button>
                        <button type='button' className='kpopNaviBtn' onClick={() => goTo('/hiphop')}><b>HIP HOP</b></button>
                        <button type='button' className='kpopNaviBtn' onClick={() => goTo('/ballad')}><b>Ballad</b></button>
                        <button type='button' className='kpopNaviBtn' onClick={() => goTo('/pop')}><b>POP</b></button>
                    </div>
                </div>
            </div>
            <div className="kpopContainer">
                <div className="search-container">
                    <input 
                        type="search"
                        className="search"
                        style={{
                            width: '450px',
                            height: '25px',
                            border: 'none',
                            borderBottom: '1px solid black'
                        }}
                        placeholder="아티스트명/제목/장르 검색"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                        
                    />
                    <button 
                        className="search-send"
                        style={{
                            width: '60px',
                            height: '25px',
                            backgroundColor: 'transparent',
                            color: 'black',
                            border: "none",
                        }}
                        onClick={handleSearch}
                    >
                        검색
                    </button>
                </div>
                <hr />
                <div className="listmain">
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <div className="listpack">
                        {/* Render music list using mpData */}
                        {(filteredData.length > 0 ? filteredData : mpData).map((music, index) => (
                            <div className="list-box" key={index}>
                                <h3 style={{ alignItems: 'center' }}><b>Sync</b></h3>
                                <iframe src={music.link} title={music.title} style={{width:"350px", height:"200px"}}/>
                                <h4>아티스트 : {music.artist}</h4>
                                <p>제목 : {music.title}</p>
                                <p>장르 : {music.genre}</p>
                                <p>포스팅 : {music.userid === user._id ? user.username : music.userid}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Kpop;
