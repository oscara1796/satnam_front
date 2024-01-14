import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import axios from 'axios';

function TrialDayForm({ trialDays }) {
  const [days, setDays] = useState('');
  const [isFormEnabled, setFormEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;
    
    try {
      let response;
      if (isEditing) {
        // Assuming you have an endpoint for updating
        response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/trial-days/${trialDays.id}`, { days });
      } else {
        response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/trial-days/`, { days });
      }

      console.log(response.data);
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
    setDays(trialDays.days);
    setIsEditing(true);
    setFormEnabled(true);
  };

  const handleDelete = async () => {
    // Assuming you have an endpoint for deletion
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/trial-days/${trialDays.id}`);
      // Handle successful deletion, maybe refresh data or inform the parent component
      setFormEnabled(true);
    } catch (error) {
      console.error("Error deleting trial day:", error);
    }
  };

  const trialDaysSchema = Yup.object().shape({
    days: Yup.number()
      .typeError('Days must be a number')
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

  if (trialDays && !isFormEnabled) {
    // Display trialDays info with Edit and Delete buttons
    return (
      <div>
        <div>
          <h3>Trial Days: {trialDays.days}</h3>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    );
  } else {
    // Show the form
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="days">Days:</label>
            <input
              type="number"
              id="days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              disabled={!isFormEnabled}
              required
            />
          </div>
          {errors.days && <p>{errors.days}</p>} {/* Display validation error for days */}
          <button type="submit">{isEditing ? 'Update' : 'Submit'}</button>
        </form>
      </div>
    );
  }
}

export default TrialDayForm;
