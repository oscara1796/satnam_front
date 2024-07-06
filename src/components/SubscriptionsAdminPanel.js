import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'
import { Modal, Button, Form } from 'react-bootstrap';
import { UserContext } from '../context';
import { showErrorNotification } from '../services/notificationService'
import './SubscriptionPlansAdmin.css'; 
import { Formik } from 'formik'

const SubscriptionPlansAdmin = ({isLoggedIn}) => {
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fetchPlansBool, setFetchPlanBool] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    fetchPlans();
  }, [fetchPlansBool]);

  const openModal = (plan = null) => {
    setCurrentPlan(plan);  // If plan is null, it's a new plan
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentPlan(null);
  };

  const fetchPlans = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}api/subscription_plan/`);
      setPlans(data);
      setLoading(false);
    } catch (error) {
        showErrorNotification(error);
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    // Prepare data to fit the expected format, especially JSON fields
    const planData = {
      ...values,
      features: JSON.parse(values.features || '{}'),
      metadata: JSON.parse(values.metadata || '{}')
    };

    try {
      const url = `${process.env.REACT_APP_BASE_URL}api/subscription_plan/${currentPlan ? `${currentPlan.id}/` : ''}`;
      const method = currentPlan ? 'put' : 'post';
      await axios[method](url, planData);
      closeModal();
      setFetchPlanBool(!fetchPlansBool);
      toast.success('Se Guardo tu actualizaron los planes correctamente');
    } catch (error) {
        showErrorNotification(error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').min(0, 'Price must be non-negative'),
    frequency_type: Yup.string()
    .oneOf(['month', 'year'], 'Invalid frequency type')
    .required('Frequency type is required'),
    features: Yup.string().required('Features are required').test(
      'is-json',
      'Features must be valid JSON',
      value => {
        try { JSON.parse(value); return true; }
        catch (e) { return false; }
      }
    ),
    metadata: Yup.string().required('Metadata are required').test(
      'is-json',
      'Metadata must be valid JSON',
      value => {
        try { JSON.parse(value); return true; }
        catch (e) { return false; }
      }
    )
  });


  const deletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/plans/${planId}/`);
        // Re-fetch plans to update the list
        setFetchPlanBool(!fetchPlansBool);
        toast.success('Se elimino el plan correctamente');
      } catch (error) {
        showErrorNotification(error);
      }
    }
  };

  if (!isLoggedIn || (user && !user.is_staff)) {
    return <Navigate to="/log-in" />;
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="plan-container">
      <Button onClick={() => openModal()}>Add New Plan</Button>
      {plans.map(plan => (
        <div key={plan.id} className='plan-card'>
          <p>{plan.name} - {plan.price}</p>
          <Button onClick={() => openModal(plan)}>Edit</Button>
          <Button onClick={() => deletePlan(plan.id)}>Delete</Button>
        </div>
      ))}

      <Modal show={showModal} onHide={closeModal}>
        <Formik
            initialValues={{
                name: currentPlan?.name || '',
                description: currentPlan?.description || '',
                price: currentPlan?.price || '',
                frequency_type: currentPlan?.frequency_type || '',
                features: JSON.stringify(currentPlan?.features || [
                    {"name": "Feature 1 Description"},
                    {"name": "Feature 2 Description"}
                ]),
                metadata: JSON.stringify(currentPlan?.metadata || {"meta1": "data1"})
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            enableReinitialize={true}
            >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        as="textarea"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.description && !!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.price && !!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.price}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Frequency Type</Form.Label>
                        <Form.Control
                            as="select"
                            name="frequency_type"
                            value={values.frequency_type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.frequency_type && !!errors.frequency_type}
                        >
                            <option value="">Select Frequency</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.frequency_type}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Features (JSON)</Form.Label>
                        <Form.Control
                        as="textarea"
                        name="features"
                        value={values.features}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.features && !!errors.features}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.features}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Metadata (JSON)</Form.Label>
                        <Form.Control
                        as="textarea"
                        name="metadata"
                        value={values.metadata}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.metadata && !!errors.metadata}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.metadata}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" disabled={isSubmitting}>Save Plan</Button>
                    </Form>
                )}
            </Formik>
      </Modal>
    </div>
  );
};

export default SubscriptionPlansAdmin;
