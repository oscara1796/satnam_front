import React, { useState, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Container } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { getUser, getAccessToken } from '../services/AuthService'
import { isValidCVC, isValidMonth, isCreditCardValid, card_format, AddExpirationYears } from '../services/CardValidationService'
import { UserContext } from '../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';


const PaymentMethodsForm = ({ isLoggedIn, selectedPriceId,}) => {
  const [isSubmitted, setSubmitted] = useState(false)
  const [priceError, setPriceError] = useState(''); 
  const [state, setState] = useContext(UserContext)

  const initialValues = {
    card_number: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
  }

  // card expiration years options
  const years = []

  const handleSubmit = async (values) => {

    let user = getUser()
    let url = `${process.env.REACT_APP_BASE_URL}/api/payment_method/${user.id}/`

    const formData = new FormData()
    formData.append('number', values.card_number.replace(/\s+/g, ''))
    formData.append('exp_month', values.exp_month)
    formData.append('exp_year', values.exp_year)
    formData.append('cvc', values.cvc)



    const token = getAccessToken()
    const headers = { Authorization: `Bearer ${token}` }

    try {
      console.log(formData)
      let response = await axios.post(url, formData, {
        headers: headers,
      })
      console.log('Payment method added:', response.data)
     
      setSubmitted(true)
    } catch (error) {
      console.error('Error adding  payment method:')
      console.log(error)
    }
  }

  if (!isLoggedIn) {
    return <Navigate to='/log-in' />
  }

  if (isSubmitted) {
    
  }

  const handleCreditCardChange = (e, setFieldValue) => {
    const { name, value } = e.target
    const formattedValue = card_format(value) // Format the value using the card_format function
    setFieldValue(name, formattedValue)
  }

  AddExpirationYears(years, 10)

  return (
    <Container className='mt-2  sub_form'>
       {priceError && <p className='text-danger'>{priceError}</p>}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {}
          if (!isValidCVC(values.cvc)) {
            errors.cvc =
              'CVC invalido. Por favor ingresa un CVC valido de entre 3 a 4 digitos'
          }

          if (!isCreditCardValid(values.card_number)) {
            errors.card_number =
              'Lo sentimos, pero el número de tarjeta ingresado no es válido.'
          }
          return errors
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className='mb-3'>
              <label htmlFor='card_number' className='form-label'>
                Card Number:
              </label>
              <Field
                type='text'
                name='card_number'
                className='form-control'
                onChange={(e) => handleCreditCardChange(e, setFieldValue)}
                required
              />
              <ErrorMessage
                name='card_number'
                component='div'
                className='text-danger'
              />
                {/* Card Brand Icons */}
              <div className="card-icons">
                <FontAwesomeIcon icon={faCcVisa} className="card-icon" />
                <FontAwesomeIcon icon={faCcMastercard} className="card-icon" />
                <FontAwesomeIcon icon={faCcAmex} className="card-icon" />
                <FontAwesomeIcon icon={faCcDiscover} className="card-icon" />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label htmlFor='exp_month' className='form-label'>
                  Expiration Month:
                </label>
                <Field
                  type='number'
                  name='exp_month'
                  className='form-control'
                  onChange={(e) => {
                    setFieldValue(e.target.name, isValidMonth(e.target.value))
                  }}
                  required
                />
                <ErrorMessage
                  name='exp_month'
                  component='div'
                  className='text-danger'
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label htmlFor='exp_year' className='form-label'>
                  Expiration Year:
                </label>
                <Field
                  as='select'
                  name='exp_year'
                  className='form-control'
                  required
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name='exp_year'
                  component='div'
                  className='text-danger'
                />
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='cvc' className='form-label'>
                CVC:
              </label>
              <Field type='text' name='cvc' className='form-control' required />
              <ErrorMessage
                name='cvc'
                component='div'
                className='text-danger'
              />
            </div>

            <button
              type='submit'
              className='btn btn-primary'
              disabled={isSubmitting}
            >
              Agregar
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default PaymentMethodsForm
