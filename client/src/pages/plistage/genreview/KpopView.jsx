import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./genreview.css";

const KpopView = () => {
    const [kpopData, setKpopData] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchKpopData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/musicinfo/`);
                if (response && response.data && response.data.length > 0) {
                    const filteredMusic = response.data.filter(item => item.genre === "K-POP");
                    setKpopData(filteredMusic);
                }
            } catch (error) {
                console.error('Error fetching the R&B data', error);
            }
        };

        if (apiUrl) {
            fetchKpopData();
        } else {
            console.error('API URL is not defined');
        }
    }, [apiUrl]);

    return (
        <div>
            <div 
                className='hoverContainer'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src='/images/MusicBox.png' className='CDGIF' alt="K-POP"/>
                <span className='pliInfoSpan'>K-POP</span>
                {isHovered && (
                    <div className='genreDataList'>
                        {kpopData.length > 0 ? (
                            <ul className='genreList'>
                                {kpopData.map((music, index) => (
                                    <li key={index} className='genreListItem'>
                                        {music.title} by {music.artist}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No K-POP data available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KpopView;
