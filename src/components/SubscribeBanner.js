import React from 'react'
import './SubscribeBanner.css' // Import the CSS file for styling
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'

const SubscribeBanner = () => {
  return (
    <div className='subscribe-banner'>
      <h2>Unete a nuestra escuela de yoga subcripción!</h2>
      <LinkContainer to='/payment-methods'>
        <Button variant='primary'>Inscríbite</Button>
      </LinkContainer>
    </div>
  )
}

export default SubscribeBanner
