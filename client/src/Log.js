import React, { useState } from 'react';
import axios from 'axios';

const Log = ({ distance }) => {
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    const [date, setDate] = useState(formatDate(new Date()))
    const userId = localStorage.getItem('userId')


    const logWalk = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/log/logWalk', { userId, distance, date });
        } catch (err) {
            // Check if it's an error with a response from the server
            if (err.response) {
                // Log the custom error message from the backend
                alert(err.response.data.message)
            } else if (err.request) {
                // Log the request error if no response is received
                console.log('No response received:', err.request);
            } else {
                // For other types of errors
                console.log('Error message:', err.message);
            }
        }
    };

    // TODO: make this actually today's date
    return (
        <div>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
            <button onClick={logWalk}>Log Steppies</button>
        </div>
    );
};

export default Log;