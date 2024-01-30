import React, { useState } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const CreateSchedule = () => {
    const [events, setEvents] = useState([]);
    const [showEventForm, setShowEventForm] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({ day: '', time: '' });

    const handleCellClick = (day, time) => {
        setShowEventForm(true);
        setCurrentEvent({ day, time });
    };

    const handleEventSave = (eventDetails) => {
        setEvents([...events, eventDetails]);
        setShowEventForm(false);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {days.map(day => <th key={day}>{day}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {hours.map(time => (
                        <tr key={time}>
                            {days.map(day => (
                                <td key={day} onClick={() => handleCellClick(day, time)}>
                                    {/* Display events here if they match the day and time */}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {showEventForm && (
                <EventForm
                    defaultDay={currentEvent.day}
                    defaultTime={currentEvent.time}
                    onSave={handleEventSave}
                    onCancel={() => setShowEventForm(false)}
                />
            )}
        </div>
    );
};

const EventForm = ({ defaultDay, defaultTime, onSave, onCancel }) => {
    const [day, setDay] = useState(defaultDay);
    const [time, setTime] = useState(defaultTime);
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ day, time, description });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Day:
                <select value={day} onChange={e => setDay(e.target.value)}>
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </label>
            <label>
                Time:
                <input type="time" value={time} onChange={e => setTime(e.target.value)} />
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <button type="submit">Save Event</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default CreateSchedule;
