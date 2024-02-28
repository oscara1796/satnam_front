import React from 'react'
import { Container, Row, Col } from 'react-bootstrap' // Assuming you're using React Bootstrap
import { Link } from 'react-router-dom'
import './Footer.css' // Import your CSS styles

function Footer() {
  return (
    <footer className='footer mt-5'>
      <Container>
        <Row>
          <Col className='footer-column' md={4}>
            <h5>Sobre Nosotros</h5>
            <p>
              Nuestro Estudio de Yoga está dedicado a ofrecer la mejor
              experiencia de yoga a todos quienes nos visitan.
            </p>
          </Col>
          <Col className='footer-column' md={4}>
            <h5>Enlaces Rápidos</h5>
            <ul className='footer-links'>
              <li>
                <Link to='/contact-form'>Contacto</Link>
              </li>
              <li>
                <Link to='/'>Sobre Nosotros</Link>
              </li>
              <li>
                <Link to='/videos'>Clases</Link>
              </li>
              <li>
                <Link to='/calendar'>Horario</Link>
              </li>
              <li>
                <Link to='/privacy-policy'>Politicas de privacidad </Link>
              </li>
              <li>
                <Link to='/terms-sections'>Terminos y condiciones </Link>
              </li>
            </ul>
          </Col>
          <Col className='footer-column' md={4}>
            <h5>Contáctanos</h5>
            <p>Plateros 2378, Guadalajara, México</p>
            <p>Email: satnamyogajal@gmail.com</p>
            <p>Teléfono: +52 3314183347</p>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-3'>
            © 2024 SatNam Yoga Studio. Todos los derechos reservados.
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
