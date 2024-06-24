import React, { useEffect, useState } from 'react'
import './CalendarComponent.css'
import 'animate.css/animate.min.css'
import { motion } from 'framer-motion'
import axios from 'axios'
import { showErrorNotification } from '../services/notificationService'

const formatTime12Hour = (time24) => {
  const [hours, minutes] = time24.split(':').map(Number) // Convert both hours and minutes to numbers
  const hours12 = ((hours + 11) % 12) + 1 // Convert 24-hour to 12-hour format
  const amPm = hours >= 12 ? 'PM' : 'AM'
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${amPm}` // Pad minutes with leading zero if necessary
}

const dayColors = {
  Lunes: { bgClass: 'bg-primary', textClass: 'text-white' }, // Bootstrap blue
  Martes: { bgClass: 'bg-info', textClass: 'text-dark' }, // Bootstrap light blue
  Miercoles: { bgClass: 'bg-custom-blue1', textClass: 'text-dark' }, // Light Blue
  Jueves: { bgClass: 'bg-custom-blue2', textClass: 'text-dark' }, // SkyBlue
  Viernes: { bgClass: 'bg-custom-blue3', textClass: 'text-white' }, // CornflowerBlue
  Sabado: { bgClass: 'bg-custom-blue4', textClass: 'text-white' }, // RoyalBlue
  Domingo: { bgClass: 'bg-custom-blue5', textClass: 'text-white' }, // MediumBlue
}

const CalendarComponent = () => {
  const [eventData, setEventData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchEvents = async () => {
    try {
      // Example API call using axios

      const url = `${process.env.REACT_APP_BASE_URL}/api/events/`

      const response = await axios.get(url, { timeout: 5000 })

      console.log(response.data)

      setEventData(response.data)
      setIsLoading(false)
      // Handle the response
    } catch (error) {
      console.log(error)
      showErrorNotification(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className='container d-flex flex-column align-items-center'>
      <div className='container my-5'>
        <h2 className='text-center text-primary mb-3'>Horarios - Clases</h2>
        <p className='my-4'>
          En nuestra escuela de yoga física ubicada en Guadalajara, México,
          ofrecemos a todas las personas la oportunidad de asistir y participar
          en clases presenciales en estos horarios:
        </p>
        {isLoading ? (
          // Display spinner while loading
          <div className='d-flex justify-content-center'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : (
          <div className='row'>
            {eventData && eventData.length > 0 ? (
              eventData.map((event) => (
                <div
                  key={event.id}
                  className='col-md-6 col-lg-4 mb-4 animate__animated animate__fadeIn'
                >
                  <div className='card h-100 shadow-sm'>
                    <div className='card-body'>
                      <h4 className='card-title text-secondary'>
                        {event.title}
                      </h4>
                      <p className='card-text'>{event.description}</p>
                    </div>
                    <div
                      className={`card-footer ${dayColors[event.day]?.bgClass} ${dayColors[event.day]?.textClass}`}
                    >
                      <strong>
                        {event.day} {formatTime12Hour(event.startTime)} -{' '}
                        {formatTime12Hour(event.endTime)}
                      </strong>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <h3 className='text-center mt-4'>
                  {' '}
                  No hay horarios de momento{' '}
                </h3>
              </>
            )}
          </div>
        )}
      </div>
      <ContactInfoComponent />
      <GoogleMapComponent />
    </div>
  )
}

const ContactInfoComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'white',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
      }}
      className='my-5'
    >
      <h2>Contáctenos</h2>
      <p>
        <strong>Telefono:</strong> (33) 14183347
      </p>
      <p>
        <strong>Domicilio:</strong> Plateros 2378 col. Jardines del Country,
        GDL, Jalisco, México
      </p>
      <p>
        <strong>Contacto:</strong> Sandra López
      </p>
    </motion.div>
  )
}

const GoogleMapComponent = () => {
  return (
    <div
      className='my-5  d-flex  justify-content-center'
      style={{
        overflow: 'hidden',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14927.981747874976!2d-103.3675171!3d20.7104099!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae2d2e01737b%3A0xb903826fbd009741!2sClases%20de%20Yoga%20Sat%20Nam%20Estudio!5e0!3m2!1ses-419!2smx!4v1706934359712!5m2!1ses-419!2smx'
        width='600'
        height='450'
        style={{ border: 0 }}
        allowFullScreen=''
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  )
}

export default CalendarComponent
