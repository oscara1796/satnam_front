import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios';
import './PricePlans.css';

const PricePlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true)

    function formatPrice(price) {
        if (!price) {
            return '';
        }
        var priceStr = price.toString();
        var formattedPrice = priceStr.slice(0, -2) + '.' + priceStr.slice(-2);
        return formattedPrice;
    }

    useEffect(() => {
        // Fetch product prices from the API
        const fetchPrices = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/api/get_product_prices/`,
                    { timeout: 5000 }
                );

                console.log('prices data', JSON.parse(response.data));
                const fetchedPlans = JSON.parse(response.data).map(plan => ({
                    name: plan.name,
                    paymentType: plan.metadata.paymentType,
                    price: `$${plan.metadata.paymentType != "Anual" ? formatPrice(plan.price) : formatPrice(plan.price/12)}/mes`,
                    paymentFrequency: `Cobro ${plan.metadata.paymentType.toLowerCase()} de $${formatPrice(plan.price)} recurrente`,
                    currency: '🇲🇽',
                    features: plan.features.map(feature => ({
                        name: feature.name,
                        included: true, // Assuming all fetched features are included
                    })),
                    buttonText: plan.metadata.buttonText,
                    recommended: plan.metadata.paymentType == "Anual" ? true : false, // Defaulting to false, you can adjust based on your logic
                }));
                setPlans(fetchedPlans);
                setLoading(false);
            } catch (e) {
                console.error("Error fetching prices", e);
            }
        };

        fetchPrices();
    }, []);

    return (
        <div className="plan-container">
          {loading && <p>Cargando precios...</p>}
            {plans.map((plan, index) => (
                <div key={index} className={`plan-card ${plan.recommended ? 'recommended' : ''}`}>
                    <div className="plan-header">
                        <h2>{plan.name}</h2>
                        <p>{plan.paymentType}</p>
                    </div>
                    <div className="plan-price">
                        <span>{plan.currency}</span>
                        <h3>{plan.price}</h3>
                        <p>{plan.paymentFrequency}</p>
                    </div>
                    <ul className="plan-features">
                        {plan.features.map((feature, index) => (
                            <li key={index} className={feature.included ? 'included' : 'not-included'}>
                                {feature.name}
                            </li>
                        ))}
                    </ul>
                    <LinkContainer to={{ pathname: '/log-in', search: '?redirect=/payment-methods' }}>
                    <button className="subscribe-button">{plan.buttonText}</button>
                    </LinkContainer>
                </div>
            ))}
        </div>
    );
};

export default PricePlans;
