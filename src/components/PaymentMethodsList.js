import React, { useState, useContext, useEffect } from 'react';
import { getUser, getAccessToken } from '../services/AuthService'
import { Spinner, Button } from 'react-bootstrap'
import axios from 'axios'


const PaymentMethodsList = () => {
    const [paymentMethods, setPaymentMethods] = useState([])

    const getPaymentMethods = async () => {
        
        let user = getUser();
        let url = `${process.env.REACT_APP_BASE_URL}/api/payment_method/${user.id}/`

        const token = getAccessToken()
        const headers = { Authorization: `Bearer ${token}` }

        try{
            let response = await axios.get(url,  {
                headers: headers,
              })
              console.log(response.data);
              setPaymentMethods(response.data)
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {

        getPaymentMethods()
      }, [])

   

    return (
        <>
            {paymentMethods ?
                <> 
                    <Button >Agregar metodo de pago</Button>
                </>
                
            : <> </>}

        </>
    )
}

export default PaymentMethodsList





