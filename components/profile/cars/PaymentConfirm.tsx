'use client'
import {Elements} from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import Loading from '@/app/[lang]/profile/loading';

const stripePromise = loadStripe('pk_test_51OvY7V04EX91HcTebLO1aPD6bXYLHqFn1qTtUzDBVA5hI1NSGnNasiM8w3Rs9asLFos8PMi94DVXA98sagPBHBzS009fEEwIQC');

export default function PaymentConfirm({amount, toggleLoading, loading}: {loading: boolean, amount: number, toggleLoading: () => void}) {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
      const fetchClientSecret = async () => {
        const url = `${window.location.origin}/api/create-payment-intent`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
          });
        try {
            const data = await response.json();
            toggleLoading();
            setClientSecret(data.clientSecret);
        } 
        catch (error) {
            console.log('error', error)
        }        
        console.log("asd")
      };
      
      fetchClientSecret();
    }, [amount]);
  
    const options = { clientSecret };
    return clientSecret && !loading ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <div>
        <Loading />
    </div>
      );
};