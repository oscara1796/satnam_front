import React, {useState, useContext} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
 Container
} from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import axios from 'axios';
import { getUser, getAccessToken } from '../services/AuthService'; 
import { UserContext } from '../context';



const SubscriptionForm = ({isLoggedIn}) => {
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubSuccess, setSubSuccess] = useState(false);
  const [state, setState] = useContext(UserContext);

  
  
  const initialValues = {
    card_number: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
  };

  const handleSubmit = async (values) => {
    
    let user = getUser();
    let url = `${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}/`;

    const formData = new FormData();
    formData.append('number', values.card_number.replace(/\s+/g, ''));
    formData.append('exp_month', values.exp_month);
    formData.append('exp_year', values.exp_year);
    formData.append('cvc', values.cvc);

    const token = getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
   
   
    try {
      console.log(formData);
      let response = await axios.post(url, formData, {
        headers: headers,
      });
      console.log('Subscription created:', response.data);
      if (response.data.status === 'incomplete') {
          
        throw new Error("Subscription was not able to complete");
      }
      console.log("navigate to success");
      setSubSuccess(true)
    } catch (error) {
      console.error('Error creating subscription:');
      console.log(error);
      console.log("navigate to cancel");
      setSubSuccess(false)
    }
    setSubmitted(true);
    // setSubscriptionFormSubmitted(true);
  };

 
  if (!isLoggedIn  ) {
    return <Navigate to='/log-in' />;
  }

  if (isSubmitted) {
    if (isSubSuccess) {
      return <Navigate to='/sub-success' />;
    }
    return <Navigate to='/sub-cancel' />;
  }


  // format credit card number into fours and validate credit number

    function cc_format(value) {
      var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
      var matches = v.match(/\d{4,16}/g);
      var match = matches && matches[0] || ''
      var parts = []

      for (var i=0, len=match.length; i<len; i+=4) {
          parts.push(match.substring(i, i+4))
      }

      if (parts.length) {
          return parts.join(' ')
      } else {
          return value
      }
  }

  const handleCreditCardChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    const formattedValue = cc_format(value); // Format the value using the cc_format function
    setFieldValue(name, formattedValue);
  };

  function isCreditCardValid(cardNumber) {
    // Remove any non-digit characters
    cardNumber = cardNumber.replace(/\D/g, '');

    // Check if the card number is empty or doesn't consist of 13 to 19 digits
    if (!/^\d{13,19}$/.test(cardNumber)) {
        return false;
    }

    // Use the Luhn algorithm to validate the credit card number
    let sum = 0;
    let doubleUp = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        if (doubleUp) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        doubleUp = !doubleUp;
    }

    return (sum % 10 === 0);
}

  //validate month 

  function isValidMonth(input) {
    // Regular expression to match a valid month (01 to 12)
    const value = input
    const month = parseInt(value, 10);
  
    if ( month >= 1 && month <= 12) {
      return value; // Return the valid month
    } else {
      return ''; // Return an empty string if it's not a valid month
    }
  }

  //validate year 

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 10; i++) {
    years.push(currentYear + i);
  }


  // Validate cvc of card 
  const isValidCVC = (cvc) => {
    // Regular expression to match a valid CVC (3 or 4 digits)
    const cvcRegex = /^\d{3,4}$/;
    return cvcRegex.test(cvc);
  };

 
  

  return (
    <Container className="mt-2  sub_form">
            
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validate={(values) => {
                const errors = {};
                if (!isValidCVC(values.cvc)) {
                  errors.cvc = 'CVC invalido. Por favor ingresa un CVC valido de entre 3 a 4 digitos';
                }

                if (!isCreditCardValid(values.card_number)) {
                  errors.card_number= 'Lo sentimos, pero el número de tarjeta ingresado no es válido.'
                }
                return errors;
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="card_number" className="form-label">
                      Card Number:
                    </label>
                    <Field
                      type="text"
                      name="card_number"
                      className="form-control"
                      onChange={(e) => handleCreditCardChange(e, setFieldValue)}
                      required
                    />
                    <ErrorMessage
                      name="card_number"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="exp_month" className="form-label">
                        Expiration Month:
                      </label>
                      <Field
                        type="number"
                        name="exp_month"
                        className="form-control"
                        onChange={(e) => {
                          
                          setFieldValue(e.target.name,isValidMonth(e.target.value))
                        }}
                        required
                      />
                      <ErrorMessage
                        name="exp_month"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="exp_year" className="form-label">
                        Expiration Year:
                      </label>
                      <Field
                        as="select"
                        name="exp_year"
                        className="form-control"
                        
                        required
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="exp_year"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cvc" className="form-label">
                      CVC:
                    </label>
                    <Field 
                    type="text"
                    name="cvc" 
                    className="form-control" 
                    required />
                    <ErrorMessage name="cvc" component="div" className="text-danger" />
                  </div>
                  
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    Subscribe
                  </button>
                </Form>
              )}
            </Formik>
    </Container>
  );
};

export default SubscriptionForm;
