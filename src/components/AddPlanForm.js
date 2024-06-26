import React, { useState } from 'react';

const AddPlanForm = ({ addPlan }) => {
    const initialFormState = { id: null, name: '', price: '' };
    const [plan, setPlan] = useState(initialFormState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPlan({ ...plan, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (!plan.name || !plan.price) return;

        addPlan(plan);
        setPlan(initialFormState);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={plan.name} onChange={handleInputChange} />
            <label>Price</label>
            <input type="text" name="price" value={plan.price} onChange={handleInputChange} />
            <button>Add new plan</button>
        </form>
    );
};

export default AddPlanForm;
