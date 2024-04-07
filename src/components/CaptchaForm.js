import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from './Spinner'

axios.defaults.withCredentials = true

const CaptchaForm = (props) => {
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaUrl, setCaptchaUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const fetchCaptcha = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/get-captcha/`,
        {
          responseType: 'blob', // Important: this tells Axios to handle the response as a binary blob
        }
      )

      // Convert blob to a data URL
      const dataUrl = URL.createObjectURL(response.data)
      setCaptchaUrl(dataUrl)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching CAPTCHA', error)
      // Handle error (e.g., display a message or log)
    }
  }

  useEffect(() => {
    fetchCaptcha()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/captcha/`,
        { captcha: captchaInput }
      )
      console.log(response.data)
      if (response.status >= 200 && response.status < 300) {
        props.setCaptchaValidated(true)
        setSuccessMessage('CAPTCHA validated successfully!')
        console.log('CAPTCHA validation successful:', response.data)
      } else {
        console.log(
          'CAPTCHA validation failed with status code:',
          response.status
        )
      }
      // Handle successful validation
    } catch (error) {
      toast.error('CAPTCHA validation failed')
      // Handle validation failure
    }
  }

  return (
    <form onSubmit={handleSubmit} className='my-3'>
      <div className='mb-3 mr-2'>
        {isLoading ? (
          <Spinner /> // Render the Spinner here
        ) : (
          <img src={captchaUrl} alt='CAPTCHA' onClick={fetchCaptcha} />
        )}
        <button type='button' onClick={fetchCaptcha}>
          Refresh
        </button>
      </div>
      <input
        type='text'
        value={captchaInput}
        onChange={(e) => setCaptchaInput(e.target.value)}
        placeholder='Enter CAPTCHA'
      />
      <button type='submit'>Verifica Captcha</button>
      {props.captchaValidated && (
        <div className='success-message'>{successMessage}</div>
      )}
    </form>
  )
}

export default CaptchaForm
