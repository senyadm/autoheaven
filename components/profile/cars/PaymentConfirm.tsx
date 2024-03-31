'use client'
import {Elements} from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import Loading from '@/app/[lang]/profile/loading';
import { getIntent } from '@/app/GlobalRedux/CreateCar/CreateCarSlice';

const stripePromise = loadStripe('pk_live_51OmMXmBGaqXQluApPePvDIVXQYz1OzPBJErSx05vUDFcHOAXEAbG65pQBjdRbYBOuR52WWs9PI9eJUPvYJL0QTXH00rGofhc0E');

const optionsToCents = {
    days: 99,
    week: 199,
    month: 399
};

export default function PaymentConfirm({option, toggleLoading, loading, id}: {id: string, loading: boolean, option: string, toggleLoading: () => void}) {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
      const fetchClientSecret = async () => {
        getIntent(id, option)
        .then((data) => {
          setClientSecret(data);
          toggleLoading();
        });
      };
      
      fetchClientSecret();
    }, [option, id]);
  
    const options = { clientSecret };
    return clientSecret && !loading ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm clientSecret={clientSecret} amount={optionsToCents[option]}/>
        </Elements>
      ) : (
        <div>
        <Loading />
    </div>
      );
};