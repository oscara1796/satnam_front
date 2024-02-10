import React, { useState, useContext, useEffect } from 'react'
import SubscriptionForm from './SubscriptionForm'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context'
import { getUser, getAccessToken } from '../services/AuthService'
import axios from 'axios';
import './PaymentOptions.css'
import './PaymentMethodsList.css'
import TrialBanner from './TrialBanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCardBrandIcon } from '../services/CardValidationService';
import { Button } from 'react-bootstrap'

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
  const [fetchPaymentMethods, setFetchPaymentMethods] = useState(false);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(null);
  const [selectDefaultPaymentMethod, setSelectDefaultPaymentMethod ] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedPriceId, setSelectedPriceId] = useState(null);
  const [state, setState] = useContext(UserContext)
  const [isLoading, setLoading] = useState(false);


  const getPaymentMethods = async () => {
    setLoading(true);
    
    let user = getUser();
    if (user) {
      let url = `${process.env.REACT_APP_BASE_URL}/api/payment_method/${user.id}/`

      const token = getAccessToken()
      const headers = { Authorization: `Bearer ${token}` }

      try{
          let response = await axios.get(url,  {
              headers: headers,
            }, {timeout:5000})
            console.log(response.data.default_payment_method);
            setDefaultPaymentMethod(response.data.default_payment_method)
      } catch(error){
          showErrorNotification(error);
          console.log(error);
      } finally{
          setLoading(false);
      }
      
    }
    
}

useEffect(() => {

    getPaymentMethods()
  }, [fetchPaymentMethods])

  const paymentOptions = [
    {
      id: 1,
      label: 'Tarjeta credito/debito',
      component: <SubscriptionForm isLoggedIn={isLoggedIn} selectedPriceId={selectedPriceId} trialDays={trialDays} selectDefaultPaymentMethod={selectDefaultPaymentMethod} />,
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

  useEffect(() => {


    const selectFirtsOption = () => {
      if (paymentOptions.length > 0) {
        setSelectedOption(paymentOptions[0].id);
      }
    }
    selectFirtsOption();
  }, []);

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
            <DefaultPaymentMethod 
              defaultPaymentMethod={defaultPaymentMethod}
              selectDefaultPaymentMethod={selectDefaultPaymentMethod}
              selectedPriceId={selectedPriceId}
              trialDays={trialDays}   
              setSelectDefaultPaymentMethod={setSelectDefaultPaymentMethod} />
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

const DefaultPaymentMethod = ({defaultPaymentMethod, setSelectDefaultPaymentMethod, selectedPriceId,trialDays, selectDefaultPaymentMethod}) =>{

  const [isSubmitted, setSubmitted] = useState(false)
  const [isSubSuccess, setSubSuccess] = useState(false)
  const [priceError, setPriceError] = useState(''); 

  const selectPaymentMethod = (methodId) =>{
    if (selectDefaultPaymentMethod == null) {
      
      setSelectDefaultPaymentMethod(methodId);
    } else{
      setSelectDefaultPaymentMethod(null);
    }
  }


  const handleSubmit = async () => {

    if (!selectedPriceId) {
      setPriceError('Por favor selecciona un plan ');
      return; // Stop the submission if no price is selected
    }
    let user = getUser()
    let url = `${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}/`

    const formData = new FormData()
    formData.append("payment_method_id", selectDefaultPaymentMethod)
    formData.append('price_id', selectedPriceId)

    if (trialDays.length > 0) {
      formData.append('trial', trialDays[0].days)
    }

    const token = getAccessToken()
    const headers = { Authorization: `Bearer ${token}` }

    try {
      console.log(formData)
      let response = await axios.post(url, formData, {
        headers: headers,
      })
      console.log('Subscription created:', response.data)
      if (response.data.status === 'incomplete') {
        throw new Error('Subscription was not able to complete')
      }
      console.log('navigate to success')
      setSubSuccess(true)
    } catch (error) {
      console.error('Error creating subscription:')
      console.log(error)
      console.log('navigate to cancel')
      setSubSuccess(false)
    }
    setSubmitted(true)
    // setSubscriptionFormSubmitted(true);
  }

  if (isSubmitted) {
    if (isSubSuccess) {
      return <Navigate to='/sub-success' />
    }
    return <Navigate to='/sub-cancel' />
  }


  return (
    <div>
      <h3>Metodos de pagos guardados: </h3>
      {defaultPaymentMethod ? (
        <>
          {priceError && <p className='text-danger'>{priceError}</p>}
          <div key={defaultPaymentMethod.id} onClick={() => selectPaymentMethod(defaultPaymentMethod.id)} className={`payment-method-box  ${selectDefaultPaymentMethod == defaultPaymentMethod.id ? "payment-method-selected" : ''}`}>
              <div className="payment-method-details">
                  <FontAwesomeIcon icon={getCardBrandIcon(defaultPaymentMethod.card.brand)} />
                  <p>Brand: {defaultPaymentMethod.card.brand.toUpperCase()}</p>
                  <p>Last 4 Digits: **** **** **** {defaultPaymentMethod.card.last4}</p>
                  <p>Expires: {defaultPaymentMethod.card.exp_month}/{defaultPaymentMethod.card.exp_year}</p>
                  {/* Add more details as needed */}
              </div>
              
          </div>
          {
            selectDefaultPaymentMethod == defaultPaymentMethod.id &&(

              <Button className="mt-3" onClick={handleSubmit}>Subcribete</Button>
            )
          }
        </>
      )
        :
        <>
          <div className='mt-3 text-center'>
            <p> No hay metodos guardados </p>
          </div>
        </>
      }



      <div className='mt-3'>
        <p>Usar/agregar nuevo metodo: </p>
      </div>

    </div>
  );
}





export default PaymentOptions
