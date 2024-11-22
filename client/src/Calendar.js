import React from 'react';
import './Calender.css'; // We'll create the CSS for the grid

const Calendar = ({ counts }) => {
    // Define an array of objects representing the grid cells
    const gridItems = [
        { id: 24, size: 4, textColor: '#98BA7B', flippedColor: '#B4D49B', first: '🎄', second: 24, orientation: 'diag' },
        { id: 15, size: 1, textColor: '#EA7F7C', flippedColor: '#CC6767', first: '🛷', second: 15, orientation: 'diag' },
        { id: 13, size: 1, textColor: '#A3C9CC', flippedColor: '#BADFE1', second: '☃️', first: 13, orientation: 'diag' },
        { id: 1, size: 1, textColor: '#C1CFA4', flippedColor: '#A4B18E', first: '🍵', second: 1, orientation: 'diag' },
        { id: 17, size: 2, textColor: '#CEAA81', flippedColor: '#C79F78', second: '🦌', first: 17, orientation: 'horizontal' },
        { id: 6, size: 2, textColor: '#EACD88', flippedColor: '#EFE8BA', second: '🍰', first: 6, orientation: 'horizontal' },
        { id: 20, size: 1, textColor: '#DCD4D4', flippedColor: '#C6C3C3', first: '⛸️', second: 20, orientation: 'diag' },
        { id: 5, size: 3, textColor: '#EABDBD', flippedColor: '#F6D5D4', first: '🤶', second: 5, orientation: 'vertical' },
        { id: 22, size: 1, textColor: '#904343', flippedColor: '#B87371', second: '🍷', first: 22, orientation: 'diag' },
        { id: 21, size: 1, textColor: '#DCB78C', flippedColor: '#CEAA81', first: '🍪', second: 21, orientation: 'diag' },
        { id: 2, size: 3, textColor: '#8FA3A3', flippedColor: '#ADC9C8', first: 2, second: '❄️', orientation: 'vertical' },
        { id: 14, size: 1, textColor: '#F6E0AC', flippedColor: '#EACD88', second: '🌟', first: 14, orientation: 'diag' },
        { id: 9, size: 1, textColor: '#D9BDA0', flippedColor: '#FBDDBE', second: '🧸', first: 9, orientation: 'diag' },
        { id: 19, size: 1, textColor: '#5C7163', flippedColor: '#75917E', second: '🧤', first: 19, orientation: 'diag' },
        { id: 18, size: 3, textColor: '#A09B9B', flippedColor: '#6A6767', first: 18, second: '🎶', orientation: 'vertical' },
        { id: 8, size: 1, textColor: '#C3B4B4', flippedColor: '#DCD6D3', second: '🕯️', first: 8, orientation: 'diag' },
        { id: 12, size: 1, textColor: '#D4B194', flippedColor: '#AF947E', first: '🧦', second: 12, orientation: 'diag' },
        { id: 23, size: 1, textColor: '#C58B89', flippedColor: '#E0A09E', first: '🧣', second: 23, orientation: 'diag' },
        { id: 16, size: 1, textColor: '#9EAD7E', flippedColor: '#CBD9AC', first: '🏔️', second: 16, orientation: 'diag' },
        { id: 7, size: 3, textColor: '#3B2625', flippedColor: '#543332', first: '☕️', second: 7, orientation: 'vertical' },
        { id: 3, size: 2, textColor: '#D58E60', flippedColor: '#D79F79', first: '🧶', second: 3, orientation: 'horizontal' },
        { id: 4, size: 2, textColor: '#CCA777', flippedColor: '#E9BF89', first: 4, second: '🎁', orientation: 'horizontal' },
        { id: 10, size: 1, textColor: '#E7DDDC', flippedColor: '#D3CBCB', first: '🐻‍❄️', second: 10, orientation: 'horizontal' },
        { id: 11, size: 1, textColor: '#C4B4B3', flippedColor: '#F2DCDC', first: '🥛', second: 11, orientation: 'diag' },
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
                    className={`grid-item size-${item.size} ${counts.includes(item.id) ? 'flipped' : ''} `}
                    style={{ backgroundColor: counts.includes(item.id) ? item.flippedColor : '#781714' }}
                    onClick={() => handleClick(item.id)}
                >
                    {counts.includes(item.id) ? (
                        <div className={`flipped-content ${item.orientation}-box`} style={{ color: item.textColor }}>
                            <span className={`top-${item.orientation}`}>{item.first}</span>
                            <span className={`bottom-${item.orientation}`}>{item.second}</span>
                        </div>
                    ) : (
                        <span className="box-number">{item.id}</span>
                    )}
                </div>
            ))}
        </div>
    );
};



export default Calendar;