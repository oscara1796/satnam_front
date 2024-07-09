import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Modal, Button, Form } from 'react-bootstrap';
import { UserContext } from '../context';
import { getUser, getAccessToken } from '../services/AuthService'
import { showErrorNotification } from '../services/notificationService'
import './SubscriptionPlansAdmin.css'; 
import { Formik } from 'formik'

const SubscriptionPlansAdmin = ({isLoggedIn}) => {
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fetchPlansBool, setFetchPlanBool] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setState } = useContext(UserContext);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(currentPlan?.image || '');

  useEffect(() => {
    setLoading(true);
    fetchPlans();
  }, [fetchPlansBool]);

  useEffect(() => {
    // Update the image preview when the current plan changes
    if (currentPlan?.image) {
      setImagePreviewUrl(currentPlan.image);
      setImageFile(null); // Reset file input when switching plans
    }
  }, [currentPlan]);


  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        setFieldValue('image', file);  // Update Formik's state
      };
      reader.readAsDataURL(file);
    }
};

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
      const token = getAccessToken()
      const headers = { Authorization: `Bearer ${token}` }
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/subscription_plan/`, { headers, timeout: 5000 });
      setPlans(data);
      setLoading(false);
    } catch (error) {
       console.log(error)
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'features' || key === 'metadata') {
        formData.append(key, JSON.stringify(values[key]));
      } else if (key === 'image' && values[key]) {
        formData.append('image', values[key]);  // Append file to FormData
      } else {
        formData.append(key, values[key]);
      }
    });
  
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/subscription_plan/${currentPlan ? `${currentPlan.id}/` : ''}`;
      const method = currentPlan ? 'put' : 'post';
      console.log(formData)
      await axios[method](url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getAccessToken()}`
        }
      });
      closeModal();
      setFetchPlanBool(!fetchPlansBool);
      toast.success('Plan updated successfully');
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
    ),
    image: Yup.mixed()
    .nullable()
    .notRequired()
    .test(
      "fileSize",
      "File too large",
      value => !value || (value && value.size <= 1024 * 1024 * 5) // 5 MB limit
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => !value || (value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
    )
  });


  const deletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        const token = getAccessToken()
        const headers = { Authorization: `Bearer ${token}` }
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/subscription_plan/${planId}/`, { headers, timeout: 5000 });
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
    <div className="plan_container_subscriptions">
      <Button onClick={() => openModal()}>Add New Plan</Button>
      {plans.map(plan => (
        <div key={plan.id} className='plan-card'>
          <h4>{plan.name}</h4>
          <p>${plan.price}</p>
          <div>
            <p>{plan.description}</p>
          </div>
          <Button onClick={() => openModal(plan)}>Edit</Button>
          <Button onClick={() => deletePlan(plan.id)}>Delete</Button>
        </div>
      ))}

      <Modal show={showModal} onHide={closeModal} centered scrollable={true}>
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
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
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
                      <Form.Label>Image</Form.Label>
                      {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ width: '100px', height: 'auto' }} />}
                      <Form.Control
                        type="file"
                        name="image"
                        onChange={(event) => handleImageChange(event, setFieldValue)}
                      />
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
                        className='textarea-json'
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
                        className='textarea-json'
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.metadata}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" disabled={isSubmitting} className='button-save' >Save Plan</Button>
                    </Form>
                )}
            </Formik>
      </Modal>
    </div>
  );
};

export default SubscriptionPlansAdmin;
