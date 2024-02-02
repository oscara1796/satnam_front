import React, {useEffect,useState} from 'react';
import './CalendarComponent.css'; 
import 'animate.css/animate.min.css';
import axios from 'axios'

const formatTime12Hour = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hours12 = ((hours + 11) % 12) + 1; // Convert 24-hour to 12-hour format
    const amPm = hours >= 12 ? 'PM' : 'AM';
    return `${hours12}:${minutes} ${amPm}`;
  };

  const dayColors = {
    Lunes: { bgClass: 'bg-primary', textClass: 'text-white' }, // Bootstrap blue
    Martes: { bgClass: 'bg-info', textClass: 'text-dark' }, // Bootstrap light blue
    Miercoles: { bgClass: 'bg-custom-blue1', textClass: 'text-dark' }, // Light Blue
    Jueves: { bgClass: 'bg-custom-blue2', textClass: 'text-dark' }, // SkyBlue
    Viernes: { bgClass: 'bg-custom-blue3', textClass: 'text-white' }, // CornflowerBlue
    Sabado: { bgClass: 'bg-custom-blue4', textClass: 'text-white' }, // RoyalBlue
    Domingo: { bgClass: 'bg-custom-blue5', textClass: 'text-white' }, // MediumBlue
  };
  
  

const CalendarComponent = () => {

    const [eventData, setEventData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchEvents = async () =>{
        try {
            // Example API call using axios

            const url = `${process.env.REACT_APP_BASE_URL}/api/events/`
            
            const response = await axios.get(url);


               console.log(response.data);
              

              setEventData(response.data);
              setIsLoading(false);
            // Handle the response
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchEvents();
       
    }, []);


    return (
        <div className="container my-5">
            <h2 className="text-center text-primary mb-3">Horarios - Clases</h2>
            {isLoading ? (
                // Display spinner while loading
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {eventData && eventData.map((event) => (
                        <div key={event.id} className="col-md-6 col-lg-4 mb-4 animate__animated animate__fadeIn">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h4 className="card-title text-secondary">{event.title}</h4>
                                    <p className="card-text">{event.description}</p>
                                </div>
                                <div className={`card-footer ${dayColors[event.day]?.bgClass} ${dayColors[event.day]?.textClass}`}>
                                    <strong>{event.day} {formatTime12Hour(event.startTime)} - {formatTime12Hour(event.endTime)}</strong>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
  };

export default CalendarComponent;
