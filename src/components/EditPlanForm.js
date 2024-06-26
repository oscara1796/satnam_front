import React, { useState, useEffect } from 'react';

const EditPlanForm = ({ currentPlan, updatePlan, setEditing }) => {
    const [plan, setPlan] = useState(currentPlan);

    useEffect(() => {
        setPlan(currentPlan);
    }, [currentPlan]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPlan({ ...plan, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        updatePlan(plan);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={plan.name} onChange={handleInputChange} />
            <label>Price</label>
            <input type="text" name="price" value={plan.price} onChange={handleInputChange} />
            <button>Update plan</button>
            <button onClick={() => setEditing(false)} className="button muted-button">
                Cancel
            </button>
        </form>
    );
};

export default EditPlanForm;
