import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

import "./pop.css";

const ITEMS_PER_PAGE = 8;

const Pop = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [mpData, setMpData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const apiUrl = process.env.REACT_APP_API_URL;
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/musicinfo/`);
                if (response && response.data && response.data.length > 0) {
                    const filteredMusic = response.data.filter(item => item.genre === "POP");
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

    const handleSearch = () => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filterResults = mpData.filter(music =>
            music.artist.toLowerCase().includes(lowercasedSearchTerm) ||
            music.title.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredData(filterResults);
        setCurrentPage(1); // Reset to the first page after search
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const goTo = (path) => {
        navigate(path);
    };

    const paginatedData = (filteredData.length > 0 ? filteredData : mpData).slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil((filteredData.length > 0 ? filteredData : mpData).length / ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='PopMain'>
            <div className='sideMain'>
                <div className='sideContents'>
                    <div className='sideBtnDiv'>
                        <button type='button' className='popNaviBtn' onClick={() => goTo('/rnb')}><b>R&B</b></button>
                        <button type='button' className='popNaviBtn' onClick={() => goTo('/kpop')}><b>K-POP</b></button>
                        <button type='button' className='popNaviBtn' onClick={() => goTo('/indie')}><b>Indie</b></button>
                        <button type='button' className='popNaviBtn' onClick={() => goTo('/hiphop')}><b>HIP HOP</b></button>
                        <button type='button' className='popNaviBtn' onClick={() => goTo('/ballad')}><b>Ballad</b></button>
                        <button type='button' className='popNaviBtn' onClick={() => goTo('/pop')}><b>POP</b></button>
                    </div>
                </div>
            </div>
            <div className="popContainer">
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
                        {/* Render music list using paginated data */}
                        {paginatedData.map((music, index) => (
                            <div className="list-box" key={index}>
                                <h3 style={{ alignItems: 'center' }}><b>Sync</b></h3>
                                <iframe 
                                    src={music.link} 
                                    title={music.title}  
                                    style={{width:"300px", height:"160px"}}
                                    allowFullScreen
                                />
                                <h4>아티스트 : {music.artist}</h4>
                                <p>제목 : {music.title}</p>
                                <p>장르 : {music.genre}</p>
                                <p>포스팅 : {music.userid === user._id ? user.username : music.userid}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`page-button ${index + 1 === currentPage ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Pop;
