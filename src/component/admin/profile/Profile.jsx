import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../context/loginContext/Context';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './profile.scss';

function Profile() {
    const { user, dispatch } = useContext(LoginContext);
    const [file, setFile] = useState(null);
    const [displayName, setDisplayName] = useState(user.displayName);
    const PF =  "http://localhost:5000/images/";
    useEffect(() => {
        console.log(user);

    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateUser = {
            userId: user._id,
            username: user.username,
            displayName: displayName
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("file", file, fileName);
            data.append("name", fileName);
            updateUser.profilePicture = fileName;
            try {
                await axios.post(process.env.REACT_APP_SERVER + "/upload", data);

            } catch (err) {
                console.log(err)
            }
        }
        try {
            const res = await axios.put(process.env.REACT_APP_SERVER + "/users/" + user._id, updateUser);
            console.log(res);
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
        } catch (err) {            
            console.log(err)
        }

    }

    return (
        <div className='list'>
            <Sidebar />
            <div className='listContainer'>
                <Navbar />
                <div className='profile'>
                    <div className='profileBox'>
                        <h2 className='title'>USER INFO</h2>
                        <div className='profileInfo'>
                            <div className='profileItem'>
                                <span>USERNAME:</span>
                                <p>{user.username}</p>
                            </div>
                            <div className='profileItem'>
                                <span>EMAIL:</span>
                                <p>{user.email}</p>
                            </div>
                            <div className='profileItem'>
                                <span>DISPLAY NAME:</span>
                                <input type="text" value={displayName} 
                                    onChange={(e)=> {setDisplayName(e.target.value)}}
                                 />
                            </div>
                            <div className='profileItem'>
                                <span>PROFILE PICTURE:</span>
                                <div></div>
                                <input type="file" id="file"
                                    onChange={(e) => {
                                        setFile(e.target.files[0]);
                                    }}
                                />
                            </div>
                            <img src={file ? URL.createObjectURL(file)  : (PF + user.profilePicture)} alt="" className="settingImage" />

                        </div>
                        <button className='profileSubmit'
                            onClick={(e) => handleSubmit(e)}
                        >Submit</button>

                    </div>
                </div>
            </div>
        </div>)
}

export default Profile