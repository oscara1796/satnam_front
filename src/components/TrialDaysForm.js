import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import axios from 'axios';
import { getAccessToken } from '../services/AuthService'
import { Navigate } from 'react-router-dom'
import './TrialDaysForm.css';
import { UserContext } from '../context'

function TrialDaysForm({ isLoggedIn, trialDays , setTrialDays}) {
  const [days, setDays] = useState('');
  const [state, setState] = useContext(UserContext)
  const [isFormEnabled, setFormEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;
    
    try {
      let response;

      const token = getAccessToken()
      const headers = { Authorization: `Bearer ${token}` }
      if (isEditing) {
        // Assuming you have an endpoint for updating
        response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/trial-days/${trialDays[0].id}/`, { "days": days }, { headers });
      } else {
        response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/trial-days/`, { "days": days }, { headers });
      }

      setTrialDays([response.data]);
      setDays(''); // Clear the form
      setIsEditing(false);
      setFormEnabled(false);
      toast.success(`Días de Trial se han creado/actualizado correctamente`)
      // You might want to refresh or pass the updated data to the parent component
    } catch (error) {
      toast.error(`Error actualizando trial days: ${error}`)
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = () => {
    setDays(trialDays[0].days);
    setIsEditing(true);
    setFormEnabled(true);
  };

  const handleDelete = async () => {
    // Assuming you have an endpoint for deletion
    try {
      const token = getAccessToken()
      const headers = { Authorization: `Bearer ${token}` }
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/trial-days/${trialDays[0].id}`, { headers });
      // Handle successful deletion, maybe refresh data or inform the parent component
      setFormEnabled(true);
      setTrialDays([]);
      toast.success(`Días de Trial se ha eliminado correctamente`)
    } catch (error) {
      toast.error(`Error eliminando trial days: ${error}`)
      console.error("Error deleting trial day:", error);
    }
  };

  const trialDaysSchema = Yup.object().shape({
    days: Yup.number()
      .typeError('Days must be a number')
      .min(1, 'Days must be greater than zero')
      .required('Days is required')
      // Add any other constraints you might need, like positive number, minimum, maximum, etc.
  });

  const validateForm = async () => {
    try {
      // Validate the form data
      await trialDaysSchema.validate({ days });
      return true; // No validation errors
    } catch (err) {
      // Handle validation errors
      setErrors({ days: err.message });
      return false; // There are validation errors
    }
  };

  if (!isLoggedIn || (state.user && !state.user.is_staff)) {
    return <Navigate to='/log-in' />
  }

  return (
    <div>
      {trialDays.length > 0 && !isFormEnabled ? (
        <div className="trialDaysForm">
          <h3>Trial Days: {trialDays[0].days}</h3>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <form className="trialDaysForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="days">Days:</label>
            <input
              className={errors.days ? 'error' : ''}
              type="number"
              id="days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required
            />
            {errors.days && <p className="error-message">{errors.days}</p>}
          </div>
          <button type="submit">{isEditing ? 'Update' : 'Submit'}</button>
        </form>
      )}
    </div>
  );
}

export default TrialDaysForm;
