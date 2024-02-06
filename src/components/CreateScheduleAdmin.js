import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context'
import { Navigate } from 'react-router-dom'
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import axios from 'axios';
import { getUser, getAccessToken } from '../services/AuthService'
import './CreateScheduleAdmin.css';
import { showErrorNotification } from '../services/notificationService'
import { parse, differenceInMinutes } from 'date-fns';

const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes}`;
};

const CreateScheduleAdmin = (props) => {
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem('events');
        return savedEvents ? JSON.parse(savedEvents) : {};
    });
    const [showEventForm, setShowEventForm] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({ day: '', time: '' });
    const [state, setState] = useContext(UserContext)

    const handleCellClick = (day, time, event = null) => {
        console.log("time", time);
        if (event) {
            setCurrentEvent({ day, time: event.startTime, ...event });
        } else {
            setCurrentEvent({ day, time });
        }
        setShowEventForm(true);
    };

    const handleEventSave = (eventDetails) => {
        // Convert times to comparable values
        const newStartTime = new Date(`01/01/2000 ${eventDetails.startTime}`).getTime();
        const newEndTime = new Date(`01/01/2000 ${eventDetails.endTime}`).getTime();

        if (newStartTime == newEndTime) {
            toast.error("Clase tiene misma hora  de comienzo y de finalización");
            return;
        }
    
        // Check for time conflicts
        const conflict = Object.values(events).some(event => {
            if (event.day !== eventDetails.day) return false; // Skip if it's a different day
    
            const existingStartTime = new Date(`01/01/2000 ${event.startTime}`).getTime();
            const existingEndTime = new Date(`01/01/2000 ${event.endTime}`).getTime();
    
            // Check if new event starts or ends within an existing event
            const startsDuringExisting = newStartTime >= existingStartTime && newStartTime < existingEndTime;
            const endsDuringExisting = newEndTime > existingStartTime && newEndTime <= existingEndTime;
            // Check if new event completely covers an existing event
            const coversExisting = newStartTime <= existingStartTime && newEndTime >= existingEndTime;
    
            return startsDuringExisting || endsDuringExisting || coversExisting;
        });
    
        if (conflict ) {
            toast.error("No podemos añadir este evento por que genera conflicto con otro .");
            return;
        }
    
        // If no conflicts, proceed to add/update the event
        const eventKey = `${eventDetails.day}-${eventDetails.startTime}`;
        setEvents(prevEvents => ({
            ...prevEvents,
            [eventKey]: eventDetails
        }));
    
        setShowEventForm(false);
        toast.info("Se agrego tu clase, dale guardar para guardar horario correctamente");
    };

    const handleEventDelete = (eventToDelete) => {
        const eventKey = `${eventToDelete.day}-${eventToDelete.startTime}`;
        setEvents(prevEvents => {
            const updatedEvents = { ...prevEvents };
            delete updatedEvents[eventKey];
            return updatedEvents;
        });
    };

    const isEventInCell = (event, day, time) => {
        if (!event || event.day !== day) return false;
    
        const startTime = new Date(`01/01/2000 ${event.startTime}`);
        const endTime = new Date(`01/01/2000 ${event.endTime}`);
        const cellTime = new Date(`01/01/2000 ${time}`);
    
        return cellTime >= startTime && cellTime < endTime;
    };

    const handleSaveSchedule = async () => {
        // Prepare your event data for the API
        const eventData = Object.values(events);
        console.log("eventData", eventData);
        try {
            // Example API call using axios

            const url = `${process.env.REACT_APP_BASE_URL}/api/events/`
            const token = getAccessToken()
            const headers = { Authorization: `Bearer ${token}` }
            const response = await axios.post(url, eventData, {
                headers: headers,
              }, {timeout: 5000});
    
            // Handle the response
            toast.success("Se Guardo tu horario correctamente ");
        } catch (error) {
            showErrorNotification(error)
            console.log(error);
            console.error('Error saving schedule:', error.response ? error.response.data : error.message);
        }
    };


    const fetchEvents = async () =>{
        try {
            // Example API call using axios

            const url = `${process.env.REACT_APP_BASE_URL}/api/events/`
            const token = getAccessToken()
            const headers = { Authorization: `Bearer ${token}` }
            const response = await axios.get(url, {
                headers: headers,
              }, {timeout: 5000});


               console.log(response.data);
              
              let data = {}
              response.data.forEach(event => {
                const eventKey = `${event.day}-${event.startTime}`;
                data[eventKey]= event;
              });

              console.log("events",data);
              setEvents(data);
            // Handle the response
        } catch (error) {
            showErrorNotification(error);
            console.log(error);
            console.error('Error saving schedule:', error.response ? error.response.data : error.message);
        }
    }

    useEffect(() => {
        fetchEvents();
       
    }, []);
    

    useEffect(() => {

        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    if (!props.isLoggedIn || (state.user && !state.user.is_staff)) {
        return <Navigate to='/log-in' />
      }

    

    return (
        <div>
            <div className="schedule-container">
                <div className="schedule-header">
                    <h1>Horarios Sat Nam Escuela</h1>
                    <button type="button" className="btn btn-primary" onClick={handleSaveSchedule}>Guarda Horario</button> {/* Save Button */}
                    
                </div>
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Horas</th>
                            {days.map(day => <th key={day}>{day}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {hours.map(time => (
                            <tr key={time}>
                                <td>{time}</td>
                                {days.map(day => {
                                    let eventExists = null;
                                        Object.values(events).forEach(event => {
                                            if (isEventInCell(event, day, time)) {
                                                eventExists = event;
                                            }
                                        });
                                    return (
                                        <td key={day} 
                                            onClick={() => handleCellClick(day, time, eventExists)}
                                            style={{ backgroundColor: eventExists ? '#add8e6' : 'transparent' }}>
                                            {eventExists ? eventExists.title : ''}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showEventForm && (
                    <EventForm
                        defaultTitle={currentEvent.title}
                        defaultDay={currentEvent.day}
                        defaultTime={currentEvent.time}
                        defaultDescription={currentEvent.description}
                        defaultEndTime={currentEvent.endTime}
                        onSave={handleEventSave}
                        onDelete={() => handleEventDelete(currentEvent)}
                        onCancel={() => setShowEventForm(false)}
                    />
                )}
            </div>
            
        </div>
    );
};

const EventForm = ({ defaultTitle = '' ,defaultDay, defaultTime, defaultEndTime='', defaultDescription = '', onSave, onDelete, onCancel }) => {
    const [day, setDay] = useState(defaultDay);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState(''); // Initialize endTime state
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});

    const eventSchema = Yup.object().shape({
        title: Yup.string().required('El título es obligatorio'),
        day: Yup.string().required('El día es obligatorio'),
        startTime: Yup.string().required('La hora de inicio es obligatoria'),
        endTime: Yup.string().required('La hora de fin es obligatoria')
          .test('is-greater', 'La clase debe durar al menos una hora', function(value) {
            const { startTime } = this.parent;
            const format = 'HH:mm';
            const start = parse(startTime, format, new Date());
            const end = parse(value, format, new Date());
            return differenceInMinutes(end, start) >= 60;
          }),
        description: Yup.string().required('La descripción es obligatoria'),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate form data
            const formData = { title, day, startTime, endTime, description };
            await eventSchema.validate(formData, { abortEarly: false });

            // If validation is successful, call onSave
            onSave({
                ...formData,
                startTime: formatTime(startTime), // Ensure times are formatted correctly
                endTime: formatTime(endTime),
            });
            setErrors({}); 
            
        } catch (err) {
            // Handle validation errors
            if (err.inner) {
                const formErrors = err.inner.reduce((acc, error) => {
                    acc[error.path] = error.message;
                    return acc;
                }, {});
                setErrors(formErrors);
            }

            // Here you can set some state to display the validation errors on the form
        }
    };

    useEffect(() => {

        setDay(defaultDay);
        setStartTime(formatTime(defaultTime));
        setDescription(defaultDescription);
        setEndTime(defaultEndTime);
        setTitle(defaultTitle);
    }, [defaultTitle, defaultDay, defaultTime, defaultDescription]);

    

    return (
        <div className="overlay">
            <div className="event-form-modal">
                <h2>Agregar Clase</h2>
                <form className="event-form" onSubmit={handleSubmit}>
                    <label>
                        Título:
                        <input value={title} onChange={e => setTitle(e.target.value)} />
                        {errors.title && <div className="error">{errors.title}</div>}
                    </label>
                    <label>
                        Día:
                        <select value={day} onChange={e => setDay(e.target.value)}>
                            {days.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        {errors.day && <div className="error">{errors.day}</div>}
                    </label>
                    <label>
                        Start Time:
                        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                        {errors.startTime && <div className="error">{errors.startTime}</div>}
                    </label>
                    <label>
                        End Time:
                        <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                        {errors.endTime && <div className="error">{errors.endTime}</div>}
                    </label>
                    <label>
                        Descripción:
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                        {errors.description && <div className="error">{errors.description}</div>}
                    </label>
                    <button type="submit">Guardar Clase</button>
                    {defaultTitle && <button type="button" className="button_delete" onClick={onDelete}>Eliminar Clase</button>}
                    <button type="button" className="button_cancel"  onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default CreateScheduleAdmin;
