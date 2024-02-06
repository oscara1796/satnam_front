import React, { useState, useContext, useEffect } from 'react';
import { getUser, getAccessToken } from '../services/AuthService'
import { Spinner, Button } from 'react-bootstrap'
import axios from 'axios'
import PaymentMethodsForm from './PaymentMethodsForm'
import './PaymentMethodsList.css';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showErrorNotification } from '../services/notificationService'




const PaymentMethodsList = () => {
    const [paymentMethods, setPaymentMethods] = useState({ default_payment_method: null, all_payment_methods: [] })
    const [fetchPaymentMethods, setFetchPaymentMethods] = useState(false);
    const [paymentMethodToUpdate, setpaymentMethodToUpdate] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const getPaymentMethods = async () => {
        
        let user = getUser();
        let url = `${process.env.REACT_APP_BASE_URL}/api/payment_method/${user.id}/`

        const token = getAccessToken()
        const headers = { Authorization: `Bearer ${token}` }

        try{
            let response = await axios.get(url,  {
                headers: headers,
              }, {timeout:5000})
              console.log(response.data);
              setPaymentMethods(response.data)
        } catch(error){
            showErrorNotification(error);
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

    const deletePaymentMethod = async (methodId) => {
        console.log(methodId);
        setpaymentMethodToUpdate(null);
        setShowForm(false)
        let user = getUser();
        // Adjusted URL to include methodId if your API requires it in the URL
        let url = `${process.env.REACT_APP_BASE_URL}/api/payment_method/${user.id}/`;

        const token = getAccessToken();
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000,
            data: { payment_method_id: methodId } // Including data in config if needed
        };
      
        try {
          await axios.delete(url, config);
          console.log(`Deleted payment method with ID: ${methodId}`);
          setFetchPaymentMethods(prevState => !prevState); // Trigger re-fetch of payment methods
        } catch (error) {
          showErrorNotification(error);
          console.error(error);
        }
      };

      const updatePaymentMethod = async (method) => {
        // Placeholder for update logic
        setpaymentMethodToUpdate(method)
        setShowForm(true)
        console.log(`Updating payment method with ID: ${method}`);
        // You would typically show a form to collect new payment details here
        // and then send a PUT or PATCH request to your backend
      };

      const addMethodsButton = () =>{
        setShowForm(!showForm)
        setpaymentMethodToUpdate(null)
      }
      
      
    

   

    return (
        <div>
            <h4>Metodos de pago</h4>
            {paymentMethods.all_payment_methods.length > 0 && (
                <div className="payment-methods-list">
                    {paymentMethods.all_payment_methods.map((method) => (
                        <div key={method.id} className={`payment-method-box  ${paymentMethodToUpdate && paymentMethodToUpdate.id === method.id ? 'payment-method-selected' : ''}`}>
                            <div className="payment-method-details">
                                <FontAwesomeIcon icon={getCardBrandIcon(method.card.brand)} />
                                <p>Brand: {method.card.brand.toUpperCase()}</p>
                                <p>Last 4 Digits: **** **** **** {method.card.last4}</p>
                                <p>Expires: {method.card.exp_month}/{method.card.exp_year}</p>
                                {/* Add more details as needed */}
                            </div>
                            <div className="payment-method-actions">
                            <Button variant="secondary" size="sm" onClick={() => updatePaymentMethod(method)}>Actualizar</Button>
                            <Button variant="danger" size="sm" onClick={() => deletePaymentMethod(method.id)}>Eliminar</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}



            <Button onClick={addMethodsButton}>Agregar metodo de pago</Button>

            {showForm && <PaymentMethodsForm 
                            setShowForm={setShowForm} 
                            setFetchPaymentMethods={setFetchPaymentMethods} 
                            fetchPaymentMethods={fetchPaymentMethods} 
                            paymentMethodToUpdate={paymentMethodToUpdate}
                            setpaymentMethodToUpdate={setpaymentMethodToUpdate}
                            />}

        </div>
    )
}

export default PaymentMethodsList





