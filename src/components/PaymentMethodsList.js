import React, { useState, useContext, useEffect } from 'react';
import { getUser, getAccessToken } from '../services/AuthService'
import { Spinner, Button } from 'react-bootstrap'
import axios from 'axios'
import PaymentMethodsForm from './PaymentMethodsForm'
import './PaymentMethodsList.css';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const PaymentMethodsList = () => {
    const [paymentMethods, setPaymentMethods] = useState({ default_payment_method: null, all_payment_methods: [] })
    const [fetchPaymentMethods, setFetchPaymentMethods] = useState(false);
    const [showForm, setShowForm] = useState(false);

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
      }, [fetchPaymentMethods])


    
      const getCardBrandIcon = (brand) => {
        switch (brand) {
            case 'visa':
                return faCcVisa;
            case 'mastercard':
                return faCcMastercard;
            case 'amex':
                return faCcAmex;
            case 'discover':
                return faCcDiscover;
            default:
                return null; // Or a default icon
        }
    };
    

   

    return (
        <div>
            <h4>Metodos de pago</h4>
            {paymentMethods.all_payment_methods.length > 0 && (
                <div className="payment-methods-list">
                    {paymentMethods.all_payment_methods.map((method) => (
                        <div key={method.id} className="payment-method-box">
                            <div className="payment-method-details">
                                <FontAwesomeIcon icon={getCardBrandIcon(method.card.brand)} />
                                <p>Brand: {method.card.brand.toUpperCase()}</p>
                                <p>Last 4 Digits: **** **** **** {method.card.last4}</p>
                                <p>Expires: {method.card.exp_month}/{method.card.exp_year}</p>
                                {/* Add more details as needed */}
                            </div>
                            <div className="payment-method-actions">
                                <Button variant="secondary" size="sm">Actualizar</Button>
                                <Button variant="danger" size="sm">Eliminar</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}



            <Button onClick={() => setShowForm(!showForm)}>Agregar metodo de pago</Button>

            {showForm && <PaymentMethodsForm setShowForm={setShowForm} setFetchPaymentMethods={setFetchPaymentMethods} fetchPaymentMethods={fetchPaymentMethods} />}

        </div>
    )
}

export default PaymentMethodsList





