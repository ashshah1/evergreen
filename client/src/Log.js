import React, { useState } from 'react';
import axios from 'axios';

const Log = () => {
    
    console.log("HII")
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    const [date, setDate] = useState(formatDate(new Date()))
    const [distance, setDistance] = useState(1);
    const userId = "admin"

    const logWalk = async () => {
        console.log("Logging walk")
        console.log(date)
        const { data } = await axios.post('http://localhost:5000/api/log/logWalk', { userId, distance, date });
        console.log(data)
    };

    return (
        <div>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
            <input type="number" name="km" min="1" max="24" value={distance} onChange={(e) => setDistance(e.target.value)}/>
            <button onClick={logWalk}>Log Steppies</button>
        </div>
    );
};

export default Log;