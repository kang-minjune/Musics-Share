import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

import "./ballad.css";

const Ballad = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [mpData, setMpData] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {    
                const response = await axios.get(`${apiUrl}/musicinfo/`);          
                if(response.data.length > 0){
                    const filteredMusic = response.data.filter(item => item.genre === "발라드");
                    setMpData(filteredMusic);
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

    const goTo = (path) => {
        navigate(path);
    };

    const filteredData = mpData.filter(music =>
        music.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        music.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='BalladMain'>
            <div className='sideMain'>
                <div className='sideContents'>
                    <div className='sideBtnDiv'>
                        <button type='button' className='balladNaviBtn' onClick={() => goTo('/rnb')}><b>R&B</b></button>
                        <button type='button' className='balladNaviBtn' onClick={() => goTo('/kpop')}><b>K-POP</b></button>
                        <button type='button' className='balladNaviBtn' onClick={() => goTo('/indie')}><b>Indie</b></button>
                        <button type='button' className='balladNaviBtn' onClick={() => goTo('/hiphop')}><b>HIP HOP</b></button>
                        <button type='button' className='balladNaviBtn' onClick={() => goTo('/ballad')}><b>Ballad</b></button>
                        <button type='button' className='balladNaviBtn' onClick={() => goTo('/pop')}><b>POP</b></button>
                    </div>
                </div>
            </div>
            <div className="balladContainer">
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
                    />
                </div>
                <hr />
                <div className="listmain">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <div className="listpack">
                        {/* Render music list */}
                        {filteredData.map((music, index) => (
                            <div className="list-box" key={index}>
                                <h3 style={{ alignItems: 'center' }}><b>Sync</b></h3>
                                <iframe 
                                    src={music.link} 
                                    title={music.title} 
                                    style={{width:"340px", height:"170px"}}
                                    allowFullScreen
                                />
                                <h4>아티스트 : {music.artist}</h4>
                                <p>제목 : {music.title}</p>
                                <p>장르 : {music.genre}</p>
                                <p>포스팅 : {user && music.userid === user._id ? user.username : music.userid}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ballad;
