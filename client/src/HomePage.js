import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Log from './Log';
import Leaderboard from './Leaderboard';
import Calendar from './Calendar';
import './HomePage.css'


const HomePage = () => {
    // const getUserInfo 

    const [userData, setUserData] = useState(null);
    const [counts, setCounts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)



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

    // Function to fetch log counts for a specific user
    const fetchLogCounts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/logs/user/${userId}/counts`);
            setCounts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch logs');
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')

        // Automatically refresh the page after successful logout
        window.location.reload();
    }

    useEffect(() => {
        fetchLogCounts();
    }, [userId]);

    if (!userData) return <p>Loading...</p>;
    return (
        <div className='homepage-page'>
            <div className='header-bar'>
                <p className="header-text">24Ks of Christmas!</p>
                <button className="log-out-button" onClick={handleLogout}>log out</button>
            </div>

            {/* <Log userId={userData?.userId} /> */}
            <div className="homepage-layout">
                <Calendar counts={counts} />
                <Leaderboard />
            </div>
        </div>
    )
}

export default HomePage