import React, { useState, useContext, useEffect } from 'react';
import { getUser, getAccessToken } from '../services/AuthService'
import { Spinner, Button } from 'react-bootstrap'
import axios from 'axios'
import PaymentMethodsForm from './PaymentMethodsForm'
import './PaymentMethodsList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showErrorNotification } from '../services/notificationService'
import { getCardBrandIcon } from '../services/CardValidationService';




const PaymentMethodsList = () => {
    const [paymentMethods, setPaymentMethods] = useState({ default_payment_method: null, all_payment_methods: [] })
    const [fetchPaymentMethods, setFetchPaymentMethods] = useState(false);
    const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const getPaymentMethods = async () => {
        setLoading(true);
        
        let user = getUser();
        if (user) {
            let url = `${process.env.REACT_APP_BASE_URL}/api/payment_method/${user.id}/`

            const token = getAccessToken()
            const headers = { Authorization: `Bearer ${token}` }

            try{
                let response = await axios.get(url,  {
                    headers: headers,
                }, {timeout:5000})
                console.log(response.data);
                setPaymentMethods(response.data)
                setDefaultPaymentMethod(response.data.default_payment_method)
            } catch(error){
                showErrorNotification(error);
                console.log(error);
            } finally{
                setLoading(false);
            }
        }
    }

    useEffect(() => {

        getPaymentMethods()
      }, [fetchPaymentMethods])


    

    const deletePaymentMethod = async (methodId) => {
        console.log(methodId);
        setLoading(true);
       
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
        } finally {
            setLoading(false);
        }
      };

      const applyDefaultPaymentMethod = async (method) => {
        setLoading(true);
        console.log(`Updating payment method with ID: ${method.id}`);
        let user = getUser();
        let url = `${process.env.REACT_APP_BASE_URL}/api/payment_method/${user.id}/`;
        const token = getAccessToken();
        const data = { payment_method_id: method.id }; // Data payload to be sent in the request body
    
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000,
        };
    
        try {
            await axios.put(url, data, config); // Note the corrected order: URL, data, config
            console.log(`Set default payment method with ID: ${method.id}`);
            setFetchPaymentMethods(prevState => !prevState); // Trigger re-fetch of payment methods
        } catch (error) {
            showErrorNotification(error);
            console.error(error);
        } finally{
            setLoading(false);
        }
    };

      const addMethodsButton = () =>{
        setShowForm(!showForm)
        
      }
      
      
    

   

    return (
        <div>
            <h4>Metodos de pago</h4>
            <div className="instructions-container">
                <h5>Instrucciones para la Gestión de Métodos de Pago</h5>
                <p>Añade, configura y elimina métodos de pago fácilmente desde tu perfil. Selecciona tu metodo principal para transacciones futuras. Gestiona tus pagos con seguridad y conveniencia.</p>
            </div>

            <div className='text-center font-weight-bold'>
                {isLoading && (
                    <>
                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                    {' Loading...'}
                    </>
                ) }
            </div>
            

            {paymentMethods.all_payment_methods.length > 0 && (
                <div className="payment-methods-list">
                    
                    {paymentMethods.all_payment_methods.map((method) => (
                        <div key={method.id} className={`payment-method-box  ${defaultPaymentMethod && defaultPaymentMethod.id === method.id ? 'payment-method-selected' : ''}`}>
                            <div className="payment-method-details">
                                <FontAwesomeIcon icon={getCardBrandIcon(method.card.brand)} />
                                <p>Brand: {method.card.brand.toUpperCase()}</p>
                                <p>Last 4 Digits: **** **** **** {method.card.last4}</p>
                                <p>Expires: {method.card.exp_month}/{method.card.exp_year}</p>
                                {/* Add more details as needed */}
                            </div>
                            <div className="payment-method-actions">

                            {
                                defaultPaymentMethod && defaultPaymentMethod.id === method.id  
                                    ?
                                <span>*Pago Principal</span> 
                                    :
                                <Button variant="secondary" size="sm" onClick={() => applyDefaultPaymentMethod(method)}>Principal metodo de Pago</Button>
                            }    
                            
                            <Button variant="danger" size="sm" onClick={() => deletePaymentMethod(method.id)}>Eliminar</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}



            <Button onClick={addMethodsButton}>{showForm ? "Cerrar formulario" :"Agregar metodo de pago"}</Button>

            {showForm && <PaymentMethodsForm 
                            setShowForm={setShowForm} 
                            setFetchPaymentMethods={setFetchPaymentMethods} 
                            fetchPaymentMethods={fetchPaymentMethods} 
                            
                            />}

        </div>
    )
}

export default PaymentMethodsList





