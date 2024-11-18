import React from 'react';
import './Calender.css'; // We'll create the CSS for the grid

const Calendar = () => {
    // Define an array of objects representing the grid cells
    const gridItems = [
        { id: 24, size: 4 },
        { id: 1, size: 1 },
        { id: 2, size: 1 },
        { id: 3, size: 1 },
        { id: 17, size: 2 },
        { id: 18, size: 2 },
        { id: 14, size: 1 },
        { id: 21, size: 3 },
        { id: 4, size: 1 },
        { id: 7, size: 1 },
        { id: 20, size: 3 },
        { id: 5, size: 1 },
        { id: 6, size: 1 },
        { id: 8, size: 1 },
        { id: 11, size: 3 },
        { id: 9, size: 1 },
        { id: 23, size: 1 },
        { id: 18, size: 2 },
        { id: 22, size: 3 },
        { id: 15, size: 2 },
        { id: 16, size: 2 },
        { id: 10, size: 1 },
        { id: 12, size: 1 },
    ];

    // Handle click event on each box
    const handleClick = (id) => {
        alert(`Box ${id} clicked!`);
    };

    return (
        <div className="calendar">
            {gridItems.map((item) => (
                <div
                    key={item.id}
                    className={`grid-item size-${item.size}`}
                    onClick={() => handleClick(item.id)}
                >
                    <span className='box-number'>{item.id}</span>
                </div>
            ))}
        </div>
    );
};

export default Calendar;