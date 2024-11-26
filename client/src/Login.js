import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'

const Login = () => {
    const [userId, setUserId] = useState('');
    const [keyword, setKeyword] = useState('');

    const handleLogin = async () => {
        try {
            console.log(userId, keyword)
            const { data } = await axios.post('/api/auth/login', { userId, keyword });
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', userId)
            alert('Logged in successfully!');

            // Automatically refresh the page after successful login
            window.location.reload();
        } catch (err) {
            alert('Login failed!');
        }
    };

    return (
        <div className='login-page'>
            <div className="login-fields">
                <p className="header-text">new phone who dis</p>
                <div><input className="input-field" placeholder="your goverment name pls" value={userId} onChange={(e) => setUserId(e.target.value)} /></div>
                <div ><input className="input-field" placeholder="super secret password" value={keyword} onChange={(e) => setKeyword(e.target.value)} /></div>
                <button className="log-in-button" onClick={handleLogin}>let me in</button>
            </div>
        </div>
    );
};

export default Login;