import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./mypage.css";

// const FollowSection = ({ followers, following, onFollow, onUnfollow }) => {
//     return (
//         <div className="followSection">
//             <div className="followInfo">
//                 <span className="followCount">팔로워: {followers}</span>
//                 <span className="followCount">팔로잉: {following}</span>
//             </div>
//             <div className="followActions">
//                 <button className="followBtn" onClick={onFollow}>Follow</button>
//                 <button className="unfollowBtn" onClick={onUnfollow}>Unfollow</button>
//             </div>
//         </div>
//     );
// };

const Mypage = () => {
    const [newProfile, setNewProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [mpData, setMpData] = useState({
        username: '',
        email: '',
        country: '',
        city: '',
        phone: '',
        profile: '',
        realname: '',
        followers: 0,
        following: 0,
    });

    useEffect(() => {
        if (user) {
            setMpData({
                username: user.username,
                email: user.email,
                country: user.country,
                city: user.city,
                phone: user.phone,
                profile: user.profile,
                realname: user.realname,
                followers: user.followers || 0,
                following: user.following || 0,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profile' && files) {
            setNewProfile(files[0]);
        } else {
            setMpData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSave = async () => {
        try {
            const userId = user._id;
            const updatedData = new FormData();

            if (newProfile) {
                updatedData.append("profile", newProfile);
            }

            updatedData.append("username", mpData.username);
            updatedData.append("realname", mpData.realname);
            updatedData.append("email", mpData.email);
            updatedData.append("phone", mpData.phone);
            updatedData.append("country", mpData.country);
            updatedData.append("city", mpData.city);

            const res = await axios.put(`${apiUrl}/userinfo/edit/${userId}`, updatedData, { withCredentials: true });

            if (res.data) {
                dispatch({ type: "UPDATE_SUCCESS", payload: res.data });

                if (newProfile) {
                    setMpData((prevData) => ({
                        ...prevData,
                        profile: res.data.profile
                    }));
                }
                setEditMode(false);
                navigate('/mypage');
            } else {
                console.error('No data received from update response');
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while updating the profile.");
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    // const handleFollow = () => {
    //     // Implement follow logic here
    //     setMpData((prevData) => ({
    //         ...prevData,
    //         followers: prevData.followers > 0 ? prevData.followers +1 : 0
    //     }));
    // };

    // const handleUnfollow = () => {
    //     // Implement unfollow logic here
    //     setMpData((prevData) => ({
    //         ...prevData,
    //         followers: prevData.followers > 0 ? prevData.followers - 1 : 0
    //     }));
    // };

    const { username, email, country, city, phone, profile, realname, followers, following } = mpData;

    return (
        <div className='mypageMain'>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <div className='mypageContents'> 
                <div className='profileContents'>
                    <div id='currentImageContainer' style={{ display: "flex", alignItems: "center" }}>
                        <div>
                            {profile ? (
                                <img
                                    id="currentImage"
                                    className='uploadImage'
                                    src={`${profile}`}
                                    alt='프로필'
                                    style={{ width: '200px', height: '300px'}}
                                />
                            ) : (
                                <p>이미지가 없습니다.</p>
                            )}
                        </div>
                        {/* <FollowSection 
                            followers={followers} 
                            following={following} 
                            onFollow={handleFollow} 
                            onUnfollow={handleUnfollow} 
                        /> */}
                    </div>

                    {editMode && (
                        <form className='profileUpload' method='post' encType='multipart/form-data' style={{ paddingLeft: '5%', display: 'grid' }}>
                            <input
                                type='file'
                                name="profile"
                                accept="image/*"
                                className='uploadFile'
                                style={{ width: '150px', height: '20px', fontSize: '10px' }}
                                onChange={handleChange}
                            />
                        </form>
                    )}
                </div>

                <div className='MyInfo'>
                    {editMode ? (
                        <>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                className='InfoInput'
                            />
                            <input
                                type="text"
                                name="realname"
                                value={realname}
                                onChange={handleChange}
                                className='InfoInput'
                            />
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                className='InfoInput'
                            />
                            <input
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={handleChange}
                                className='InfoInput'
                            />
                            <input
                                type="text"
                                name="country"
                                value={country}
                                onChange={handleChange}
                                className='InfoInput'
                            />
                            <input
                                type="text"
                                name="city"
                                value={city}
                                onChange={handleChange}
                                className='InfoInput'
                            />
                        </>
                    ) : (
                        <>
                            <span className='InfoSpan'>ID: {username}</span>
                            <span className='InfoSpan'>Name: {realname}</span>
                            <span className='InfoSpan'>E-Mail: {email}</span>
                            <span className='InfoSpan'>Phone: {phone}</span>
                            <span className='InfoSpan'>Address: {country}, {city}</span>
                        </>
                    )}

                    {editMode ? (
                        <button className='saveBtn' onClick={handleSave}>SAVE</button>
                    ) : (
                        <button className='MyUpdateBtn' onClick={handleEdit}>EDIT</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Mypage;