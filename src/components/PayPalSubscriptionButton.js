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
  
    const retryLimit = 3; // Maximum number of retries
    const retryDelay = 2000; // Delay between retries in milliseconds

    const attemptApiCall = async (data, attempt = 1) => {
      try {
        const token = getAccessToken();
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/subscription_plan_paypal/`,
          data, {
            headers: headers,
            timeout: 5000
          }
        );

        console.log("API response:", response);
        setSubSuccess(true); // Set subscription success state
        setSubmitted(true); 
      } catch (e) {
        console.log(`Attempt ${attempt}:`, e);
        if (attempt < retryLimit) {
          setTimeout(() => attemptApiCall(data, attempt + 1), retryDelay);
        } else {
          console.error("API call failed after several attempts:", e);
          toast.error(".");
          setSubmitted(true); 
          // Indicate that the process is done, failed after retries
        }
      }
    };

    useEffect(() => {
      if (plan_id && paypalRef.current) {
        paypalRef.current.innerHTML = ''; // Clear the PayPal button container
        
        window.paypal.Buttons({
          createSubscription: function(data, actions) {
            return actions.subscription.create({
              'plan_id': plan_id
            });
          },
          onApprove: function(data, actions) {
            console.log("Subscription successful!", data);
            data["user_id"] = state.user.id;
            attemptApiCall(data); // Attempt to call the API with retries
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
