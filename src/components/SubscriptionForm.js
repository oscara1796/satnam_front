import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
 Container
} from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import axios from 'axios';
import { getUser, getAccessToken } from '../services/AuthService'; 

const SubscriptionForm = ({isLoggedIn, setSubscriptionFormSubmitted, logIn}) => {
  const [isSubmitted, setSubmitted] = useState(false);


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
    formData.append('number', values.card_number);
    formData.append('exp_month', values.exp_month);
    formData.append('exp_year', values.exp_year);
    formData.append('cvc', values.cvc);

    const token = getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
   
   
    try {
      let response = await axios.post(url, formData, {
        headers: headers,
      });
      console.log('Subscription created:', response.data);
      setSubscriptionFormSubmitted(true);
      setSubmitted(true);
    } catch (error) {
      console.error('Error creating subscription:', error.response.data);
    }
  };

  const validateForm = (values) => {
    const errors = {};
    // Add custom validation rules here if needed
    return errors;
  };

  if (!isLoggedIn  || isSubmitted) {
    return <Navigate to='/' />;
  }

  return (
    <Container className="mt-2  sub_form">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="card_number" className="form-label">
                      Card Number:
                    </label>
                    <Field
                      type="text"
                      name="card_number"
                      className="form-control"
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
                        type="number"
                        name="exp_year"
                        className="form-control"
                        required
                      />
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
                    <Field type="text" name="cvc" className="form-control" required />
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
