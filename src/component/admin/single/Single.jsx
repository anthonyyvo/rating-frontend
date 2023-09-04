import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './single.scss';
import axios from 'axios';
import LoadingSpinner from '../../spinner/LoadingSpinner';
import { LoginContext } from '../../../context/loginContext/Context';
function Single() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState();
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState();
    let { userId } = useParams();
    const [isSpinner, setIsSpinner] = useState(false);
    const [success, setSuccess] = useState();
    const [err, setErr] = useState();
    const {user} = useContext(LoginContext);



    useEffect(() => {
        console.log(user);
        const url = `${process.env.REACT_APP_SERVER}/rating/` + userId;
        axios.get(url)
            .then((res) => {
                setRating(res.data);
                setName(res.data.name);
                setPhone(res.data.phone);
            })
    }, []);
    const handleUpdate = async () => {
        try {
            const urlUpdate =  process.env.REACT_APP_SERVER + "/rating/" + userId;
            setIsSpinner(true);
            const res =  await axios.put(urlUpdate, {
                ...rating,
                name: name,
                phone: phone
            });
            setIsSpinner(false);
            setSuccess('Update Successful')
        } catch (err) {
            console.log(err)
        }
       
    }
    const handleDelete = async () => {
        try {
            const urlUpdate =  process.env.REACT_APP_SERVER + "/rating/" + userId;
            setIsSpinner(true);
            const res =  await axios.delete(urlUpdate, {
                data: {
                    ...user
                }
            });
            console.log(res);
            setIsSpinner(false);
            setSuccess('Delete Successful')
        } catch (err) {
            console.log(err)
        }
       
    }

    return (
        <div className='single'>
            <Sidebar />
            <div className='singleContainer'>
                <Navbar />
                <div className='singleRating'>
                    <h2 className='title'>CUSTOMER RATING</h2>
                    {isSpinner ? <LoadingSpinner /> : null}
                    <p>{success}</p>
                    <div className='ratingItem'>
                        <ul className='dataList'>
                            <li>
                                <label className='itemTitle'>Name:</label>
                                <input value={name} onChange={e=>setName(e.target.value)}></input>
                            </li>
                            <li>
                                <label className='itemTitle'>Phone:</label>
                                <input placeholder='' value={phone} onChange={e=>setPhone(e.target.value)}></input>
                            </li>
                            <li>
                                <label className='itemTitle'>Comments:</label>
                                <input placeholder='' value={comments} onChange={e=>setComments(e.target.value)}></input>
                            </li>
                            <li>
                                <span className='itemTitle'>Sastified:</span>
                                <span className='itemContent'>{rating && rating.satisfied}</span>
                            </li>
                            <li>
                                <span className='itemTitle'>Likely:</span>
                                <span className='itemContent'>{rating && rating.likely}</span>
                            </li>
                            <li>
                                <span className='itemTitle'>Rating:</span>
                                <span className='itemContent'>{rating && rating.rating}</span>
                            </li>
                            <li>
                                <span className='itemTitle'>Feedback:</span>
                                <span className='itemContent'>{rating && rating.answer}</span>
                            </li>
                            <li>
                                <span className='itemTitle'>Location:</span>
                                <span className='itemContent'>Eden D{rating && rating.location}</span>
                            </li>

                        </ul>
                        
                    </div>
                    <div className='updateRating'>
                        <button className='updateButton' onClick={()=> {handleUpdate()}}>
                        Update 
                        </button>
                        { user.isAdmin ? 
                            <button className='delButton' onClick={()=> {handleDelete()}}>
                            Delete 
                            </button> : ''
                        }
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default Single