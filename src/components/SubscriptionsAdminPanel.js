import React, { useState, useEffect } from 'react';
import SubscriptionPlanList from './SubscriptionPlanList';
import AddPlanForm from './AddPlanForm';
import EditPlanForm from './EditPlanForm';

const SubscriptionPlansAdmin = () => {
    const [plans, setPlans] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [editing, setEditing] = useState(false);

    // Fetch plans from an API
    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        // Replace URL with your actual API endpoint
        const response = await fetch('https://api.yoursite.com/plans');
        const data = await response.json();
        setPlans(data);
    };

    const addPlan = async (plan) => {
        const response = await fetch('https://api.yoursite.com/plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(plan),
        });
        const newPlan = await response.json();
        setPlans([...plans, newPlan]);
    };

    const deletePlan = async (id) => {
        await fetch(`https://api.yoursite.com/plans/${id}`, { method: 'DELETE' });
        setPlans(plans.filter(plan => plan.id !== id));
    };

    const updatePlan = async (updatedPlan) => {
        const response = await fetch(`https://api.yoursite.com/plans/${updatedPlan.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPlan),
        });
        const newPlan = await response.json();
        setPlans(plans.map(plan => (plan.id === newPlan.id ? newPlan : plan)));
        setEditing(false);
    };

    const editRow = (plan) => {
        setEditing(true);
        setCurrentPlan({ ...plan });
    };

    return (
        <div className="subscription-plans-admin">
            <h2>Manage Subscription Plans</h2>
            {editing ? (
                <EditPlanForm 
                    currentPlan={currentPlan} 
                    setEditing={setEditing} 
                    updatePlan={updatePlan} 
                />
            ) : (
                <AddPlanForm addPlan={addPlan} />
            )}
            <SubscriptionPlanList plans={plans} editRow={editRow} deletePlan={deletePlan} />
        </div>
    );
};

export default SubscriptionPlansAdmin;
