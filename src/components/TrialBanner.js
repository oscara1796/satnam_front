import React from 'react'
import './TrialBanner.css' // Assuming you have a CSS file for styling

const TrialBanner = ({ trialDays }) => {
  return (
    <div className='trial-banner'>
      <h2>Prueba Gratís</h2>
      <p>
        Unete ahora y obtén <strong>{trialDays}</strong> días gratís de prueba!
      </p>
    </div>
  )
}

export default TrialBanner
