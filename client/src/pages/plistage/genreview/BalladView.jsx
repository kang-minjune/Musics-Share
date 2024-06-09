import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./genreview.css";

const BalladView = () => {
    const [balladData, setBalladData] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchBalladData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/musicinfo/`);
                if (response && response.data && response.data.length > 0) {
                    const filteredMusic = response.data.filter(item => item.genre === "발라드");
                    setBalladData(filteredMusic);
                }
            } catch (error) {
                console.error('Error fetching the Ballad data', error);
            }
        };

        if (apiUrl) {
            fetchBalladData();
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
                <img src='/images/MusicBox.png' className='CDGIF' alt="Ballad"/>
                <span className='pliInfoSpan'>Ballad</span>
                {isHovered && (
                    <div className='genreDataList'>
                        {balladData.length > 0 ? (
                            <ul className='genreList'>
                                {balladData.map((music, index) => (
                                    <li key={index} className='genreListItem'>
                                        {music.title} by {music.artist}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No Ballad data available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BalladView;
