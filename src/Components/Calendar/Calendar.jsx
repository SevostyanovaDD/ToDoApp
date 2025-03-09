import React, { useState } from 'react';
import './Calendar.css'
import PropTypes from 'prop-types';
function Calendar({ onDayClick }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);

    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        onDayClick(day);
    };

    return (
        <div className='calendar'>
            <div className='calendar-header'>
                <button onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1))}>←</button>
                <h2>{month} {year}</h2>
                <button onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1))}>→</button>
            </div>
            <div className='calendar-grid'>
                {['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className='calendar-day-header'>{day}</div>
                ))}
                {Array(firstDay).fill(null).map((_, i) => (
                    <div key={`empty-${i}`} className='calendar-day empty'></div>
                ))}
                {daysArray.map((day) => (
                    <div key={day} className={`calendar-day ${selectedDay === day ? 'selected' : ''}`} onClick={() => handleDayClick(day)}>
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
}
Calendar.propTypes = {
    onDayClick: PropTypes.func.isRequired, 
};

export default Calendar;