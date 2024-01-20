import React from 'react';
import './TrialBanner.css'; // Assuming you have a CSS file for styling

const TrialBanner = ({ trialDays }) => {
    return (
        <div className="trial-banner">
            <h2>Free Trial</h2>
            <p>Join now and get <strong>{trialDays}</strong> days free trial!</p>
        </div>
    );
};

export default TrialBanner;