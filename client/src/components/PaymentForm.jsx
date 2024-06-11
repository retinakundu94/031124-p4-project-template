import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function PaymentForm({ userName, setToggle }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: userName 
      }
    });

    if (!error) {
      console.log("Payment successful!", paymentMethod);
      setToggle(true);
    } 
    else {
      console.log("Payment processing failed. Please try again.");
    }
  };

  return (
    <form className='payment' onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="nameInput">Enter Your Name:</label>
        <input id="nameInput" type="text" value={userName} />
      </div>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
}

export default PaymentForm;


