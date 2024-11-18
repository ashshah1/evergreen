import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [keyword, setKeyword] = useState('');

    const handleLogin = async () => {
        try {
            console.log(userId, keyword)
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { userId, keyword });
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', userId)
            alert('Logged in successfully!');
        } catch (err) {
            alert('Login failed!');
        }
    };

    return (
        <div>
            <input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input placeholder="Keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default Login;