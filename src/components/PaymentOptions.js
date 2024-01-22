import React, { useState, useContext, useEffect } from 'react'
import SubscriptionForm from './SubscriptionForm'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context'
import { getUser, getAccessToken } from '../services/AuthService'
import axios from 'axios';
import { toast } from 'react-toastify'
import TrialBanner from './TrialBanner';

const TotalCheckoutBox = ({setSelectedPriceId, selectedPriceId}) => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const [totalAmount, setTotalAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [error, setError] = useState(null);

    function formatPrice(price) {
      if (!price) {
        return ""
      }
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

  const handleSelectionChange = (productId, productPrice, productCurrency) => {
    setSelectedPriceId(productId);
    setTotalAmount(productPrice);
    setCurrency(productCurrency)
  };

  // Display loading, error, or the list of product prices
  return (
    <div className='total-amount-box'>
      <h3>Monto total: ${formatPrice(totalAmount) + " " + currency}</h3>
      {loading && <p>Loading prices...</p>}
      {error && <p>Could not load prices: {error.message}</p>}
      <h5>Planes:</h5>
      <div className="prices-container">
        {prices.map((product, index) => (
          <label key={index} className="price-option">
            <input 
              type="checkbox" 
              name="priceOption" 
              checked={selectedPriceId === product.default_price}
              onChange={() => handleSelectionChange(product.default_price, product.price, product.currency)}
            />
            <span className="price-label">
              
              <h3>{product.name} </h3>
              <img className="product_image" src={product.images[0]}></img>
              <p>{product.description}</p>
              <span>${formatPrice(product.price) +  " " + product.currency}</span>
            
            </span>
          </label>
        ))}
       </div>
    </div>
  );
};

const PaymentOptions = ({ isLoggedIn, trialDays}) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedPriceId, setSelectedPriceId] = useState(null);
  const [state, setState] = useContext(UserContext)

  const paymentOptions = [
    {
      id: 1,
      label: 'Tarjeta credito/debito',
      component: <SubscriptionForm isLoggedIn={isLoggedIn} selectedPriceId={selectedPriceId} trialDays={trialDays} />,
    },
    // { id: 2, label: 'PayPal' },
    // { id: 3, label: 'Google Pay' },
  ]

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId)
  }

  if (!isLoggedIn) {
    return <Navigate to='/log-in' />
  }

  if (state.user && state.user.active) {
    return <Navigate to='/' />
  }

  return (

    <div className='checkout_page' >
      <div className='container my-3 payments-box'>
        {
          trialDays.length > 0 
            ?
          (<TrialBanner trialDays={trialDays[0].days} />)
            : 
          (<></>)
        }
        
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
      <TotalCheckoutBox setSelectedPriceId={setSelectedPriceId} selectedPriceId={selectedPriceId}/>
    </div>
  )
}





export default PaymentOptions
