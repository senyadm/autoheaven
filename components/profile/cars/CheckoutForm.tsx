import React, { useEffect, useState } from 'react';
import {CardElement, PaymentRequestButtonElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const CheckoutForm = ({clientSecret, amount}: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>();
  const router = useRouter();
  const { toast } = useToast();
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

    if (error) {
      console.error('[confirmError]', error);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "There was a problem with your request",
      });
    } else {
        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
          });
      
          if (confirmError) {
            // Handle errors in confirming the payment
            console.error('[confirmError]', confirmError);
            toast({
              variant: "destructive",
              title: "Something went wrong.",
              description: "There was a problem with your request",
            });
          } else {
            // The payment has been processed!
            toast({
              description: `Payment went successfully!`,
            });
            router.push('/profile/cars');
            // You might want to navigate the user to a success page or update the state of your application
          }
    }
  };

  useEffect(() => {
    if (stripe) {

      
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Test Total',
          amount: 1000, // Make sure this is a non-zero value
        },
      });

      pr.canMakePayment().then((result) => {

        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe, amount]);

  return (
    <form onSubmit={handleSubmit} className="h-[150px]">
      <CardElement />
      {paymentRequest && (
        <PaymentRequestButtonElement options={{ paymentRequest }} className="my-4" />
      )}
     <div className="flex flex-row space-x-2 mt-5">
      <Button
      variant='ghost'
        className={`mt-4 w-full text-black border border-border disabled:opacity-50`}
      >
        Cancel
      </Button>
      <Button
      type='submit'
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
