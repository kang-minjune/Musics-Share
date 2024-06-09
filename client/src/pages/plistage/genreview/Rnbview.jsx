import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./genreview.css";

const Rnbview = () => {
    const [rnbData, setRnbData] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchRnbData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/musicinfo/`);
                if (response && response.data && response.data.length > 0) {
                    const filteredMusic = response.data.filter(item => item.genre === "R&B");
                    setRnbData(filteredMusic);
                }
            } catch (error) {
                console.error('Error fetching the R&B data', error);
            }
        };

        if (apiUrl) {
            fetchRnbData();
        } else {
            console.error('API URL is not defined');
        }
    }, [apiUrl]);

    return (
        <div className='genreListMain'>
            <div 
                className='hoverContainer'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src='/images/MusicBox.png' className='CDGIF' alt="R&B"/>
                <span className='pliInfoSpan'>R&B</span>
                {isHovered && (
                    <div className='genreDataList'>
                        {rnbData.length > 0 ? (
                            <ul className='genreList'>
                                {rnbData.map((music, index) => (
                                    <li key={index} className='genreListItem'>
                                        {music.title} by {music.artist}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No R&B data available</p>
                        )}
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default Rnbview;
