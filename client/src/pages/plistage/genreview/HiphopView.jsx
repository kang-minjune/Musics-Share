import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./genreview.css";

const HiphopView = () => {
    const [hiphopData, setHiphopData] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchHiphopData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/musicinfo/`);
                if (response && response.data && response.data.length > 0) {
                    const filteredMusic = response.data.filter(item => item.genre === "힙합");
                    setHiphopData(filteredMusic);
                }
            } catch (error) {
                console.error('Error fetching the HIPHOP data', error);
            }
        };

        if (apiUrl) {
            fetchHiphopData();
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
                <img src='/images/MusicBox.png' className='CDGIF' alt="HIPHOP"/>
                <span className='pliInfoSpan'>HIPHOP</span>
                {isHovered && (
                    <div className='genreDataList'>
                        {hiphopData.length > 0 ? (
                            <ul className='genreList'>
                                {hiphopData.map((music, index) => (
                                    <li key={index} className='genreListItem'>
                                        {music.title} by {music.artist}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No HIPHOP data available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HiphopView;
