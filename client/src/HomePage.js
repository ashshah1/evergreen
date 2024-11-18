import React, { useState } from 'react';
import Log from './Log';

const HomePage = () => {

    return (
        <div> 
            <div>hi</div>
            <Log />
        </div>
        
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    // const getUserInfo 

    const [userData, setUserData] = useState(null);

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!userData) return <p>Loading...</p>;
    return (
        <div>
            <h1>howdy {userData?.userId}</h1>
            <Log />
        </div>
    )
}

export default HomePage