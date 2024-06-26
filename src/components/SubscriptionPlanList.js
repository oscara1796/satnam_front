import React from 'react';

const SubscriptionPlanList = ({ plans, editRow, deletePlan }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {plans.length > 0 ? (
                    plans.map(plan => (
                        <tr key={plan.id}>
                            <td>{plan.name}</td>
                            <td>${plan.price}</td>
                            <td>
                                <button onClick={() => editRow(plan)}>Edit</button>
                                <button onClick={() => deletePlan(plan.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3}>No plans</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default SubscriptionPlanList;
