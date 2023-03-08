import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './single.scss';
import axios from 'axios';
import LoadingSpinner from '../../spinner/LoadingSpinner';
function Single() {
    const [name, setName] = useState('Vo minh hoai an');
    const [phone, setPhone] = useState();
    const [rating, setRating] = useState();
    let { userId } = useParams();
    const [isSpinner, setIsSpinner] = useState(false);
    const [success, setSuccess] = useState();
    const [err, setErr] = useState();


    useEffect(() => {
        const url = "http://localhost:5000/api/rating/" + userId;
        axios.get(url)
            .then((res) => {
                setRating(res.data);
                console.log(res);
                setName(res.data.name);
                setPhone(res.data.phone);


            })
    }, []);
    const handleUpdate = async () => {
        try {
            const urlUpdate = "http://localhost:5000/api/rating/" + userId;
            setIsSpinner(true);
            const res =  await axios.put(urlUpdate, {
                ...rating,
                name: name,
                phone: phone
            });
            setIsSpinner(false);
            setSuccess('Update Successful')
            console.log(res);
        } catch (err) {

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
                                <span className='itemTitle'>Location:</span>
                                <span className='itemContent'>Eden D{rating && rating.location}</span>
                            </li>

                        </ul>
                        
                    </div>
                    <div className='updateRating'>
                        <button className='updateButton' onClick={()=> {handleUpdate()}}>
                        Update 
                        </button>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default Single