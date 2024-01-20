import React, { useState, useEffect, useContext } from 'react'
import { Button, ButtonGroup, Carousel, Container } from 'react-bootstrap' // new
import { LinkContainer } from 'react-router-bootstrap' // new
import portada from '../assets/img/portada_feed.jpg'
import portada_3 from '../assets/img/portada_feed_3.jpg'
import portada_4 from '../assets/img/portada_feed_4.jpg'
import brillar from '../assets/img/brillar.png'
import cerebro from '../assets/img/cerebro.png'
import fuerte from '../assets/img/fuerte.png'
import video_presentation from '../assets/img/Benvenida.m4v'
import benefits_pose_sandra from '../assets/img/benefits_pose_sandra.jpeg'
import { getUser, getAccessToken } from '../services/AuthService'
import { UserContext } from '../context'

function Landing(props) {
  return (
    <>
      <CarouselItem isLoggedIn={props.isLoggedIn} trialDays={props.trialDays}/>
      <VideoPresentation />
      <Benefits />
    </>
  )
}

function CarouselItem({trialDays}) {
  const [state, setState] = useContext(UserContext)

  const carouselItems = [
    {
      id: 1,
      imageSrc: portada,
      caption: 'Encuentra la paz interior a través de la práctica del yoga',
    },
    {
      id: 2,
      imageSrc: portada_3,
      caption: 'Tu práctica de yoga es única como tú',
    },
    {
      id: 3,
      imageSrc: portada_4,
      caption: 'El yoga es la unión de la mente, el cuerpo y el espíritu',
    },
    // Add more items as needed
  ]
  return (
    <div className='landing_page'>
      <Carousel className='carousel-container'>
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <div className='carousel-image-container'>
              <img
                className='d-block w-100'
                src={item.imageSrc}
                alt={`Slide ${item.id}`}
              />
              <div className='carousel-caption'>
                <h1>{item.caption}</h1>
                {state.user && state.user.active ? (
                  <></>
                ) : (
                  <LinkContainer to='/payment-methods'>
                    <Button variant='outline-light'>{trialDays.length > 0 ? `¡${trialDays[0].days} días de prueba! Inscríbite` : "Inscríbite"}</Button>
                  </LinkContainer>
                )}
              </div>
            </div>
          </Carousel.Item>
        ))}
        {/* Add more Carousel.Items for additional images */}
      </Carousel>
    </div>
  )
}

function VideoPresentation(props) {
  return (
    <>
      <div className='video-container'>
        <h1>Bienvenido a Sat Nam Yoga Estudio</h1>
        <video controls id='video_presentation'>
          <source src={video_presentation} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  )
}

function Benefits(props) {
  const benefitItems = [
    {
      id: 1,
      imageSrc: fuerte,
      caption:
        'Ejercicios físicos y mentales, equilibria tu cuerpo, tu mente y alma.',
    },
    {
      id: 2,
      imageSrc: cerebro,
      caption:
        'Purifica tu mente, elimina la basura mental y conócete a ti  mismo.',
    },
    {
      id: 3,
      imageSrc: brillar,
      caption:
        'Revitaliza tu energía, regenera tu cuerpo e integra nuevos y mejores hábitos.',
    },
  ]

  return (
    <>
      <Container fluid className='benefits'>
        <div className='benefits-image'>
          <img
            className='d-block w-100'
            src={benefits_pose_sandra}
            alt='benefits pose'
          />
        </div>
        <div className='benefits-list'>
          {benefitItems.map((item) => (
            <div key={item.id}  className='benefit-item'>
              <img
                className='d-block w-100'
                src={item.imageSrc}
                alt={`Slide ${item.id}`}
              />
              <h3>{item.caption}</h3>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

export default Landing
