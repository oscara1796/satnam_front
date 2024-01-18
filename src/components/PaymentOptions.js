import React, { useState, useEffect } from 'react';
import SubscriptionForm from './SubscriptionForm'
import { Navigate } from 'react-router-dom'
import { getUser, getAccessToken } from '../services/AuthService'
import axios from 'axios';

const TotalCheckoutBox = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    function formatPrice(price) {
      var priceStr = price.toString();
      var formattedPrice = priceStr.slice(0, -2) + '.' + priceStr.slice(-2);
      return formattedPrice;
  }


  useEffect(() => {
    // Fetch product prices from the API
    const fetchPrices = async () => {
      try {

        const token = getAccessToken()
        const headers = { Authorization: `Bearer ${token}` }

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get_product_prices/`, {
          headers: headers,
        });

        console.log("prices data",JSON.parse(response.data));
        // Assume the response is the array of product data
        setPrices(JSON.parse(response.data));
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  // Display loading, error, or the list of product prices
  return (
    <div className='total-amount-box'>
      <h3>Total Amount</h3>
      {loading && <p>Loading prices...</p>}
      {error && <p>Could not load prices: {error.message}</p>}
      <ul>
        {prices.map((product, index) => (
          <li key={index}>
            {product.name} - ${formatPrice(product.price)}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PaymentOptions = ({ isLoggedIn }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const paymentOptions = [
    {
      id: 1,
      label: 'Tarjeta credito',
      component: <SubscriptionForm isLoggedIn={isLoggedIn} />,
    },
    { id: 2, label: 'PayPal' },
    { id: 3, label: 'Google Pay' },
  ]

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId)
  }

  if (!isLoggedIn) {
    return <Navigate to='/log-in' />
  }

  return (

    <>
      <div className='container my-3 payments-box'>
        <h2 className='my-3'>Opciones de pago</h2>
        <div className='payment-options mt-2'>
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className={`payment-option ${
                selectedOption === option.id ? 'selected' : ''
              }`}
            >
              <input
                type='checkbox'
                id={`option-${option.id}`}
                name={`option-${option.id}`}
                checked={selectedOption === option.id}
                onChange={() => handleOptionChange(option.id)}
              />
              <label htmlFor={`option-${option.id}`} className='option-label'>
                <div className={`circle `} />
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {selectedOption && (
          <div className='selected-option'>
            {
              paymentOptions.find((option) => option.id === selectedOption)
                .component
            }
          </div>
        )}
      </div>
      <TotalCheckoutBox />
    </>
  )
}





export default PaymentOptions
