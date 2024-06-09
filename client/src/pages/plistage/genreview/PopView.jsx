import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./genreview.css";

const PopView = () => {
    const [popData, setPopData] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchPopData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/musicinfo/`);
                if (response && response.data && response.data.length > 0) {
                    const filteredMusic = response.data.filter(item => item.genre === "POP");
                    setPopData(filteredMusic);
                }
            } catch (error) {
                console.error('Error fetching the Pop data', error);
            }
        };

        if (apiUrl) {
            fetchPopData();
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
                <img src='/images/MusicBox.png' className='CDGIF' alt="Pop"/>
                <span className='pliInfoSpan'>Pop</span>
                {isHovered && (
                    <div className='genreDataList'>
                        {popData.length > 0 ? (
                            <ul className='genreList'>
                                {popData.map((music, index) => (
                                    <li key={index} className='genreListItem'>
                                        {music.title} by {music.artist}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No Pop data available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopView;
