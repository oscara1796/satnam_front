import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showErrorNotification } from '../services/notificationService'
import { toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Button, Card } from 'react-bootstrap';
import * as Yup from 'yup';

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('La confirmación de la contraseña es obligatoria'),
});

function ResetPassword({isLoggedIn}) {
  const { uid, token } = useParams();
  const [isSubmitted, setSubmitted] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (values, { setSubmitting }) => {
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/password-reset-confirm/${uid}/${token}/`, {
        "password": values.password,
      }, {timeout: 5000});
      setSubmitted(true);
      toast.success('Se ha cambiado tu contraseña.');
    } catch (error) {
      showErrorNotification(error);
    }
    setSubmitting(false);
  };

  

  if (isLoggedIn || isSubmitted) {
    return <Navigate to='/log-in' />
  }

   return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4">
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={resetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Nueva Contraseña</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirma Nueva Contraseña</label>
                  <Field name="confirmPassword" type="password" className="form-control" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                </div>
                <Button type="submit" variant="primary" disabled={isSubmitting} className="w-100">
                  {isSubmitting ? 'Cambiando...' : 'Cambiar Contraseña'}
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ResetPassword;
