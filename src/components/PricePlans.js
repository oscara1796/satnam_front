import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PricePlans.css';  // Ensure this CSS file includes the new styles and media queries

const PricePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatPrice = (price) => {
    if (!price) return '';
    return `$${(price / 100).toFixed(2)}`;
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get_product_prices/`);
        const fetchedPlans = response.data.map(plan => ({
          ...plan,
          priceFormatted: formatPrice(plan.price),
          paymentFrequency: `Cobro ${plan.frequency_type.toLowerCase()} de ${formatPrice(plan.price)} recurrente`
        }));
        setPlans(fetchedPlans);
        setLoading(false);
      } catch (e) {
        console.error('Error fetching prices', e);
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  if (loading) return <p>Cargando precios...</p>;

  return (
    <div className='plan-container'>
      {plans.map((plan, index) => (
        <div key={index} className="plan-card">
          <div className='plan-header'>
            <h2>{plan.name}</h2>
            <p>{plan.frequency_type}</p>
          </div>
          <div className='plan-price'>
            <h3>{plan.priceFormatted}</h3>
            <p>{plan.paymentFrequency}</p>
          </div>
          <ul className='plan-features'>
            {plan.features.map((feature, index) => (
              <li key={index} className={feature.included ? 'included' : 'not-included'}>
                {feature.name}
              </li>
            ))}
          </ul>
          <Link to={{ pathname: '/log-in', search: '?redirect=/payment-methods' }}>
            <button className='subscribe-button'>{plan.metadata.buttonText}</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PricePlans;
