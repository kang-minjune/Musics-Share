import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./genreview.css";

const IndieView = () => {
    const [indieData, setIndieData] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchIndieData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/musicinfo/`);
                if (response && response.data && response.data.length > 0) {
                    const filteredMusic = response.data.filter(item => item.genre === "인디");
                    setIndieData(filteredMusic);
                }
            } catch (error) {
                console.error('Error fetching the Indie data', error);
            }
        };

        if (apiUrl) {
            fetchIndieData();
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
                <img src='/images/MusicBox.png' className='CDGIF' alt="Indie"/>
                <span className='pliInfoSpan'>Indie</span>
                {isHovered && (
                    <div className='genreDataList'>
                        {indieData.length > 0 ? (
                            <ul className='genreList'>
                                {indieData.map((music, index) => (
                                    <li key={index} className='genreListItem'>
                                        {music.title} by {music.artist}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No Indie data available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default IndieView;
