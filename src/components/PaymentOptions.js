import React, { useState } from 'react'
import SubscriptionForm from './SubscriptionForm'
import { Navigate } from 'react-router-dom'

const PaymentOptions = ({ isLoggedIn }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const paymentOptions = [
    {
      id: 1,
      label: 'Tarjeta credito',
      component: <SubscriptionForm isLoggedIn={isLoggedIn} />,
    },
    { id: 2, label: 'PayPal' },
    { id: 3, label: 'Google Pay' },
  ]

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId)
  }

  if (!isLoggedIn) {
    return <Navigate to='/log-in' />
  }

  return (
    <div className='container my-3 payments-box'>
      <h2 className='my-3'>Opciones de pago</h2>
      <div className='payment-options mt-2'>
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className={`payment-option ${
              selectedOption === option.id ? 'selected' : ''
            }`}
          >
            <input
              type='checkbox'
              id={`option-${option.id}`}
              name={`option-${option.id}`}
              checked={selectedOption === option.id}
              onChange={() => handleOptionChange(option.id)}
            />
            <label htmlFor={`option-${option.id}`} className='option-label'>
              <div className={`circle `} />
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {selectedOption && (
        <div className='selected-option'>
          {
            paymentOptions.find((option) => option.id === selectedOption)
              .component
          }
        </div>
      )}
    </div>
  )
}

export default PaymentOptions
