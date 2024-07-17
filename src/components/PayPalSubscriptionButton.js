import React, { useEffect, useRef, useContext, useState } from 'react';
import { UserContext } from '../context'
import {getAccessToken } from '../services/AuthService'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const PayPalSubscriptionButton = ({ plan_id }) => {
    const [state, setState] = useContext(UserContext);
    const [isSubmitted, setSubmitted] = useState(false);
    const [isSubSuccess, setSubSuccess] = useState(false)

    const paypalRef = useRef(null);  // Reference to the PayPal button container
  
    useEffect(() => {
      if (plan_id && paypalRef.current) {
        // Ensure the container is empty before initializing a new button
        paypalRef.current.innerHTML = '';
        
        window.paypal.Buttons({
          createSubscription: function(data, actions) {
            return actions.subscription.create({
              'plan_id': plan_id
            });
          },
          onApprove:  async function(data, actions) {
            console.log("Subscription successful!", data);
            data["user_id"] = state.user.id;
            try {
              const token = getAccessToken();
              const headers = { Authorization: `Bearer ${token}` }
          
              const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/subscription_plan_paypal/`,
                data,{
                  headers: headers,
                },
                { timeout: 5000 }
              );


              setSubSuccess(true);
              // Assume the response is the array of product data
            } catch (e) {
              console.log(e);
            }

            setSubmitted(true);
            // Further actions upon successful subscription
          },
          onError: function(err) {
            console.error('Error with PayPal Button:', err);

            setSubmitted(true);
          }
        }).render(paypalRef.current);
      }
  
      // Cleanup function to remove PayPal button when component unmounts or plan_id changes
      return () => {
        if (paypalRef.current) {
          paypalRef.current.innerHTML = '';
        }
      };
    }, [plan_id, isSubmitted]);  // Dependency array includes plan_id to re-initialize the button if plan_id changes
    
    if (isSubmitted) {
      if (isSubSuccess) {
        return <Navigate to='/sub-success' />
      }
      return <Navigate to='/sub-cancel' />
    }

    return (
      <div>
        {plan_id ? (
          <div ref={paypalRef} />  // Container for the PayPal button
        ) : (
          <div className="alert alert-info" role="alert">
            Por favor seleccione un plan de la derecha.
          </div>
        )}
      </div>
    );
  };
  
  export default PayPalSubscriptionButton;
