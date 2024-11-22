import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css'

const Leaderboard = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/users/all');
                const usersData = response.data;

                // sort users by totalKilometers in descending order
                usersData.sort((a, b) => b.totalKilometers - a.totalKilometers);

                setUsers(usersData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='leaderboard'>
            <div className='leaderboard-header'>Progress</div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Total Kilometers</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.userId}>
                            <td>{index + 1}</td>
                            <td>{user.userId}</td>
                            <td>{user.totalKilometers} km</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;