import React, { useState, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Container } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { getUser, getAccessToken } from '../services/AuthService'
import {
  isValidCVC,
  isValidMonth,
  isCreditCardValid,
  card_format,
  AddExpirationYears,
} from '../services/CardValidationService'
import { UserContext } from '../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
} from '@fortawesome/free-brands-svg-icons'

const SubscriptionForm = ({
  isLoggedIn,
  selectedPriceId,
  trialDays,
  selectDefaultPaymentMethod,
}) => {
  const [isSubmitted, setSubmitted] = useState(false)
  const [isSubSuccess, setSubSuccess] = useState(false)
  const [priceError, setPriceError] = useState('')
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
    if (!selectedPriceId) {
      setPriceError('Por favor selecciona un plan ')
      return // Stop the submission if no price is selected
    }
    let user = getUser()
    let url = `${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}/`

    const formData = new FormData()
    formData.append('number', values.card_number.replace(/\s+/g, ''))
    formData.append('exp_month', values.exp_month)
    formData.append('exp_year', values.exp_year)
    formData.append('cvc', values.cvc)
    formData.append('price_id', selectedPriceId)

    if (trialDays.length > 0) {
      formData.append('trial', trialDays[0].days)
    }

    const token = getAccessToken()
    const headers = { Authorization: `Bearer ${token}` }

    try {
      console.log(formData)
      let response = await axios.post(
        url,
        formData,
        {
          headers: headers,
        },
        { timeout: 5000 }
      )
      console.log('Subscription created:', response.data)
      if (response.data.status === 'incomplete') {
        throw new Error('Subscription was not able to complete')
      }
      console.log('navigate to success')
      setSubSuccess(true)
    } catch (error) {
      console.error('Error creating subscription:')
      console.log(error)
      console.log('navigate to cancel')
      setSubSuccess(false)
    }
    setSubmitted(true)
    // setSubscriptionFormSubmitted(true);
  }

  if (!isLoggedIn) {
    return <Navigate to='/log-in' />
  }

  if (isSubmitted) {
    if (isSubSuccess) {
      return <Navigate to='/sub-success' />
    }
    return <Navigate to='/sub-cancel' />
  }

  // format credit card number into fours and validate credit number

  const handleCreditCardChange = (e, setFieldValue) => {
    const { name, value } = e.target
    const formattedValue = card_format(value) // Format the value using the card_format function
    setFieldValue(name, formattedValue)
  }

  AddExpirationYears(years, 10)

  return (
    <Container className='mt-2  sub_form'>
      {priceError && <p className='text-danger'>{priceError}</p>}

      {selectDefaultPaymentMethod && (
        <div className='alert alert-info' role='alert'>
          Ya has seleccionado un método de pago predeterminado para proceder al
          pago. Para agregar un nuevo método, primero deselecciona el método
          predeterminado y luego agrega la información en el formulario, o
          gestiona tus métodos de pago desde tu pestaña de "cuenta".
        </div>
      )}

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
              <div className='card-icons'>
                <FontAwesomeIcon icon={faCcVisa} className='card-icon' />
                <FontAwesomeIcon icon={faCcMastercard} className='card-icon' />
                <FontAwesomeIcon icon={faCcAmex} className='card-icon' />
                <FontAwesomeIcon icon={faCcDiscover} className='card-icon' />
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
              disabled={isSubmitting || selectDefaultPaymentMethod !== null}
            >
              Subscribe
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default SubscriptionForm
