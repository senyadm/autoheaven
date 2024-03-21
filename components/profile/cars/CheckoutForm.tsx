import React from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

const CheckoutForm = ({clientSecret}: any) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the form from being submitted:
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    console.log(paymentMethod?.id)

    if (error) {
      console.log('[error]', error);
    } else {
        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
          });
      
          if (confirmError) {
            // Handle errors in confirming the payment
            console.log('[confirmError]', confirmError);
          } else {
            // The payment has been processed!
            console.log('Payment successful!');
            // You might want to navigate the user to a success page or update the state of your application
          }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-[150px]">
      <CardElement />
     <div className="flex flex-row space-x-2 mt-5">
      <Button
      variant='ghost'
        className={`mt-4 w-full text-black border border-border disabled:opacity-50`}
      >
        Cancel
      </Button>
      <Button
            disabled={!stripe}
        className={`mt-4 w-full bg-primary text-white disabled:opacity-50`}
      >
        Pay
      </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
