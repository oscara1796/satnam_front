import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { SyncOutlined } from '@ant-design/icons'
import { getUser, getAccessToken } from '../services/AuthService'
import { UserContext } from '../context'

const StripeSuccess = ({ isLoggedIn }) => {
  const [state, setState] = useContext(UserContext)
  const [isData, setData] = useState(false)

  const setLocalStorageItem = (key, value) => {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  useEffect(() => {
    const getUserData = async () => {
      const user = getUser()
      const url = `${process.env.REACT_APP_BASE_URL}/api/users/${user.id}/`
      const token = getAccessToken()
      const headers = { Authorization: `Bearer ${token}` }
      const { data } = await axios.get(url, {
        headers: headers,
      }, { timeout: 5000 })

      if (data && data.length != 0) {
        const tempState = { user: data, auth: getAccessToken() }
        console.log('DATA => ', data)
        await setLocalStorageItem('satnam.user', data)
        setState(tempState)
        setTimeout(() => {
          setData(true)
        }, 1500)
      }
    }
    getUserData()
  }, [])

  if (!isLoggedIn) {
    return <Navigate to='/' />
  }

  if (isData) {
    return <Navigate to='/account' />
  }

  return (
    <div
      className='d-flex  justify-content-center fw-bold'
      style={{ height: '90vh' }}
    >
      <div className='d-flex align-items-center'>
        <SyncOutlined spin style={{ fontSize: '100px' }} />
      </div>
    </div>
  )
}

export default StripeSuccess
